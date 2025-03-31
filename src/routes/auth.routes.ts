import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';
import { authMiddleware } from '../middleware/auth.middleware';
import { guestMiddleware } from '../middleware/guest.middleware';

const router = Router();
const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router.post('/signup', guestMiddleware, authController.signup.bind(authController));
router.post('/login', guestMiddleware, authController.login.bind(authController));
router.get('/logout', authMiddleware, authController.logout.bind(authController));

export default router; 