import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { Secret } from 'jsonwebtoken';
import path from 'node:path';
import ejs from 'ejs';
import sendMail from '../utils/sendMail';

dotenv.config();

//register a user
interface IRegistrationBody {
    name: string,
    email: string,
    password: string,
    avatar?: string
}

export const registerUser = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password }: IRegistrationBody = req.body;

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
        return next(new ErrorHandler('Email already exists', 400));
    }

    const user: IRegistrationBody = { name, email, password };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };
    const html = await ejs.renderFile(path.join(__dirname, '../mails/activation-mail.ejs'), data);


    try {
        await sendMail({
            email: user.email,
            subject: 'Activate your account',
            template: 'activation-mail.ejs',
            data
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please check your email to activate your account.',
            activationToken: activationToken.token
        });
    }

    catch (error: any) {
        console.log("Email error:", error.message);
        return next(new ErrorHandler('Failed to send activation email', 500));
    }

});

interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode: string = Math.floor(100000 + Math.random() * 900000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET as Secret, { expiresIn: '7d' });

    return { token, activationCode };
}