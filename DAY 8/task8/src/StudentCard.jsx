import React from "react";
import './App.css';

const StudentCard = ({ name, year }) => {
  const yearColors = {
    Freshman: "bg-green-400",
    Sophomore: "bg-yellow-400",
    Junior: "bg-blue-400",
    Senior: "bg-red-400",
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg w-60 text-center text-white font-semibold ${yearColors[year] || "bg-gray-400"}`}>
      <h2 className="text-xl">{name}</h2>
      <p className="text-md">Year: {year}</p>
    </div>
  );
};

export default StudentCard;
