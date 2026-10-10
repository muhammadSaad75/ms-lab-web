import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App'
import './index.css'
const app = <StrictMode><MotionConfig reducedMotion="user"><BrowserRouter basename={import.meta.env.BASE_URL}><App /></BrowserRouter></MotionConfig></StrictMode>
const root = document.getElementById('root')!
// Production pages are prerendered (scripts/prerender.mjs), so hydrate them; dev serves an empty root
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
