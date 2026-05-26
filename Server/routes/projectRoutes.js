const express = require('express');
const router = express.Router();

const {  

    getProjects,
    createProject,
    updateProject,
    deleteProject

 } = require('../controllers/projectController');

// Get projects
router.get("/", getProjects);
// Create project
router.post("/", createProject);
// Update project
router.put("/:id", updateProject);
// Delete project
router.delete("/:id", deleteProject);

module.exports = router;