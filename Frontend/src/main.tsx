import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Router from './misc/Router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 flex flex-col">
          <Router />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>,
)