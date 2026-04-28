require('dotenv').config();
import { Response, Request, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import { redis } from './redis'

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'strict' | 'lax' | 'none' | undefined;
    secure?: boolean;
}

//parse environment variables
const accessTokenExpiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
const refreshTokenExpiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '300', 10);

//Options for cookie
export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000),
    maxAge: accessTokenExpiresIn * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpiresIn * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpiresIn * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    //upload seassions to redis
    redis.set(user._id.toString(), JSON.stringify(user) as any);



    //only set secure flag in production
    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
    }

    res.cookie('accessToken', accessToken, accessTokenOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken
    });
}