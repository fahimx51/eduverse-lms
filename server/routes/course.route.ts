import express from "express";
import { uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { upload } from "../middleware/multer";

const courseRouter = express.Router();

courseRouter.post('/upload-course', isAuthenticated, authorizeRoles('admin'), upload.single('thumbnail'), uploadCourse);

export default courseRouter;