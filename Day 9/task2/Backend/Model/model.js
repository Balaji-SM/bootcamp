const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  major: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
