import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import AuthController from '../controller/AuthController';

const router = Router();

// login
router.post('/login', AuthController.login);
// forgot
// router.put('/forgot-password', [checkJwt], AuthController.forgotPassword);
// // createNew password
// router.put('/new-password', [checkJwt], AuthController.createNewPassword);

// Change password
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
