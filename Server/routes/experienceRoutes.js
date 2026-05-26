const express = require('express');
const router = express.Router();

const {
    getExperiences,
    createExperiences,
    updateExperiences,
    deleteExperiences
} = require('../controllers/experienceController');

// Get experiences
router.get("/", getExperiences);
// Create experience
router.post("/", createExperiences);
// Update experience
router.put("/:id", updateExperiences);
// Delete experience
router.delete("/:id", deleteExperiences);

module.exports = router;