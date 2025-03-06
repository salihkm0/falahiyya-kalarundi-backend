import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import examRoutes from './routes/examRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import subjectRouter from './routes/subjectRoutes.js';
import classRouter from './routes/classRoutes.js';
import studentRouter from './routes/studentRoutes.js';
// import examNameRouter from './routes/examNameRouter.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/subject', subjectRouter);
app.use('/api/class', classRouter);
app.use('/api/student', studentRouter);
// app.use('/api/exam-name', examNameRouter);

// Database connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));