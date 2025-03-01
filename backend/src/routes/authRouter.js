import express from 'express';
import validateAccount from '../middlewares/signupValidation.js';
import { logout, signin, signup } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post(
    '/signup', 
    validateAccount,
    signup
)

authRouter.post(
    '/signin',
    signin
)

authRouter.post(
    '/logout',
    logout
)

export default authRouter;