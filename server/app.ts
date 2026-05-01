require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import ErrorHandler from './utils/ErrorHandler';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';

//body parser
app.use(express.json({ limit: '50mb' }));

//cookie parser
app.use(cookieParser());

//cors 
app.use(cors({
    origin: process.env.ORIGIN
}));

//api routes
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/order', orderRouter);

// testing api
app.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Hello from the server!"
    });
});

// unknown route
app.all("{*any}", (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorHandler(`Route ${req.originalUrl} not found!`, 404));
});

// error middleware
app.use(ErrorMiddleware);