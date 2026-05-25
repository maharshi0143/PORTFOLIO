const express = require('express');
const router = express.Router();

const { getProjects } = require('../controllers/projectController');

// Get projects
router.get("/", getProjects);

module.exports = router;