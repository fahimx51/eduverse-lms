import { Request, Response, NextFunction } from 'express';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import uploadOnCloudinary from '../utils/cloudinary';
import { createCourse, getAllCourseService } from '../services/course.service';
import courseModel from '../models/course.model';
import { redis } from '../utils/redis';
import mongoose from 'mongoose';
import sendMail from '../utils/sendMail';
import notificationModel from '../models/notification.model';

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

        //create notification 
        await notificationModel.create({
            user: req.user?._id.toString(),
            title: "New Question Received!",
            message: `You have new question in  ${courseContent.title}`
        });

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
            await notificationModel.create({
                user: req.user?._id.toString(),
                title: "Question Replied!",
                message: `Your question has been replied in ${courseContent.title}`
            });
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

//add review in course
interface IAddReviewData {
    user: object;
    rating: number;
    review: string;
}
export const addReview = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const userCourseList = req.user?.courses;

        const isCourseExist = userCourseList?.some((course: any) => course._id.toString() === courseId.toString());

        if (!isCourseExist) {
            return next(new ErrorHandler("You're not eligible to add review in this course.", 404));
        }

        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course is not exist anymore.", 404));
        }

        const { rating, review } = req.body as IAddReviewData;

        const reviewData: any = {
            user: req.user,
            rating,
            comment: review,
            commentReplies: []
        };

        course.reviews.push(reviewData);

        let avg = 0;

        course.reviews.forEach((rev: any) => {
            avg += rev.rating
        });

        course.ratings = avg / course.reviews?.length;

        await course.save();

        const notification = {
            title: "New Review Received",
            message: `${req.user?.name} has given a review in ${course.name}`
        };

        //create notification

        res.status(200).json({
            success: true,
            course
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//add reply in review
interface IAddReviewReplyData {
    comment: string,
    courseId: string,
    reviewId: string,
}
export const addReplyToReview = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { comment, courseId, reviewId } = req.body as IAddReviewReplyData;
        const course = await courseModel.findById(courseId);

        if (!course) {
            return next(new ErrorHandler("Course is not exist anymore.", 404));
        }

        const targetedReview = course.reviews.find((rev: any) => rev._id.toString() === reviewId.toString());

        if (!targetedReview) {
            return next(new ErrorHandler("Review is not exist anymore.", 404));
        }

        const replyData: any = {
            user: req.user,
            question: comment
        };

        targetedReview.commentReplies.push(replyData);

        await course.save();

        res.status(200).json({
            success: true,
            course
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }

});

//get all courses --only for admin
export const getAllCourse = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        getAllCourseService(res);
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});

//delete course ---only for admin
export const deleteCourse = CatchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const course = await courseModel.findById(id);

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        await course.deleteOne({ id });
        await redis.del(id as string);

        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});