const express = require('express');
const router = express.Router();

const {
    getExperiences,
    createExperiences,
    updateExperiences,
    deleteExperiences
} = require('../controllers/experienceController');

const { verifyToken } = require("../middleware/authMiddleware");

// Get experiences
router.get("/", getExperiences);
// Create experience
router.post("/", verifyToken, createExperiences);
// Update experience
router.put("/:id", verifyToken, updateExperiences);
// Delete experience
router.delete("/:id", verifyToken, deleteExperiences);

module.exports = router;