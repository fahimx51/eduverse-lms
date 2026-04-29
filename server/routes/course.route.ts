import express from "express";
import { editCourse, getAllCourses, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";

const courseRouter = express.Router();

courseRouter.post('/upload-course', isAuthenticated, authorizeRoles('admin'), upload.single('thumbnail'), uploadCourse);

courseRouter.put('/edit-course/:id', isAuthenticated, authorizeRoles('admin'), upload.single('thumbnail'), editCourse);

courseRouter.get('/get-course/:id', isAuthenticated, getSingleCourse);

courseRouter.get('/get-courses', isAuthenticated, getAllCourses);

export default courseRouter;