import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import FetchStudents from './FetchStudents.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
<FetchStudents />
    
  </StrictMode>,
)
