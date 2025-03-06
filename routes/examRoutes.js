import express from "express";
import {
  addExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  getExamsByStudent,
  getExamsByClass,
  // getAllStudentsMarkList,
  getStudentMarksByPhoneAndClass,
} from "../controllers/examController.js";

const examRouter = express.Router();

examRouter.post("/", addExam);
examRouter.get("/", getAllExams);
examRouter.get("/:id", getExamById);
examRouter.put("/:id", updateExam);
examRouter.delete("/:id", deleteExam);

examRouter.get("/student/:studentId", getExamsByStudent);
examRouter.get("/class/:classId", getExamsByClass);
// examRouter.get("/mark/all", getAllStudentsMarkList);

examRouter.post("/marks-by-phone", getStudentMarksByPhoneAndClass);

export default examRouter;
