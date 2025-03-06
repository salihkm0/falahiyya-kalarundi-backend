import Announcement from '../models/Announcement.js';

// Create an announcement
export const createAnnouncement = async (req, res) => {
  const { title, description } = req.body;
  try {
    const announcement = new Announcement({ title, description });
    await announcement.save();
    res.status(201).json({ message: 'Announcement created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};