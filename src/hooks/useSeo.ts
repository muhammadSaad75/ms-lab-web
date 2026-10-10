import { useEffect } from 'react'
import { headTags, metaFor } from '../config/seo'

// The prerendered HTML already ships the right tags; this keeps them in sync on client-side navigation.
export function useSeo(pathname: string) {
  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach(n => n.remove())
    document.head.insertAdjacentHTML('beforeend', headTags(metaFor(pathname)))
  }, [pathname])
}
