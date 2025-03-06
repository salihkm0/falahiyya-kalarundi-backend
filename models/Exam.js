import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subjects: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  ],
  marks: {
    totalMark: { type: Number, required: true, default: 50 },
    obtainedMark: { type: Number, required: true, default: 0 },
  },
  examDate: { type: Date, required: true },
});

export default mongoose.model("Exam", examSchema);

// import mongoose from "mongoose";

// const examSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Student",
//     required: true,
//   },
//   exams: [
//     {
//       examName: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "ExamName",
//         required: true,
//       },
//       subject: [
//         {
//           subjectName: [
//             {
//               type: mongoose.Schema.Types.ObjectId,
//               ref: "Subject",
//               required: true,
//             },
//           ],
//           marks: {
//             totalMark: { type: Number, required: true, default: 50 },
//             obtainedMark: { type: Number, required: true, default: 0 },
//           },
//         },
//       ],
//     },
//   ],
// });

// export default mongoose.model("Exam", examSchema);


