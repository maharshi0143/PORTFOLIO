const express = require('express');
const router = express.Router();

const {  

    getProjects,
    createProject,
    updateProject,
    deleteProject

 } = require('../controllers/projectController');

const { verifyToken } = require("../middleware/authMiddleware");

// Get projects
router.get("/", getProjects);
// Create project
router.post("/",verifyToken, createProject);
// Update project
router.put("/:id", verifyToken, updateProject);
// Delete project
router.delete("/:id", verifyToken, deleteProject);

module.exports = router;