const pool = require('../Database/db');

// Get resume

const getResume = async(req,res)=>{
    try{
        const result = await pool.query(
            "SELECT * FROM resumes ORDER BY id ASC LIMIT 1"
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Resume not found" });
        }
        res.status(200).json(result.rows[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to fetch resume" });
    }
};


// Update Resume

const updateResume = async(req,res)=>{
    try{
        const { resume_url } = req.body;
        
        // Validation
        if(!resume_url){
            return res.status(400).json({
                error: "Resume URL is required"
            });
        }

        const result = await pool.query(
             `
            UPDATE resumes
            SET
                resume_url = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = 1
            RETURNING *
            `,
            [resume_url]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Resume not found" });
        }

        res.status(200).json({ 
            message: "Resume updated successfully" ,
            resume: result.rows[0]
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to update resume" });
    }
}


module.exports = {
    getResume,
    updateResume
};