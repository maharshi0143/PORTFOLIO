const express = require('express');
const router = express.Router();

const {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
} = require('../controllers/skillController');

const { verifyToken } = require("../middleware/authMiddleware");

// Get skills
router.get("/", getSkills);
// Create skill
router.post("/", verifyToken, createSkill);
// Update skill
router.put("/:id", verifyToken, updateSkill);
// Delete skill
router.delete("/:id", verifyToken, deleteSkill);

module.exports = router;