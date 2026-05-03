import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createLayout, editLayout, getLayout } from '../controllers/layout.controller';
import { upload } from '../middleware/multer';

const layoutRouter = express.Router();

layoutRouter.post('/create-layout', isAuthenticated, authorizeRoles('admin'), upload.single('image'), createLayout);

layoutRouter.post('/edit-layout', isAuthenticated, authorizeRoles('admin'), upload.single('image'), editLayout);

layoutRouter.get('/get-layout', isAuthenticated, authorizeRoles('admin'), getLayout);

export default layoutRouter;