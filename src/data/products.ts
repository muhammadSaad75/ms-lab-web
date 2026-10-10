import { Rocket, type LucideIcon } from 'lucide-react'
export type Product = {
  slug: string; name: string; category: string; description: string; long?: string
  icon: LucideIcon; screenshot?: string; features: string[]; platforms: string[]
  appStore?: string; playStore?: string; status: 'live' | 'coming-soon'
}
// Add new products here — pages and cards update automatically.
export const products: Product[] = [
  {
    slug: 'next-product', name: 'Next Product', category: 'Mobile App', status: 'coming-soon', icon: Rocket,
    description: 'Placeholder for our first published app. Replace this entry with real product details.',
    long: 'This is a template entry. Set the name, description, features, screenshot path, and store links in src/data/products.ts.',
    features: ['Feature one', 'Feature two', 'Feature three'], platforms: ['iOS', 'Android'],
    // appStore: 'https://apps.apple.com/...', playStore: 'https://play.google.com/store/apps/details?id=...', screenshot: '/screens/next.png',
  },
]
