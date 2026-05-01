import { Request, Response, NextFunction } from 'express';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import { IOrder } from '../models/order.model';
import userModel from '../models/user.model';
import courseModel from '../models/course.model';
import { newOrder } from '../services/order.service';
import sendMail from '../utils/sendMail';
import notificationModel from '../models/notification.model';

//create a new order
export const createOrder = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;

        const user = await userModel.findById(req.user?._id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const courseExistInUser = user.courses.some((course: any) => course.courseId === courseId);

        if (courseExistInUser) {
            return next(new ErrorHandler("You have already enrolled in this course", 400));
        }

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const data: any = {
            courseId,
            userId: req.user?._id
        };


        newOrder(data, next);


        const mailData = {
            order: {
                _id: courseId.slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }),
            },
        }

        try {
            await sendMail({
                email: user.email,
                subject: 'Order confirmation',
                template: 'order-mail.ejs',
                data: mailData
            });
        }
        catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }


        user.courses.push({ courseId });
        await user.save();

        //create notification

        await notificationModel.create({
            user: req.user?._id.toString(),
            title: "New Order!",
            message: `You have successfully enrolled in ${course.name}`
        });

        return res.status(200).json({
            success: true,
            order: course
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});