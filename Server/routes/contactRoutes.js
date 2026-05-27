const express = require("express");
const router = express.Router();

const {
    sendMessage,
    getMessages,
    deleteMessage
} = require("../controllers/contactController");

const { verifyToken } = require("../middleware/authMiddleware");

// Send message
router.post("/", sendMessage);

// Get all messages
router.get("/", verifyToken, getMessages);

// Delete message
router.delete("/:id", verifyToken, deleteMessage);

module.exports = router;