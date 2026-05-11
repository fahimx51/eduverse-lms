import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createLayout, editLayout, getLayout } from '../controllers/layout.controller';
import { upload } from '../middleware/multer';
import { updateAccessToken } from '../controllers/user.controller';

const layoutRouter = express.Router();

layoutRouter.post('/create-layout', updateAccessToken, isAuthenticated, authorizeRoles('admin'), upload.single('image'), createLayout);

layoutRouter.post('/edit-layout', updateAccessToken, isAuthenticated, authorizeRoles('admin'), upload.single('image'), editLayout);

layoutRouter.get('/get-layout', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getLayout);

export default layoutRouter;