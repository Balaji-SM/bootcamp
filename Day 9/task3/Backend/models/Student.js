const mongoose = require("mongoose");

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  course: { type: String },
  image: { type: String, default: "https://via.placeholder.com/150" } // Placeholder image
});

// Create Student Model
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
