const pool = require("../Database/db");

const nodemailer = require("nodemailer");

/* CREATE TRANSPORTER */

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};


/* SEND MESSAGE */

const sendMessage = async (req, res) => {

    try{

        const {
            name,
            email,
            message
        } = req.body;

        const trimmedName = (name || "").trim();
        const trimmedEmail = (email || "").trim();
        const trimmedMessage = (message || "").trim();

        /* VALIDATION */

        if(!trimmedName || !trimmedEmail || !trimmedMessage){

            return res.status(400).json({

                error: "All fields are required"

            });

        }

        if(!isValidEmail(trimmedEmail)){

            return res.status(400).json({

                error: "Invalid email format"

            });

        }

        /* SEND EMAIL */

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: trimmedEmail,

            subject: "New Portfolio Contact Message 🚀",

            html: `

                <h2>New Message</h2>

                <p>

                    <strong>Name:</strong>
                    ${trimmedName}

                </p>

                <p>

                    <strong>Email:</strong>
                    ${trimmedEmail}

                </p>

                <p>

                    <strong>Message:</strong>
                    ${trimmedMessage}

                </p>

            `

        });

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
                trimmedName,
                trimmedEmail,
                trimmedMessage
            ]

        );

        /* RESPONSE */

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

        res.status(200).json(

            result.rows

        );

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