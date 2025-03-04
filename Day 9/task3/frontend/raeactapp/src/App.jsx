import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// ✅ Student Card Component
const StudentCard = ({ student }) => (
  <div className="student-card">
    <img src="https://via.placeholder.com/150" alt="Student" />
    <h2>{student.name}</h2>
    <p><strong>ID:</strong> {student.id}</p>
  </div>
);

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then((response) => {
        console.log("✅ Students fetched:", response.data);
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching students:", error);
        setError("Failed to fetch student data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>Student List</h1>
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading students...</p>}
      <div className="student-grid">
        {students.length > 0 ? (
          students.map((student) => <StudentCard key={student.id} student={student} />)
        ) : (
          !loading && !error && <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
