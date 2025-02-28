import React from "react";
import StudentCard from "./StudentCard";
import "./App.css";

const students = [
  { name: "balaji", year: "Freshman", major: "Computer Science" },
  { name: "saai", year: "Sophomore", major: "Mechanical Engineering" },
  { name: "swathi", year: "Junior", major: "Business" },
  { name: "swetha", year: "Senior", major: "information technology" },
];

const App = () => {
  return (
    <div className="app-container">
      {students.map((student, index) => (
        <StudentCard key={index} {...student} />
      ))}
    </div>
  );
};

export default App;
