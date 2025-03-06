import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware.js';
import { addSubject, getAllSubjects } from '../controllers/subjectController.js';

const subjectRouter = express.Router();

subjectRouter.post('/', addSubject)
subjectRouter.get('/', getAllSubjects)
// subjectRouter.post('/', authenticate, authorize(['staff']), addSubject)


export default subjectRouter