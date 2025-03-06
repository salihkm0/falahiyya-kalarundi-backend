import ExamName from "../models/examName.js";

// Add a new exam name
export const addExamName = async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const existingExam = await ExamName.findOne({ name });
    if (existingExam) {
      return res.status(400).json({ message: "Exam name already exists" });
    }

    const examName = new ExamName({ name, description, date });
    await examName.save();

    res.status(201).json({ message: "Exam name added successfully", examName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all exam names
export const getAllExamNames = async (req, res) => {
  try {
    const examNames = await ExamName.find();
    res.status(200).json(examNames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single exam name by ID
export const getExamNameById = async (req, res) => {
  try {
    const examName = await ExamName.findById(req.params.id);
    if (!examName) return res.status(404).json({ message: "Exam name not found" });
    res.status(200).json(examName);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an exam name by ID
export const updateExamName = async (req, res) => {
  try {
    const updatedExamName = await ExamName.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExamName) return res.status(404).json({ message: "Exam name not found" });
    res.status(200).json({ message: "Exam name updated successfully", examName: updatedExamName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an exam name by ID
export const deleteExamName = async (req, res) => {
  try {
    const deletedExamName = await ExamName.findByIdAndDelete(req.params.id);
    if (!deletedExamName) return res.status(404).json({ message: "Exam name not found" });
    res.status(200).json({ message: "Exam name deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
