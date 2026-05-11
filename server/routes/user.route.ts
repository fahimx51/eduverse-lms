import express from 'express';
import { activateUser, deleteUser, getAllUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updateProfilePicture, updateUserInfo, updateUserPassword, updateUserRole } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { upload } from '../middleware/multer';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login-user', loginUser);
userRouter.post('/social-auth', socialAuth);
userRouter.post('/logout-user', updateAccessToken, isAuthenticated, logoutUser);

userRouter.get('/refresh-token', updateAccessToken);
userRouter.get('/me', updateAccessToken, isAuthenticated, getUserInfo);

userRouter.put('/update-user-info', updateAccessToken, isAuthenticated, updateUserInfo);
userRouter.put('/update-user-password', updateAccessToken, isAuthenticated, updateUserPassword);
userRouter.put('/update-user-avatar', upload.single('avatar'), updateAccessToken, isAuthenticated, updateProfilePicture);

userRouter.get('/get-all-users', updateAccessToken, isAuthenticated, authorizeRoles('admin'), getAllUser);

userRouter.put('/update-user-role', updateAccessToken, isAuthenticated, authorizeRoles('admin'), updateUserRole);

userRouter.delete('/delete-user/:id', updateAccessToken, isAuthenticated, authorizeRoles('admin'), deleteUser);

export default userRouter; 