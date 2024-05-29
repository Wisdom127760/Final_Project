// Import required Node.js modules
const express = require("express"); // Express framework for building web applications
const dotenv = require("dotenv"); // Dotenv module for loading environment variables from a.env file
const mongoose = require("mongoose"); // Mongoose module for interacting with MongoDB

// Import the authentication router
const authRouter = require("./controllers/auth");
const contentRouter = require("./controllers/content");
const verifyRole = require("./middleware/verifyRole");

const authMiddleware = require("./middleware/auth");
// Load environment variables from.env file
dotenv.config();

// Initialize an Express application
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Initialize an Express router
const router = express.Router();

// Connect to MongoDB using Mongoose
const url = process.env.MONGODB_URL;
try {
  mongoose.connect(url);
} catch (error) {
  console.error("mongodb connection error: ", error);
}
// Register the router as a middleware for all routes
app.use(router);

// Handle 404 errors for non-existent routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "this route does not exist" });
});

// Register the authentication router at the /auth path
router.use("/auth", authRouter);
router.use("/admin", authMiddleware, verifyRole('Admin'), contentRouter);
router.use("/editor", authMiddleware, verifyRole('Editor'), contentRouter);
router.use("/viewer", authMiddleware, verifyRole('Viewer'), contentRouter);
// Get the port number from the environment variables
const port = process.env.PORT;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});