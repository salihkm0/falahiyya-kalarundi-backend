import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
//   subjectDescription: { type: String },
//   subjectImage: { type: String },
createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Subject", subjectSchema);
