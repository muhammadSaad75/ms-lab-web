import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ErrorBoundary from '../components/ErrorBoundary'
import { useSeo } from '../hooks/useSeo'
export default function MainLayout() {
  const { pathname } = useLocation()
  useSeo(pathname)
  // Skip the page-enter fade on the first (prerendered) page so content is visible before JS runs
  const mounted = useRef(false)
  useEffect(() => { mounted.current = true }, [])
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900">Skip to content</a>
      <Navbar />
      <motion.main id="main" key={pathname} initial={mounted.current ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex-1 pt-20">
        <ErrorBoundary key={pathname}><Suspense fallback={<div className="grid h-[60vh] place-items-center text-sm text-slate-500" role="status">Loading…</div>}><Outlet /></Suspense></ErrorBoundary>
      </motion.main>
      <Footer />
    </div>
  )
}
