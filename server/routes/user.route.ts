import express from 'express';
import { activateUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateProfilePicture, updateUserInfo, updateUserPassword } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { upload } from '../middleware/multer';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);
userRouter.post('/social-auth', socialAuth);
userRouter.post('/logout-user', isAuthenticated, logoutUser);

userRouter.get('/refresh-token', updateAccessToken);
userRouter.get('/me', isAuthenticated, getUserInfo);

userRouter.put('/update-user-info', isAuthenticated, updateUserInfo);
userRouter.put('/update-user-password', isAuthenticated, updateUserPassword);
userRouter.put('/update-user-avatar', upload.single('avatar'), isAuthenticated, updateProfilePicture);

export default userRouter; 