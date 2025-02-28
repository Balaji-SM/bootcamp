import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentCard from './StudentCard'
import StudentList from './StudentList'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentCard />
    <StudentList />

  </StrictMode>,
)
