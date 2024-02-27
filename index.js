const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoroutes"); // Import your routes
const Todo = require("./models/todo");

const app = express();
const port = 8080;
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Access MongoDB URI using process.env
const uri = process.env.MONGODB_URI;

// Define a Todo schema
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Create a Todo model based on the schema
// const Todo = mongoose.model("Todo", todoSchema);

app.use(express.json());

// Use your Todo routes
app.use(todoRoutes);

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successfully connecting to MongoDB
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
