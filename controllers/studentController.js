import Student from "../models/Student.js";
import Class from "../models/Class.js";
import bcrypt from "bcryptjs";

// Add a new student
export const addStudent = async (req, res) => {
  const {
    name,
    rollNo,
    classNumber,
    regNo,
    mobile,
    // password,
    guardian,
    dob,
    image,
    place,
    gender,
  } = req.body;

  try {
    // Check if the student already exists within the same class
    const existingStudent = await Student.findOne({
      classNumber,
      $or: [{ rollNo }, { regNo }],
    });
    if (existingStudent) {
      return res
        .status(400)
        .json({
          message:
            "Student with this Roll No or Admission No already exists in this class",
        });
    }
    // Validate if the class exists
    const validClass = await Class.findById(classNumber);
    if (!validClass) {
      return res.status(400).json({ message: "Invalid class ID" });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const student = new Student({
      name,
      rollNo,
      classNumber,
      regNo,
      mobile,
      // password: hashedPassword,
      guardian,
      dob,
      place,
      gender,
    });
    await student.save();

    res.status(201).json({ message: "Student added successfully", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate(
      "classNumber",
      "classNumber"
    );
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id).populate(
      "classNumber",
      "classNumber"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    rollNo,
    classNumber,
    regNo,
    mobile,
    password,
    guardian,
    image,
    place,
    gender,
  } = req.body;

  try {
    // Validate if the class exists
    if (classNumber) {
      const validClass = await Class.findById(classNumber);
      if (!validClass) {
        return res.status(400).json({ message: "Invalid class ID" });
      }
    }

    // Hash the password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        rollNo,
        classNumber,
        regNo,
        mobile,
        password: hashedPassword,
        guardian,
        place,
        gender,
      },
      { new: true } // Return the updated document
    ).populate("classNumber", "classNumber");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudentByClassId = async (req, res) => {
  console.log("classId", req.params.classId);
  try {
    const { classId } = req.params;


    if (!classId) {
      return res.status(400).json({ message: "Class ID is required" });
    }

    const students = await Student.find({ classNumber : classId });

    if (!students.length) {
      return res
        .status(404)
        .json({ message: "No students found for this class" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
