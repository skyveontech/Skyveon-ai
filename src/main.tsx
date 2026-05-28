import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import Lenis from "lenis";
import { BrowserRouter } from 'react-router-dom';

const lenis = new Lenis();

function raf(time: number) {
  lenis.raf(time);

  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
      <App />
    </BrowserRouter>  </StrictMode>,
)
