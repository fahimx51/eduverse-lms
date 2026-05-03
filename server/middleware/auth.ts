import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CatchAsyncErrors } from './catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import { redis } from '../utils/redis';

//authenticated user middleware
export const isAuthenticated = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken as string;

    if (!accessToken) {
        return next(new ErrorHandler('Unauthorized: No access token provided', 401));
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if (!decoded) {
        return next(new ErrorHandler('Unauthorized: Invalid access token', 401));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
        return next(new ErrorHandler('Please login to access this resource', 401));
    }

    req.user = JSON.parse(user);

    next();
});

//validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ErrorHandler('Unauthorized: No user found', 401));
        }

        if (!roles.includes(req.user?.role)) {
            return next(new ErrorHandler(`Forbidden: ${req.user?.role} is not allowed to access this resource`, 403));
        }

        next();
    }
};