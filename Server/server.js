const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const pool = require('./Database/db');
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false
});

const contactLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false
});

app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes); 
app.use("/api/experiences", experienceRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);

// Test Routes
app.get("/",(req,res)=>{
    res.send("Portfolio Backend Running 🚀");
});


// TEst database route
app.get("/test-db", async (req,res)=>{
    try{
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// PORT

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});