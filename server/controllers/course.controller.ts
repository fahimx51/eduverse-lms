import { Request, Response, NextFunction } from 'express';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import uploadOnCloudinary from '../utils/cloudinary';
import { createCourse } from '../services/course.service';
import courseModel from '../models/course.model';
import { redis } from '../utils/redis';
import mongoose from 'mongoose';
import ejs from 'ejs';
import path from 'node:path';
import sendMail from '../utils/sendMail';

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

//get course content -- only for valid users
export const getCourseByUser = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;

        const isCourseExist = userCourseList?.find((course: any) => course._id.toString === courseId);

        if (!isCourseExist) {
            return next(new ErrorHandler("You are not eligible to access this course", 404));
        }

        const course = await courseModel.findById(courseId);

        const content = course?.courseData;

        res.status(200).json({
            success: true,
            content
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//add questions in course
interface IAddQuestionData {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestion = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId }: IAddQuestionData = req.body;
        const course = await courseModel.findById(courseId);

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid content Id", 400));
        }

        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid content Id", 400));
        }

        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: []
        };

        //add this question to the course content
        courseContent.questions.push(newQuestion);

        //save the updated course
        await course?.save();

        res.status(200).json({
            success: true,
            course
        });
    }
    catch (error: any) {
        next(new ErrorHandler(error.message, 500));
    }
});

//add answer in course question
interface IAddAnswerData {
    answer: string,
    courseId: string,
    contentId: string,
    questionId: string
};

export const addAnswer = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { answer, courseId, contentId, questionId }: IAddAnswerData = req.body;

        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid content Id", 400));
        }

        const course = await courseModel.findById(courseId);
        const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));

        if (!courseContent) {
            return next(new ErrorHandler("Invalid content Id", 400));
        }

        const question = courseContent?.questions?.find((item: any) => item._id.equals(questionId));

        if (!question) {
            return next(new ErrorHandler("Invalid question Id", 400));
        }

        //create new answer object
        const newAnswer: any = {
            user: req.user,
            answer
        }

        //add this answer to the question
        question.questionReplies.push(newAnswer);

        await course?.save();

        if (req.user?._id === question.user._id) {
            //create a notification
        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title
            }

            try {
                await sendMail({
                    email: question.user.email,
                    subject: 'Question Replied!',
                    template: 'question-reply.ejs',
                    data
                })
            }
            catch (error: any) {
                return next(new ErrorHandler(error.message, 500));
            }
        }

        res.status(200).json({
            success: true,
            course
        });

    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});