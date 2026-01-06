const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Mount Routes
app.use("/api/v1/users", userRoutes);

// 4. Global Error Handler (MUST BE LAST)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Gateway Server active on port ${PORT}`));
