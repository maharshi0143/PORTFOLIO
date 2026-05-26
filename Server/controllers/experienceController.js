const pool = require('../Database/db');

// Get Experiences

const getExperiences = async (req,res) => {
    try{
        const result = await pool.query(
            "SELECT * FROM experiences ORDER BY id ASC"
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Create Experience
const createExperiences = async(req,res)=>{
    try{
        const{
            title,
            duration,
            description
        } = req.body;

        // Validation
        if(!title || !duration || !description){
            return res.status(400).json({
                error: "Title, Duration and Description are required"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO experiences (
                title,
                duration,
                description
            )
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [title, duration, description]
        );
        res.status(201).json({
            message: "Experience created successfully",
            experience: result.rows[0]
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to create experience" });
    }
};


// Update Experiences

const updateExperiences = async(req,res)=>{
    try{
        const { id } = req.params;
        const {
            title,
            duration,
            description
        } = req.body;

        const result = await pool.query(
            `
            UPDATE experiences
            SET
                title = $1,
                duration = $2,
                description = $3
            WHERE id = $4
            RETURNING *
            `,
            [title, duration, description, id]
        );

        // Validation

        if(result.rows.length === 0){
            return res.status(404).json({
                error: "Experience not found"
            });
        }

        res.status(200).json({
            message: "Experience updated successfully",
            experience: result.rows[0]
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to update experience" });
    }
};



// Delete Experiences

const deleteExperiences = async(req,res)=>{
    try{
        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM experiences
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                error: "Experience not found"
            });
        }

        res.status(200).json({
            message: "Experience deleted successfully",
            experience: result.rows[0]
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to delete experience" });
    }
};

module.exports = {
    getExperiences,
    createExperiences,
    updateExperiences,
    deleteExperiences
};
