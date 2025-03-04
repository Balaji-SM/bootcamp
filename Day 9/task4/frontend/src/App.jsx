import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// ✅ Student Card Component
const StudentCard = ({ student }) => (
  <div className="student-card">
    <img src="https://via.placeholder.com/150" alt="Student" />
    <h2>{student.name}</h2>
    <p><strong>Email:</strong> {student.email}</p>
    <p><strong>Major:</strong> {student.major}</p>
    <p><strong>Year:</strong> {student.year}</p>
  </div>
);

const App = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", major: "", year: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching students:", err);
      setError("Failed to fetch student data.");
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/students", formData);
      setFormData({ name: "", email: "", major: "", year: "" });
      fetchStudents();
    } catch (err) {
      console.error("❌ Error adding student:", err);
      setError("Failed to add student.");
    }
  };

  return (
    <div className="app-container">
      <h1>Student List</h1>

      {/* Form to Add Student */}
      <form onSubmit={addStudent} className="student-form">
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="text" placeholder="Email" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} required />
        <input type="text" placeholder="Major" value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} required />
        <input type="text" placeholder="Year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} required />
        <button type="submit">Add Student</button>
      </form>

      {loading && <p>Loading students...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="student-grid">
        {students.length > 0 ? (
          students.map((student) => <StudentCard key={student._id} student={student} />)
        ) : (
          !loading && !error && <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
