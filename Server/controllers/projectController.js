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

module.exports = {
    getProjects
};