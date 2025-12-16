import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Router from './misc/Router';
import NavBar from './components/NavBar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <NavBar/>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)