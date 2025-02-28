import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import StudentList from "./Studentlist";



 
  
  const studentsData = [
    { name: "balaji", major: "Computer Science", year: "4" },
    { name: "swathi", major: "Mechanical Engineering", year: "4" },
    { name: "swetha", major: "Business Administration", year: "4" },
  ];
  
  function App() {
   
    return (
      
      <div >
        <p className='bala'>student directory</p>
        <StudentList students={studentsData} />
      </div>
    );
  }
  


export default App;
  