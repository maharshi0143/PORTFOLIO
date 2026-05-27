const pool = require("../database/db");

/* SEND MESSAGE */

const sendMessage = async (req, res) => {

    try{
        const {
            name,
            email,
            message
        } = req.body;

        /* VALIDATION */

        if(!name || !email || !message){
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        /* INSERT MESSAGE */

        const result = await pool.query(

            `
            INSERT INTO contact_messages (

                name,
                email,
                message
            )
            VALUES ($1, $2, $3)
            RETURNING *
            `,

            [
                name,
                email,
                message
            ]

        );

        res.status(201).json({
            message: "Message sent successfully",
            contact: result.rows[0]
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to send message"
        });
    }
};

/* GET ALL MESSAGES */

const getMessages = async (req, res) => {

    try{
        const result = await pool.query(

            `
            SELECT * FROM contact_messages
            ORDER BY created_at DESC
            `
        );
        res.status(200).json(result.rows);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to fetch messages"
        });
    }
};

/* DELETE MESSAGE */

const deleteMessage = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query(
            `
            DELETE FROM contact_messages
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({

                error: "Message not found"
            });
        }

        res.status(200).json({
            message: "Message deleted successfully",
            contact: result.rows[0]

        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: "Failed to delete message"
        });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    deleteMessage
};