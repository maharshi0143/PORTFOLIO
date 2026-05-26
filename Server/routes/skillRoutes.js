const express = require('express');
const router = express.Router();

const {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill
} = require('../controllers/skillController');

// Get skills
router.get("/", getSkills);
// Create skill
router.post("/", createSkill);
// Update skill
router.put("/:id", updateSkill);
// Delete skill
router.delete("/:id", deleteSkill);

module.exports = router;