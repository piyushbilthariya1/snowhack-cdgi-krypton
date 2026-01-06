const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/proxy", apiRoutes);

module.exports = app;
