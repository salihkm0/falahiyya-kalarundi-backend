import express from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getStudentByClassId,
  getStudentById,
  updateStudent,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

// CRUD Routes for Students
studentRouter.post("/", addStudent);
studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.put("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);
studentRouter.get("/class/:classId", getStudentByClassId)

export default studentRouter;
