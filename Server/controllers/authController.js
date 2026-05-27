const pool = require("../Database/db");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Admin.

const registerAdmin = async(req,res)=>{
    try{
        const{
            email,
            password_hash
        } = req.body;

        // Validation
        if(!email || !password_hash){
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        // Check Existing Admin
        const existingAdmin = await pool.query(
            "SELECT * FROM admins WHERE email = $1",
            [email]
        );

        if(existingAdmin.rows.length > 0){
            return res.status(400).json({
                error: "Admin already exists"
            });
        }

        // Hash Password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(
            password_hash,
            salt
        );

        // Insert Admin
        const result = await pool.query(
            "INSERT INTO admins (email, password_hash) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );

        res.status(201).json({
            message: "Admin registered successfully",
            admin: result.rows[0]
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Registration failed"
        });
    }
};


// Login Admin.

const loginAdmin = async(req,res)=>{
    try{
        const{
            email,
            password_hash
        } = req.body;

        // Validation
        if(!email || !password_hash){
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        // Find Admin
        const result = await pool.query(
            "SELECT * FROM admins WHERE email = $1",
            [email]
        );

        if(result.rows.length === 0){
            return res.status(400).json({
                error: "Invalid Credentials"
            });
        }
        const admin = result.rows[0];

        // Compare Password
        const isMatch = await bycrypt.compare(
            password_hash,
            admin.password_hash
        );

        if(!isMatch){
            return res.status(400).json({
                error: "Invalid Credentials"
            });
        }

        // Generate token
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token: token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            error: "Login failed"
        });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin
};