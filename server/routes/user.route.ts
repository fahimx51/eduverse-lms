import express from 'express';
import { activateUser, getUserInfo, loginUser, logoutUser, registerUser, updateAccessToken } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);
userRouter.post('/logout-user', isAuthenticated, logoutUser);
userRouter.get('/refresh-token', updateAccessToken);
userRouter.get('/me', isAuthenticated, getUserInfo);

export default userRouter; 