import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  classNumber: { type: String, required: true },
  classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  classTime: {
    start : { type: String, required: true},
    end : { type: String, required: true}
   },
  classSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

export default mongoose.model("Class", classSchema);