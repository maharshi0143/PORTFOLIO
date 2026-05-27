const jwt = require("jsonwebtoken");

// Verify Token

const verifyToken = async(req,res,next)=>{
    try{

        // Get Header
        const authHeader = req.headers.authorization;

        // Check token exists
        if(!authHeader){
            return res.status(401).json({
                error: "Access denied. No token provided"
            });
        }

        // Token Format
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET
        );

        // Store admin data
        req.admin = decoded;
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            error: "Invalid token"
        });
    }
};

module.exports = {
    verifyToken
};