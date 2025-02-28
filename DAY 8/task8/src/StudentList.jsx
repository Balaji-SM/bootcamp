import React, { useState } from "react";
import StudentCard from "./StudentCard";
import './App.css';

const StudentList = () => {
  const [students, setStudents] = useState([
    { name: "adhi", year: "Freshman" },
    { name: "bala", year: "Sophomore" },
    { name: "swetha", year: "Junior" },
    { name: "mukil", year: "Senior" },
  ]);

  const [name, setName] = useState("");
  const [year, setYear] = useState("Freshman");

  // Function to add a new student
  const addStudent = () => {
    if (name.trim() === "") return; // Prevent empty names
    setStudents([...students, { name, year }]);
    setName(""); // Reset input field
  };

  // Function to remove a student by index
  const removeStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Add Student Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold mb-4">Add Student</h2>
        <input
          type="text"
          placeholder="Enter name"
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded mb-3"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        <button
          onClick={addStudent}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Add Student
        </button>
      </div>

      {/* Student List */}
      <div className="flex flex-wrap justify-center gap-6">
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="relative">
              <StudentCard name={student.name} year={student.year} />
              <button
                onClick={() => removeStudent(index)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg font-semibold">No students found</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
