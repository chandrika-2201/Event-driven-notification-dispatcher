const express = require("express");

const router = express.Router();

// Import Controller
const eventController = require("../controllers/eventController");

// POST /api/v1/events
router.post("/", eventController.createEvent);

module.exports = router;