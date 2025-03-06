import express from 'express';
import { register, login, getAllTeachers } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.get("/teachers", getAllTeachers)

export default authRouter;