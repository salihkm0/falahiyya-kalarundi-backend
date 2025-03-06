import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: Number, required: true },
  classNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  regNo: { type: String, required: true },
  mobile: { type: Number },
  // password: { type: String, required: true },
  image: { type: String },
  guardian: { type: String, required: true },
  place: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female"] },
  dob: { type: "date", required: true },
  role: { type: String, default: "student", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Student", studentSchema);
