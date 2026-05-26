const express= require('express');
const router = express.Router();

const {
    getResume,
    updateResume
} = require('../controllers/resumeController');

// Get resume
router.get("/", getResume);
// Update resume
router.put("/", updateResume);

module.exports = router;