import Admission from "../models/admissionModel.js";

// @desc   Create a new admission
// @route  POST /api/admissions
// @access Public
export const createAdmission = async (req, res) => {
    try {
      const { aadhaar, certificateNumber } = req.body;
  
      // Check if Aadhaar already exists
      const existingAadhaar = await Admission.findOne({ aadhaar });
      if (existingAadhaar) {
        return res.status(400).json({ message: "Aadhaar number already exists" });
      }
  
      // Check if Certificate Number already exists
      const existingCertificate = await Admission.findOne({ certificateNumber });
      if (existingCertificate) {
        return res.status(400).json({ message: "Certificate number already exists" });
      }
  
      const newAdmission = await Admission.create(req.body);
      res.status(201).json(newAdmission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// @desc   Get all admissions
// @route  GET /api/admissions
// @access Public
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get a single admission by ID
// @route  GET /api/admissions/:id
// @access Public
export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ message: "Admission not found" });

    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update an admission
// @route  PUT /api/admissions/:id
// @access Public
export const updateAdmission = async (req, res) => {
    try {
      const { aadhaar, certificateNumber } = req.body;
      const admissionId = req.params.id;
  
      // Check if Aadhaar is taken by another record
      if (aadhaar) {
        const existingAadhaar = await Admission.findOne({ aadhaar, _id: { $ne: admissionId } });
        if (existingAadhaar) {
          return res.status(400).json({ message: "Aadhaar number already exists" });
        }
      }
  
      // Check if Certificate Number is taken by another record
      if (certificateNumber) {
        const existingCertificate = await Admission.findOne({ certificateNumber, _id: { $ne: admissionId } });
        if (existingCertificate) {
          return res.status(400).json({ message: "Certificate number already exists" });
        }
      }
  
      const updatedAdmission = await Admission.findByIdAndUpdate(admissionId, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedAdmission) {
        return res.status(404).json({ message: "Admission not found" });
      }
  
      res.status(200).json(updatedAdmission);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// @desc   Delete an admission
// @route  DELETE /api/admissions/:id
// @access Public
export const deleteAdmission = async (req, res) => {
  try {
    const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);

    if (!deletedAdmission) return res.status(404).json({ message: "Admission not found" });

    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
