import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import "./main.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='root-container'>
      <div className='nav-container'>
      <Navbar/>

      </div>
      <div className='root-body'>
      <App /> 
      </div>
      
          {/* If needed footer goes here */}

    </div>
    
  </StrictMode>,
)
