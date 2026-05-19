import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';
import analyticRouter from './routes/analytics.route';
import layoutRouter from './routes/layout.route';
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: process.env.NODE_ENV === 'development' ? 999999 : 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests, please try again after 15 minutes."
    }
});

//body parser
app.use(express.json({ limit: '50mb' }));

//cookie parser
app.use(cookieParser());

//cors 
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

//api routes
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/order', orderRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/analytics', analyticRouter);
app.use('/api/layout', layoutRouter);

// testing api
app.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Hello from the server!"
    });
});

// unknown route


app.use(limiter);
// error middleware
app.use(ErrorMiddleware);

//2lDdpJHZK48f8yMb
//eduverseDB