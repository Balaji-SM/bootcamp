import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { StrictMode } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import StudentCard from './StudentCard'
import StudentList from './StudentList'

function App() {
  return(
    <>
    <StrictMode />
    <StudentCard />
    <StudentList />
    <StrictMode />,
    </>

  )
}
export default App;