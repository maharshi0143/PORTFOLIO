const express = require('express');
const cors = require('cors');

require('dotenv').config();

const pool = require('./Database/db');
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);

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