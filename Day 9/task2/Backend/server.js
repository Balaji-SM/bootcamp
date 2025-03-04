const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./Model/model");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://balasivam05:bala12345@bala.cr6gc.mongodb.net/?retryWrites=true&w=majority&appName=bala", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ GET: Fetch all students from MongoDB
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// ✅ POST: Add a student to MongoDB
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
