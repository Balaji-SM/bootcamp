require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Corrected MongoDB Connection String (Use Lowercase db name)
const MONGO_URI = "mongodb+srv://balasivam05:bala12345@bala.cr6gc.mongodb.net/project-0?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
});

const Student = mongoose.model("Student", studentSchema);

// ✅ API to Fetch Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
});

// ✅ API to Add Student (for testing)
app.post("/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: "Error adding student", error });
  }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
