import React, { useState } from "react";
import StudentCard from "./StudentCard";

const studentsData = [
  { name: "adhi", year: "Freshman" },
  { name: "vishal", year: "Sophomore" },
  { name: "niranjan", year: "Junior" },
  { name: "dany", year: "Senior" },
  { name: "elamaran", year: "Freshman" },
  { name: "swathi", year: "Junior" },
];

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on the search term (case insensitive)
  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <StudentCard key={index} name={student.name} year={student.year} />
          ))
        ) : (
          <p className="text-gray-500 text-lg font-semibold">No students found</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
