import express from "express";
import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmission,
  deleteAdmission,
} from "../controllers/admissionController.js";

const admissionRouter = express.Router();

admissionRouter.route("/")
  .post(createAdmission) 
  .get(getAdmissions);

admissionRouter.route("/:id")
  .get(getAdmissionById)
  .put(updateAdmission)
  .delete(deleteAdmission);

export default admissionRouter;
