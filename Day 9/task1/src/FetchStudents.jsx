import React, { useEffect, useState } from "react";

const FetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/students") // Ensure correct backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Student List</h2>
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student.id}>{student.name} - {student.major}</li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default FetchStudents;
