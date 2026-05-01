import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";

const courseRouter = express.Router();

courseRouter.post('/upload-course', isAuthenticated, authorizeRoles('admin'), upload.single('thumbnail'), uploadCourse);

courseRouter.put('/edit-course/:id', isAuthenticated, authorizeRoles('admin'), upload.single('thumbnail'), editCourse);

courseRouter.get('/get-course/:id', isAuthenticated, getSingleCourse);

courseRouter.get('/get-courses', isAuthenticated, getAllCourses);

courseRouter.get('/get-course-content/:id', isAuthenticated, getCourseByUser);

courseRouter.put('/add-question', isAuthenticated, addQuestion);

courseRouter.put('/add-answer', isAuthenticated, addAnswer);

courseRouter.put('/add-review/:id', isAuthenticated, addReview);

courseRouter.put('/add-reply', isAuthenticated, authorizeRoles('admin'), addReplyToReview);

export default courseRouter;