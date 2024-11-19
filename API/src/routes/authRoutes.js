import express from 'express'
import {
    login,
    logout,
    register,
    verifyOtpCode,
    resetPassword,
    verifyEmail

} from '../controllers/AuthController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { uploadAvatar } from '../middleware/multerMiddleware.js';

const router = express.Router()

router.post('/register', uploadAvatar.single('avatar'), register)

router.post('/login', login);

router.post('/verify-otpCode', verifyOtpCode);

router.post('/logout', logout);

router.post('/verifyEmail', verifyEmail);

router.post('/resetPassword/:id', resetPassword);


export default router;

