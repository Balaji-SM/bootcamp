require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://balasivam05:bala12345@bala.cr6gc.mongodb.net/Project0?retryWrites=true&w=majority&appName=bala";

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Student Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  major: String,
  year: String,
});
const Student = mongoose.model("Student", studentSchema);

// ✅ API Route - Fetch Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found." });
    }
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// ✅ API Route - Add a Student
app.post("/students", async (req, res) => {
  try {
    const { name, email, major, year } = req.body;
    const newStudent = new Student({ name, email, major, year });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding student" });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
