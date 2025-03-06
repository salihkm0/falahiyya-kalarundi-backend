import express from "express";
import {
  addClass,
  deleteClass,
  getAllClasses,
  getClassById,
  updateClass,
} from "../controllers/classControllers.js";

const classRouter = express.Router();

classRouter.route("/").post(addClass).get(getAllClasses);

classRouter.get("/:id", getClassById);
classRouter.put("/:id", updateClass);
classRouter.delete("/:id", deleteClass);

export default classRouter;
