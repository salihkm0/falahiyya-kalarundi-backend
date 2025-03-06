import User from "../models/User.js";
import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, mobile, password, role } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user based on role

    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "staff" }); // Corrected from "roll" to "role"
    res.status(200).json(teachers);
  } catch (err) {
    console.error("Error fetching teachers:", err); // Logs the error for debugging
    res.status(500).json({ error: "Failed to fetch teachers" }); // Generic error message
  }
};
