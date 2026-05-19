require('dotenv').config();
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
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: process.env.NODE_ENV === 'development' ? 999999999 : 100,
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
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