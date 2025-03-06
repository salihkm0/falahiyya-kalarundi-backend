import Subject from "../models/Subjects.js";
import Student from "../models/Student.js";
import Exam from "../models/Exam.js";

// Add a new exam record
export const addExam = async (req, res) => {
  const { studentId, subjects, marks, examDate } = req.body;

  try {
    // Validate if the student exists
    const student = await Student.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Validate if all subjects exist
    const validSubjects = await Subject.find({ _id: { $in: subjects } });
    if (validSubjects.length !== subjects.length) {
      return res
        .status(400)
        .json({ message: "One or more subject IDs are invalid" });
    }

    // Create a new exam record
    const exam = new Exam({
      studentId,
      subjects,
      marks,
      examDate,
    });
    await exam.save();

    res.status(201).json({ message: "Exam record added successfully", exam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all exam records
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate(
        "studentId",
        "name rollNo classNumber regNo guardian place image"
      )
      .populate("subjects", "subjectName");
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single exam record by ID
export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate(
        "studentId",
        "name rollNo classNumber regNo guardian place image"
      )
      .populate("subjects", "subjectName");
    if (!exam)
      return res.status(404).json({ message: "Exam record not found" });
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam record by ID
export const updateExam = async (req, res) => {
  const { id } = req.params;
  const { studentId, subjects, marks, examDate } = req.body;

  try {
    if (studentId) {
      const student = await Student.findById(studentId);
      if (!student || student.role !== "student") {
        return res.status(400).json({ message: "Invalid student ID" });
      }
    }

    if (subjects) {
      const validSubjects = await Subject.find({ _id: { $in: subjects } });
      if (validSubjects.length !== subjects.length) {
        return res
          .status(400)
          .json({ message: "One or more subject IDs are invalid" });
      }
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { studentId, subjects, marks, examDate },
      { new: true }
    )
      .populate(
        "studentId",
        "name rollNo classNumber regNo guardian place image"
      )
      .populate("subjects", "subjectName");

    if (!updatedExam)
      return res.status(404).json({ message: "Exam record not found" });
    res
      .status(200)
      .json({ message: "Exam record updated successfully", exam: updatedExam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an exam record by ID
export const deleteExam = async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndDelete(req.params.id);
    if (!deletedExam)
      return res.status(404).json({ message: "Exam record not found" });
    res.status(200).json({ message: "Exam record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all exam records for a specific student
export const getExamsByStudent = async (req, res) => {
  try {
    const exams = await Exam.find({ studentId: req.params.studentId })
      .populate("subjects", "subjectName")
      .populate(
        "studentId",
        "name rollNo classNumber regNo guardian place image"
      );
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all exam records for a specific class
export const getExamsByClass = async (req, res) => {
  try {
    const students = await Student.find({
      classNumber: req.params.classId,
    }).select("_id");
    if (!students.length)
      return res
        .status(404)
        .json({ message: "No students found for this class" });

    const exams = await Exam.find({
      studentId: { $in: students.map((s) => s._id) },
    })
      .populate(
        "studentId",
        "name rollNo classNumber regNo guardian place image"
      )
      .populate("subjects", "subjectName");
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get student marks using phone number and class
export const getStudentMarksByPhoneAndClass = async (req, res) => {
  const { phone, classId } = req.body;
  try {
    const student = await Student.findOne({
      mobile: Number(phone),
      classNumber: classId,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const exams = await Exam.find({ studentId: student._id })
      .populate("subjects", "subjectName")
      .populate(
        "studentId",
        "name rollNo classNumber regNo guardian place image"
      );
    res.status(200).json({ student, exams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---------------------------------------------------------------------

// import Exam from "../models/Exam.js";
// import Student from "../models/Student.js";
// import Subject from "../models/Subjects.js";
// import ExamName from "../models/examName.js";

// // Add a new exam record
// export const addExam = async (req, res) => {
//   const { studentId, exams } = req.body;

//   try {
//     // Validate if the student exists
//     const student = await Student.findById(studentId);
//     if (!student || student.role !== "student") {
//       return res.status(400).json({ message: "Invalid student ID" });
//     }

//     // Validate exam data
//     for (const exam of exams) {
//       const examExists = await ExamName.findById(exam.examName);
//       if (!examExists) {
//         return res.status(400).json({ message: "Invalid exam name ID" });
//       }
//       for (const subject of exam.subject) {
//         const subjectExists = await Subject.findById(subject.subjectName);
//         if (!subjectExists) {
//           return res.status(400).json({ message: "Invalid subject ID" });
//         }
//       }
//     }

//     // Create a new exam record
//     const newExam = new Exam({ studentId, exams });
//     await newExam.save();

//     res
//       .status(201)
//       .json({ message: "Exam record added successfully", exam: newExam });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all exam records
// export const getAllExams = async (req, res) => {
//   try {
//     const exams = await Exam.find()
//       .populate("studentId", "name rollNo classNumber")
//       .populate("exams.examName", "name")
//       .populate("exams.subject.subjectName", "subjectName");
//     res.status(200).json(exams);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get a single exam record by ID
// export const getExamById = async (req, res) => {
//   try {
//     const exam = await Exam.findById(req.params.id)
//       .populate("studentId", "name rollNo classNumber")
//       .populate("exams.examName", "name")
//       .populate("exams.subject.subjectName", "subjectName");
//     if (!exam)
//       return res.status(404).json({ message: "Exam record not found" });
//     res.status(200).json(exam);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update an exam record by ID
// export const updateExam = async (req, res) => {
//   const { id } = req.params;
//   const { studentId, exams } = req.body;

//   try {
//     if (studentId) {
//       const student = await Student.findById(studentId);
//       if (!student || student.role !== "student") {
//         return res.status(400).json({ message: "Invalid student ID" });
//       }
//     }

//     if (exams) {
//       for (const exam of exams) {
//         const examExists = await ExamName.findById(exam.examName);
//         if (!examExists) {
//           return res.status(400).json({ message: "Invalid exam name ID" });
//         }
//         for (const subject of exam.subject) {
//           const subjectExists = await Subject.findById(subject.subjectName);
//           if (!subjectExists) {
//             return res.status(400).json({ message: "Invalid subject ID" });
//           }
//         }
//       }
//     }

//     const updatedExam = await Exam.findByIdAndUpdate(
//       id,
//       { studentId, exams },
//       { new: true }
//     )
//       .populate("studentId", "name rollNo classNumber")
//       .populate("exams.examName", "name")
//       .populate("exams.subject.subjectName", "subjectName");

//     if (!updatedExam)
//       return res.status(404).json({ message: "Exam record not found" });
//     res
//       .status(200)
//       .json({ message: "Exam record updated successfully", exam: updatedExam });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete an exam record by ID
// export const deleteExam = async (req, res) => {
//   try {
//     const deletedExam = await Exam.findByIdAndDelete(req.params.id);
//     if (!deletedExam)
//       return res.status(404).json({ message: "Exam record not found" });
//     res.status(200).json({ message: "Exam record deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all exam records for a specific student
// export const getExamsByStudent = async (req, res) => {
//   try {
//     const exams = await Exam.find({ studentId: req.params.studentId })
//       .populate("exams.examName", "name")
//       .populate("exams.subject.subjectName", "subjectName")
//       .populate("studentId", "name rollNo classNumber");
//     res.status(200).json(exams);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all exam records for a specific class
// export const getExamsByClass = async (req, res) => {
//   try {
//     const students = await Student.find({
//       classNumber: req.params.classId,
//     }).select("_id");
//     if (!students.length)
//       return res
//         .status(404)
//         .json({ message: "No students found for this class" });

//     const exams = await Exam.find({
//       studentId: { $in: students.map((s) => s._id) },
//     })
//       .populate("studentId", "name rollNo classNumber")
//       .populate("exams.examName", "name")
//       .populate("exams.subject.subjectName", "subjectName");
//     res.status(200).json(exams);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get student marks by phone and class
// export const getStudentMarksByPhoneAndClass = async (req, res) => {
//   const { phone, classId } = req.body;
//   try {
//     // Find the student based on phone and class
//     const student = await Student.findOne({
//       mobile: Number(phone),
//       classNumber: classId,
//     });
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     // Fetch exams for the student with proper population
//     const exams = await Exam.find({ studentId: student._id })
//       .populate("exams.examName", "name")
//       .populate("exams.subject.subjectName", "subjectName")
//       .populate("studentId", "name rollNo classNumber");

//     res.status(200).json({ student, exams });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
