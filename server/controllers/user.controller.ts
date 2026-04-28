import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import userModel, { IUser } from '../models/user.model';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import path from 'node:path';
import ejs from 'ejs';
import sendMail from '../utils/sendMail';
import { accessTokenOptions, refreshTokenOptions, sendToken } from '../utils/jwt';
import { redis } from '../utils/redis';
import { getUserById } from '../services/user.service';

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

    const isEmailExist = await userModel.findOne({ email });

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
    const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET as Secret, { expiresIn: '5m' });

    return { token, activationCode };
}

//Active user
interface IActivationRequest {
    activationToken: string;
    activationCode: string;
}

export const activateUser = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { activationToken, activationCode }: IActivationRequest = req.body as IActivationRequest;

        const newUser: { user: IUser; activationCode: string } = jwt.verify(activationToken, process.env.JWT_SECRET as Secret) as { user: IUser; activationCode: string };


        if (newUser.activationCode !== activationCode) {
            return next(new ErrorHandler('Invalid activation code', 400));
        }

        const { name, email, password } = newUser.user;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return next(new ErrorHandler('Email already exists', 400));
        }

        const user = await userModel.create({ name, email, password });

        res.status(201).json({
            success: true,
            message: 'Account activated successfully. You can now log in.',
        });
    }
    catch (error: any) {
        console.log("Activation error:", error.message);
        return next(new ErrorHandler('Failed to activate account', 500));
    }

});

//Login user
interface ILoginRequest {
    email: string;
    password: string;
}

export const loginUser = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: ILoginRequest = req.body as ILoginRequest;
        if (!email || !password) {
            return next(new ErrorHandler('Please provide email and password', 400));
        }

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler('Invalid email or password', 401));
        }

        sendToken(user, 200, res);

    }
    catch (error: any) {
        console.log("Login error:", error.message);
        return next(new ErrorHandler('Failed to login', 500));
    }
});

//logout user
export const logoutUser = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("accessToken", "", { maxAge: 1 });
        res.cookie("refreshToken", "", { maxAge: 1 });

        const userId = req.user?._id;

        if (!userId) {
            return next(new ErrorHandler("userModel not found", 404));
        }

        await redis.del(userId.toString());

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (error: any) {
        return next(new ErrorHandler('Failed to logout', 500));
    }
});

//update acceess token
export const updateAccessToken = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refreshToken as string;

        if (!refresh_token) {
            return next(new ErrorHandler('Unauthorized: No refresh token provided', 401));
        }

        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;

        if (!decoded) {
            return next(new ErrorHandler('Unauthorized: Invalid refresh token', 401));
        }

        const user = await redis.get(decoded.id as string);

        if (!user) {
            return next(new ErrorHandler('Unauthorized: userModel not found', 401));
        }

        const parsedUser = JSON.parse(user);

        const accessToken = jwt.sign({ id: parsedUser._id }, process.env.ACCESS_TOKEN as string, { expiresIn: '5m' });

        const refreshToken = jwt.sign({ id: parsedUser._id }, process.env.REFRESH_TOKEN as string, { expiresIn: '7d' });

        res.cookie('accessToken', accessToken, accessTokenOptions);
        res.cookie('refreshToken', refreshToken, refreshTokenOptions);

        res.status(200).json({
            success: true,
            accessToken
        });
    }
    catch (error: any) {
        console.log("Token refresh error:", error.message);
        return next(new ErrorHandler('Failed to refresh access token', 500));
    }
});

//get user info
export const getUserInfo = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return next(new ErrorHandler("user not found", 404));
        }

        getUserById(userId.toString(), res);
    }
    catch (error: any) {
        console.log("Get user info error:", error.message);
        return next(new ErrorHandler('Failed to get user info', 500));
    }
});

interface ISocialAuthBody {
    email: string;
    name: string;
    avatar: string;
}

//social Auth
export const socialAuth = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, avatar } = req.body as ISocialAuthBody;
        console.log(req.body);

        const user = await userModel.findOne({ email });

        if (!user) {
            const newUser = await userModel.create({
                name,
                email,
                avatar: {
                    public_id: 'social_auth_avatar',
                    url: avatar
                }
            });
            sendToken(newUser, 201, res);
        }
        else {
            sendToken(user, 200, res);
        }
    }
    catch (error: any) {
        console.log("Social auth error:", error.message);
        return next(new ErrorHandler('Failed to authenticate with social account', 500));
    }
});