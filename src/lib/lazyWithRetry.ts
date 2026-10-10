import { lazy, type ComponentType } from 'react'

const KEY = 'chunk-reload'

// After a redeploy, old hashed chunks are gone: reload once to fetch the new index.html
export function lazyWithRetry<T extends ComponentType<any>>(load: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      const mod = await load()
      if (typeof window !== 'undefined') sessionStorage.removeItem(KEY)
      return mod
    } catch (err) {
      if (!sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, '1')
        window.location.reload()
        return new Promise<never>(() => {})
      }
      throw err
    }
  })
}
