// import express from 'express';
// import { markAttendance, getAttendance } from '../controllers/attendanceController.js';
// import { authenticate, authorize } from '../middleware/authMiddleware.js';

// const attendanceRouter = express.Router();

// attendanceRouter.post('/', authenticate, authorize(['staff']), markAttendance);
// attendanceRouter.get('/:studentId', authenticate, getAttendance);

// export default attendanceRouter;

// import express from 'express';
// import {  addAttendance, getClassAttendance } from '../controllers/attendanceController.js';

// const attendanceRoutes = express.Router();

// attendanceRoutes.post('/bulk-attendance', addAttendance);
// attendanceRoutes.get('/class', getClassAttendance);

// export default attendanceRoutes;


import express from 'express';
import { addAttendance, deleteAttendance, getAttendanceByClass, getAttendanceByStudent, updateAttendance } from '../controllers/attendanceController.js';

const attendanceRoutes = express.Router();

attendanceRoutes.post("/", addAttendance);
attendanceRoutes.get("/student/:studentId", getAttendanceByStudent);
attendanceRoutes.get("/class/:classId", getAttendanceByClass);
attendanceRoutes.put("/:id", updateAttendance);
attendanceRoutes.delete("/:id", deleteAttendance);

export default attendanceRoutes;