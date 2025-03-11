// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//   classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
//   month: { type: Number, required: true },
//   year: { type: Number, required: true },
//   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Corrected placement
//   days: [
//     {
//       date: { type: String, required: true },
//       status: { type: String, enum: ['present', 'absent', 'holiday'], required: true },
//       description: { type: String },
//     },
//   ],
// });

// const Attendance = mongoose.model('Attendance', attendanceSchema);
// export default Attendance;

import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  attendance: [
    {
      presentDays: { type: Number, required: true, default: 0 },
      totalDays: { type: Number, required: true, default: 0 },
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
