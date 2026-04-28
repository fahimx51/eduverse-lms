require('dotenv').config();
import { Response, Request, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import { redis } from './redis'

interface ITokenOptions {
    expiresIn: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'strict' | 'lax' | 'none' | undefined;
    secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    //upload seassions to redis
    redis.set(user._id.toString(), JSON.stringify(user) as any);

    //parse environment variables
    const accessTokenExpiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
    const refreshTokenExpiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '300', 10);

    //Options for cookie
    const accessTokenOptions: ITokenOptions = {
        expiresIn: new Date(Date.now() + accessTokenExpiresIn * 1000),
        maxAge: accessTokenExpiresIn * 1000,
        httpOnly: true,
        sameSite: 'lax',
    };

    const refreshTokenOptions: ITokenOptions = {
        expiresIn: new Date(Date.now() + refreshTokenExpiresIn * 1000),
        maxAge: refreshTokenExpiresIn * 1000,
        httpOnly: true,
        sameSite: 'lax',
    };

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