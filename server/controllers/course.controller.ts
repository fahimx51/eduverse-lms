import { Request, Response, NextFunction } from 'express';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import uploadOnCloudinary from '../utils/cloudinary';
import { createCourse } from '../services/course.service';
import courseModel from '../models/course.model';
import { redis } from '../utils/redis';

//upload course
export const uploadCourse = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
        const file = req.file;

        if (file) {
            const uploaded = await uploadOnCloudinary(file.buffer, file.mimetype, 'eduverse/courses');

            data.thumbnail = {
                public_id: uploaded?.public_id,
                url: uploaded?.url
            };
        }

        createCourse(data, res, next);
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message || 'Failed to upload course', 500));
    }
});

//edit course
export const editCourse = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = typeof req.body.data === 'string' ? JSON.parse(req.body.data) : req.body;
        const file = req.file;

        if (file) {
            const uploaded = await uploadOnCloudinary(file.buffer, file.mimetype, 'eduverse/courses');

            data.thumbnail = {
                public_id: uploaded?.public_id,
                url: uploaded?.url
            };
        }


        const courseId = req.params.id;

        console.log('Course ID:', courseId);
        const course = await courseModel.findByIdAndUpdate(courseId,
            { $set: data },
            { new: true }
        );

        if (!course) {
            return next(new ErrorHandler('Course not found', 404));
        }

        res.status(201).json({
            success: true,
            course
        })
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message || 'Failed to edit course', 500));
    }
});

//get single courss -- without purchasing
export const getSingleCourse = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;

        const isCacheExist = await redis.get(courseId as string);

        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).json({
                success: true,
                course
            });
        }

        else {
            const course = await courseModel.findById(courseId).select("-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links");

            await redis.set(courseId as string, JSON.stringify(course), 'EX', 60 * 60 * 24);

            res.status(200).json({
                success: true,
                course
            });
        }
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message || 'Failed to get course', 500));
    }
});

//get all courses -- without purchasing
export const getAllCourses = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isCacheExist = await redis.get('allCourses');

        if (isCacheExist) {
            const courses = JSON.parse(isCacheExist);
            
            res.status(200).json({
                success: true,
                courses
            });
        }
        else {
            const courses = await courseModel.find().select("-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links");

            await redis.set('allCourses', JSON.stringify(courses), 'EX', 60 * 60 * 24);

            res.status(200).json({
                success: true,
                courses
            });
        }

    }
    catch (error: any) {
        return next(new ErrorHandler(error.message || 'Failed to get courses', 500));
    }
});