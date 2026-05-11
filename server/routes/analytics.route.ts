import express from 'express'
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from '../controllers/analytics.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';

const analyticRouter = express.Router();

analyticRouter.get('/get-user-analytics', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getUserAnalytics);
analyticRouter.get('/get-course-analytics', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getCourseAnalytics);
analyticRouter.get('/get-order-analytics', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getOrderAnalytics);

export default analyticRouter;