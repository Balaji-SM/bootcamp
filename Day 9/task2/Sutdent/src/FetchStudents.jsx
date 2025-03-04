import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => {
        console.log("Fetched students:", response.data);  // Debugging log
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching student data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student.studentId}>
              <strong>{student.name}</strong> - ID: {student.studentId}, Age: {student.age}, Major: {student.major}
            </li>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </ul>
    </div>
  );
};

export default FetchStudents;
