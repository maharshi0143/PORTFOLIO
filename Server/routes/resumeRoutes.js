const express= require('express');
const router = express.Router();

const {
    getResume,
    updateResume
} = require('../controllers/resumeController');

const { verifyToken } = require("../middleware/authMiddleware");

// Get resume
router.get("/", getResume);
// Update resume
router.put("/", verifyToken, updateResume);

module.exports = router;