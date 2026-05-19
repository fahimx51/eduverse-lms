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

export const limiter = rateLimit({
    // 15-minute window
    windowMs: 15 * 60 * 1000,
    // Limit each IP to 100 requests per windowMs
    limit: process.env.NODE_ENV === 'development' ? 99999999 : 100,

    standardHeaders: 'draft-8',
    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes."
    },

    validate: { xForwardedForHeader: true }
});

app.set('trust proxy', 1);

//body parser
app.use(express.json({ limit: '50mb' }));

//cookie parser
app.use(cookieParser());


//cors 
app.use(cors({
    origin: function (origin, callback) {
        console.log("DEBUG: Incoming request from origin:", origin);
        const allowedOrigins = [
            "https://eduverse-lms-g3sg.vercel.app",
            "http://localhost:3000"
        ];

        // Allow the request if it's in the list OR if it's undefined (like some POST requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("DEBUG: CORS BLOCKING ORIGIN:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

//limiter
app.use(limiter);

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


// error middleware
app.use(ErrorMiddleware);