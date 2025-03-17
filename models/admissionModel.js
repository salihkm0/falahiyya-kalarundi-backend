import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  aadhaar: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  houseAddress: { type: String, required: true },
  phone: { type: String, required: true },
  identificationMarks: { type: String},
  fatherName: { type: String, required: true },
  guardianName: { type: String, required: true },
  relation: { type: String, required: true },
  guardianOccupation: { type: String, required: true },
  classAdmitted: { type: String, required: true },
  formerMadrasa: { type: String },
  certificateNumber: { type: String },
  tcNumber : { type: String },
}, { timestamps: true });

const Admission = mongoose.model("Admission", admissionSchema);
export default Admission;
