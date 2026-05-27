const pool = require("../Database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ALLOWED_ADMIN_EMAIL = "admin@gmail.com";

const isStrongPassword = (value) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value);
};

// Register Admin.

const registerAdmin = async(req,res)=>{
    try{
        return res.status(403).json({
            error: "Admin registration is disabled"
        });

        const{
            email,
            password
        } = req.body;

        // Validation
        if(!email || !password){
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        if(!isStrongPassword(password)){
            return res.status(400).json({
                error: "Password must be at least 8 characters and include upper, lower, number, and symbol"
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            password,
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
            password
        } = req.body;

        if(email !== ALLOWED_ADMIN_EMAIL){
            return res.status(403).json({
                error: "Unauthorized admin"
            });
        }

        // Validation
        if(!email || !password){
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
        const isMatch = await bcrypt.compare(
            password,
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