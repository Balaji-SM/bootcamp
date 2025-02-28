import React from "react";
import "./StudentCard.css";

const yearColors = {
  Freshman: "green",
  Sophomore: "yellow",
  Junior: "blue",
  Senior: "red",
};

const StudentCard = ({ name, year, major }) => {
  return (
    <div className="student-card" style={{ backgroundColor: yearColors[year] || "gray" }}>
      <h2>{name}</h2>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Major:</strong> {major}</p>
    </div>
  );
};

export default StudentCard;
