import Class from '../models/Class.js';
import Subject from '../models/Subjects.js';
import User from '../models/User.js';

// Add a new class
export const addClass = async (req, res) => {
  const { classNumber, classTeacher, classTime, classSubjects } = req.body;

  try {
    // Check if the class already exists
    const existingClass = await Class.findOne({ classNumber });
    if (existingClass) {
      return res.status(400).json({ message: 'Class already exists' });
    }

    // Validate if the provided teacher ID exists and has the correct role
    const teacher = await User.findById(classTeacher);
    if (!teacher || !['staff', 'admin'].includes(teacher.role)) {
      return res.status(400).json({ message: 'Invalid teacher ID or role' });
    }

    // Validate if the provided subject IDs exist
    const validSubjects = await Subject.find({ _id: { $in: classSubjects } });
    if (validSubjects.length !== classSubjects.length) {
      return res.status(400).json({ message: 'Invalid subject IDs provided' });
    }

    // Create a new class
    const newClass = new Class({
      classNumber,
      classTeacher,
      classTime,
      classSubjects,
    });
    await newClass.save();

    res.status(201).json({ message: 'Class added successfully', class: newClass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
    try {
      const classes = await Class.find()
        .populate('classTeacher', 'name email mobile') // Populate teacher's name and email
        .populate('classSubjects'); // Populate subjects
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Get a single class by ID
export const getClassById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const classData = await Class.findById(id)
        .populate('classTeacher', 'name email mobile') // Populate teacher's name and email
        .populate('classSubjects'); // Populate subjects
  
      if (!classData) {
        return res.status(404).json({ message: 'Class not found' });
      }
      res.status(200).json(classData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Update a class by ID
export const updateClass = async (req, res) => {
    const { id } = req.params;
    const { classNumber, classTeacher, classTime, classSubjects } = req.body;
  
    try {
      // Validate if the provided teacher ID exists and has the correct role
      if (classTeacher) {
        const teacher = await User.findById(classTeacher);
        if (!teacher || !['staff', 'admin'].includes(teacher.role)) {
          return res.status(400).json({ message: 'Invalid teacher ID or role' });
        }
      }
  
      // Validate if the provided subject IDs exist
      if (classSubjects) {
        const validSubjects = await Subject.find({ _id: { $in: classSubjects } });
        if (validSubjects.length !== classSubjects.length) {
          return res.status(400).json({ message: 'Invalid subject IDs provided' });
        }
      }
  
      const updatedClass = await Class.findByIdAndUpdate(
        id,
        { classNumber, classTeacher, classTime, classSubjects },
        { new: true } // Return the updated document
      )
        .populate('classTeacher', 'name email mobile') // Populate teacher's name and email
        .populate('classSubjects'); // Populate subjects
  
      if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Delete a class by ID
export const deleteClass = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedClass = await Class.findByIdAndDelete(id);
      if (!deletedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };