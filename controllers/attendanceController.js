import Attendance from '../models/Attendance.js';

// // ✅ Bulk Attendance Submission
// export const addAttendance = async (req, res) => {
//   try {
//     const { classId, month, year, attendanceData } = req.body;

//     if (!classId || !month || !year || !attendanceData) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     for (const studentAttendance of attendanceData) {
//       const { studentId, days } = studentAttendance;

//       // Find existing attendance record for the student, month, and year
//       let attendanceRecord = await Attendance.findOne({
//         classId,
//         month,
//         year,
//         studentId,
//       });

//       if (attendanceRecord) {
//         // Update existing record
//         const existingDayIndex = attendanceRecord.days.findIndex(
//           (day) => day.date === days[0].date
//         );

//         if (existingDayIndex !== -1) {
//           // Update the existing day record
//           attendanceRecord.days[existingDayIndex] = days[0];
//         } else {
//           // Add a new day record
//           attendanceRecord.days.push(days[0]);
//         }

//         await attendanceRecord.save();
//       } else {
//         // Create a new attendance record
//         attendanceRecord = new Attendance({
//           classId,
//           month,
//           year,
//           studentId,
//           days,
//         });

//         await attendanceRecord.save();
//       }
//     }

//     res.status(201).json({ message: "Attendance saved successfully" });
//   } catch (error) {
//     console.error("Error saving attendance:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Get Attendance by Class & Month
// export const getClassAttendance = async (req, res) => {
//   try {
//     const { classId, month, year, day } = req.query;

//     if (!classId || !month || !year || !day) {
//       return res.status(400).json({ message: 'Class, month, year, and day are required' });
//     }

//     // Format the date to match the `days.date` field in the database
//     const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

//     // Fetch attendance records for the class, month, and year
//     const attendanceRecords = await Attendance.find({ classId, month, year })
//       .populate('studentId', 'name rollNo')
//       .exec();

//     // Filter the `days` array to include only the selected day
//     const filteredRecords = attendanceRecords.map((record) => {
//       const dayRecord = record.days.find((day) => day.date === formattedDate);
//       return {
//         ...record.toObject(),
//         days: dayRecord ? [dayRecord] : [], // Include only the selected day
//       };
//     });

//     res.status(200).json(filteredRecords);
//   } catch (error) {
//     console.error('Error fetching attendance:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // ✅ Get Attendance by Student
// export const getAttendanceByStudent = async (req, res) => {
//   try {
//     const { studentId, month, year } = req.query;

//     if (!studentId || !month || !year) {
//       return res.status(400).json({ message: 'Student, month, and year are required' });
//     }

//     const attendanceRecord = await Attendance.findOne({ studentId, month, year });

//     if (!attendanceRecord) {
//       return res.status(404).json({ message: 'Attendance record not found' });
//     }

//     res.status(200).json(attendanceRecord);
//   } catch (error) {
//     console.error('Error fetching student attendance:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // ✅ Edit Attendance by Student
// export const editAttendanceByStudent = async (req, res) => {
//   try {
//     const { studentId, month, year, days } = req.body;

//     if (!studentId || !month || !year || !days) {
//       return res.status(400).json({ message: 'Student, month, year, and days are required' });
//     }

//     const updatedAttendance = await Attendance.findOneAndUpdate(
//       { studentId, month, year },
//       { $set: { days } },
//       { new: true }
//     );

//     if (!updatedAttendance) {
//       return res.status(404).json({ message: 'Attendance record not found' });
//     }

//     res.status(200).json({ message: 'Attendance updated successfully', updatedAttendance });
//   } catch (error) {
//     console.error('Error updating student attendance:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // ✅ Edit Attendance by Class
// export const editAttendanceByClass = async (req, res) => {
//   try {
//     const { classId, month, year, attendanceData } = req.body;

//     if (!classId || !month || !year || !attendanceData) {
//       return res.status(400).json({ message: 'Class, month, year, and attendance data are required' });
//     }

//     const updatePromises = attendanceData.map((student) =>
//       Attendance.findOneAndUpdate(
//         { classId, studentId: student.studentId, month, year },
//         { $set: { days: student.days } },
//         { new: true }
//       )
//     );

//     const updatedRecords = await Promise.all(updatePromises);

//     res.status(200).json({ message: 'Class attendance updated successfully', updatedRecords });
//   } catch (error) {
//     console.error('Error updating class attendance:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// ✅ Create Attendance Record
export const addAttendance = async (req, res) => {
  try {
    const { classId, studentId, presentDays, totalDays } = req.body;

    if (!classId || !studentId) {
      return res
        .status(400)
        .json({ message: "Class and Student are required" });
    }

    const newAttendance = new Attendance({
      classId,
      studentId,
      attendance: [{ presentDays, totalDays }],
    });

    await newAttendance.save();
    res.status(201).json({ message: "Attendance added successfully", newAttendance });
  } catch (error) {
    res.status(500).json({ message: "Error adding attendance", error });
  }
};

// ✅ Get Attendance by Student ID
export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await Attendance.find({ studentId }).populate("classId studentId");

    if (!attendance.length) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

// ✅ Get Attendance by Class ID
export const getAttendanceByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const attendance = await Attendance.find({ classId }).populate("classId studentId");

    if (!attendance.length) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

// ✅ Update Attendance Record
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { presentDays, totalDays } = req.body;

    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    attendance.attendance[0].presentDays = presentDays;
    attendance.attendance[0].totalDays = totalDays;

    await attendance.save();
    res.json({ message: "Attendance updated successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance", error });
  }
};

// ✅ Delete Attendance Record
export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.findByIdAndDelete(id);

    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance", error });
  }
};

