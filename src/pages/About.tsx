import { Reveal, Section, SectionHeading } from '../components/ui'
import CTASection from '../components/CTASection'
const blocks = [
  ['What MS Labs is', 'A technology and product company that builds mobile apps, digital products and software solutions.'],
  ['Problems we solve', 'Everyday friction that good software can remove — for people using our apps and for teams that need dependable engineering.'],
  ['Product-first mindset', 'We build things we would want to use, and treat client work with the same care for usability and maintainability.'],
  ['Technology philosophy', 'Modern, proven tools; clean code; and architecture that stays easy to change.'],
  ['Long-term vision', 'A growing portfolio of focused products, backed by a trusted engineering practice.'],
]
export default function About() {
  return (<><Section><SectionHeading page eyebrow="About" title="A product-first technology company" />
    <div className="grid gap-5 md:grid-cols-2">{blocks.map(([t, d], i) => <Reveal key={t} delay={i * 0.05}><div className="h-full rounded-2xl border border-line bg-card p-6"><h2 className="text-lg font-semibold text-white">{t}</h2><p className="mt-2 text-slate-400">{d}</p></div></Reveal>)}</div></Section><CTASection /></>)
}
