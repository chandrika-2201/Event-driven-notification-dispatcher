const express = require("express");

const app = express();

app.use(express.json());

const eventRoutes = require("./routes/eventRoutes");

app.use("/api/v1/events", eventRoutes);

module.exports = app;