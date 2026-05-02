import { Request, Response, NextFunction } from 'express';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import notificationModel from '../models/notification.model';
import cron from 'node-cron';

//get all notification --only for admin
export const getNotifications = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await notificationModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//update notifcation status --only for admin
export const updateNotificationStatus = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = req.params.id;

        const notification = await notificationModel.findById(notificationId);

        if (!notification) {
            return next(new ErrorHandler("Notification is not exist anymore.", 404));
        }

        notification.status = "read";

        await notification.save();

        const notifications = await notificationModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//delete notification ---only admin
cron.schedule('0 0 0 * * *', async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel.deleteMany({
        status: 'read',
        createdAt: { $lt: thirtyDaysAgo }
    });

    console.log("-----Cron job executed-----");
    console.log("Deleted read notifications older than 30 days");
});