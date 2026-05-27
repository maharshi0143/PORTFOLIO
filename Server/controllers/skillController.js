const pool = require("../database/db");

/* GET SKILLS */

const getSkills = async (req, res) => {
    try{
        const result = await pool.query(
            "SELECT * FROM skills ORDER BY id ASC"
        );

        res.status(200).json(result.rows);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to fetch skills"
        });
    }
};

/* CREATE SKILL */

const createSkill = async (req, res) => {

    try{
        const {
            name,
            icon
        } = req.body;

        if(!name){
            return res.status(400).json({
                error: "Skill name is required"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO skills (

                name,
                icon
            )
            VALUES ($1, $2)
            RETURNING *
            `,
            [
                name,
                icon
            ]
        );

        res.status(201).json({
            message: "Skill created successfully",
            skill: result.rows[0]
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to create skill"
        });
    }
};

/* UPDATE SKILL */

const updateSkill = async (req, res) => {

    try{
        const { id } = req.params;
        const {

            name,
            icon

        } = req.body;

        const result = await pool.query(

            `
            UPDATE skills
            SET
                name = $1,
                icon = $2
            WHERE id = $3
            RETURNING *
            `,

            [
                name,
                icon,
                id
            ]
        );

        if(result.rows.length === 0){
            return res.status(404).json({
                error: "Skill not found"
            });
        }

        res.status(200).json({
            message: "Skill updated successfully",
            skill: result.rows[0]
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to update skill"
        });
    }
};

/* DELETE SKILL */

const deleteSkill = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query(

            `
            DELETE FROM skills
            WHERE id = $1
            RETURNING *
            `,
            [id]

        );
        if(result.rows.length === 0){
            return res.status(404).json({
                error: "Skill not found"
            });
        }

        res.status(200).json({
            message: "Skill deleted successfully",
            skill: result.rows[0]
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to delete skill"
        });
    }
};

module.exports = {

    getSkills,
    createSkill,
    updateSkill,
    deleteSkill

};