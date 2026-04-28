import express from 'express';
import { activateUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);
userRouter.post('/logout-user', isAuthenticated, logoutUser);

export default userRouter; 