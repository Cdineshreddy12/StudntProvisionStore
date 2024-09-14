// admin.js
import express from 'express';
import { loginUser, registerUser} from '../controllers/userController.js'
import { registerValidation,loginValidation,validate } from '../middlewares/userMiddleware.js';
const router = express.Router();

// Route for user registration
router.post('/register', registerValidation, validate, registerUser);

// Route for user login
router.post('/login', loginValidation, validate, loginUser);

export default router;
