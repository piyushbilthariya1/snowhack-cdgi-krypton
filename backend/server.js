require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/v1/users", require("./src/routes/userRoutes"));
app.use("/api/v1/proxy", require("./src/routes/apiRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Gateway Live on Port ${PORT}`));
