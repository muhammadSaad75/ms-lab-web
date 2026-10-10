import { Button, Section } from '../components/ui'
export default function NotFound() {
  return <Section className="text-center"><p className="grad-text text-7xl font-semibold">404</p><h1 className="mt-4 text-2xl font-semibold text-white">Page not found</h1><p className="mt-2 text-slate-400">That page doesn't exist or has moved.</p><div className="mt-8"><Button to="/">Back home</Button></div></Section>
}
