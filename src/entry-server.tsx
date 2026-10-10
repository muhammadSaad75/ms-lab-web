import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App'
export { headTags, metaFor, routes } from './config/seo'
export { site } from './config/siteConfig'

// Build-time only: renders one route to HTML, waiting for lazy pages to load. Mirrors the tree in main.tsx.
export async function render(url: string) {
  const tree = <StrictMode><MotionConfig reducedMotion="user"><StaticRouter location={url}><App /></StaticRouter></MotionConfig></StrictMode>
  // No chunk-size limit: otherwise React outlines large pages into a hidden <div> swapped in by an inline
  // script, which crawlers that don't run JS see as hidden content behind a "Loading…" fallback.
  const { prelude } = await prerender(tree, { progressiveChunkSize: Infinity })
  return new Response(prelude).text()
}
