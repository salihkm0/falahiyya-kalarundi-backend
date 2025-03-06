import express from 'express';
import { createAnnouncement, getAnnouncements } from '../controllers/announcementController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const announcementRouter = express.Router();

announcementRouter.post('/', authenticate, authorize(['admin']), createAnnouncement);
announcementRouter.get('/', getAnnouncements);

export default announcementRouter;