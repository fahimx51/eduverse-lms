import { Request, Response, NextFunction } from 'express';
import { CatchAsyncErrors } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import uploadOnCloudinary from '../utils/cloudinary';
import { createCourse } from '../services/course.service';

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