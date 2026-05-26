const pool = require("../Database/db");

// Get all Projects

const getProjects = async (req,res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM projects ORDER BY created_at DESC"
        );
        res.status(200).json(result.rows);
    }catch(error){
        console.log(error);
        res.status(500).json({ 
            error: "Internal Server Error" 
        });
    }
}


// Create Project

const createProject = async(req,res)=>{
    try{
        const{
            title,
            description,
            techstack,
            github_link,
            live_link,
            image_url
        } = req.body;

        // Validation

        if(!title || !description){
            return res.status(400).json({
                error: "Title and Description are required"
            });
        }

        // Insert query
        const result = await pool.query(
            `
                INSERT INTO projects (
                    title,
                    description,
                    techstack,
                    github_link,
                    live_link,
                    image_url
                ) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                
                RETURNING *
            `,

            // These array is used to replace the placeholders in the query ($1, $2, etc.) with actual values from the request body. This helps prevent SQL injection attacks and ensures that the data is properly formatted for the database.
            [
                title,
                description,
                techstack,
                github_link,
                live_link,
                image_url
            ]
        );
        res.status(201).json({
            message: "Project created successfully",
            project: result.rows[0]
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to create project"
        });
    }
}


// Update Project

const updateProject = async(req,res)=>{
    try{
        const { id } = req.params;
        const {
            title,
            description,
            techstack,
            github_link,
            live_link,
            image_url
        } = req.body;

        // Update query
        const result = await pool.query(
            `
                UPDATE projects
                SET 
                    title = $1,
                    description = $2,
                    techstack = $3,
                    github_link = $4,
                    live_link = $5,
                    image_url = $6
                WHERE id = $7
                RETURNING *
            `,
            [
                title,
                description,
                techstack,
                github_link,
                live_link,
                image_url,
                id
            ]
        );

        // check if project exists
        if(result.rows.length === 0){
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project: result.rows[0]
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to update project"
        });
    }
}

// Delete Project

const deleteProject = async(req,res)=>{
    try{
        const { id } = req.params;

        // Delete query
        const result = await pool.query(
            `
            DELETE FROM projects
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );
        
        // Check if project exists

        if(result.rows.length === 0){
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully",
            project: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Failed to delete project"
        });
    }
}

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};

