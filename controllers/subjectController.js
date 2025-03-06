import Subject from '../models/Subjects.js';

// Add a new subject
export const addSubject = async (req, res) => {
  const { subjectName } = req.body;

  try {
    // Check if the subject already exists
    const existingSubject = await Subject.findOne({ subjectName });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already exists' });
    }

    // Create a new subject
    const subject = new Subject({ subjectName });
    await subject.save();

    res.status(201).json({ message: 'Subject added successfully', subject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single subject by ID
export const getSubjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a subject by ID
export const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { subjectName } = req.body;

  try {
    const subject = await Subject.findByIdAndUpdate(
      id,
      { subjectName },
      { new: true } // Return the updated document
    );

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject updated successfully', subject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a subject by ID
export const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};