import { Hammer, Lightbulb, Sparkles, ArrowRight } from 'lucide-react'
import { AnimatedBackground, Button, Reveal, Section, SectionHeading } from '../components/ui'
import { ProcessStep, ProductCard, ServiceCard } from '../components/Cards'
import CTASection from '../components/CTASection'
import { products } from '../data/products'
import { process as steps, services } from '../data/services'
const what = [
  [Lightbulb, 'Build Products', 'We turn ideas and real-world problems into useful digital products.'],
  [Hammer, 'Develop Solutions', 'We build mobile, web and software solutions tailored to specific needs.'],
  [Sparkles, 'Improve Experiences', 'We optimize existing products for better performance, usability and reliability.'],
] as const
const why = [
  ['Problem-first thinking', 'We start with the problem, not the technology.'],
  ['Modern technology', 'Current, well-supported tools that age well.'],
  ['Clean & maintainable development', 'Readable, typed code that is easy to extend.'],
  ['Scalable architecture', 'Foundations that grow with your product.'],
  ['Long-term product mindset', 'We build to be maintained, not just shipped.'],
]
export default function Home() {
  return (
    <>
      <div className="relative">
        <AnimatedBackground />
        <Section className="pt-14 text-center sm:pt-24">
          <div className="rise">
            <p className="mx-auto mb-6 inline-block rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium text-slate-300">MS Labs — Software & Digital Products</p>
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">Turning Problems Into <span className="grad-text">Better Digital Solutions.</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">We build thoughtful software products and digital solutions that solve real-world problems — from mobile applications to scalable software experiences.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button to="/products/">Explore Our Products</Button><Button to="/contact/" variant="ghost">Let's Build Something</Button></div>
          </div>
        </Section>
      </div>
      <Section className="!py-8 text-center"><Reveal><p className="text-sm text-slate-500">Built with React · React Native · TypeScript · Modern APIs</p></Reveal></Section>
      <Section>
        <SectionHeading eyebrow="What We Do" title="We Build Software That Solves Problems" desc="From product ideas to production-ready applications, MS Labs focuses on building practical, scalable and user-focused digital solutions." />
        <div className="grid gap-5 md:grid-cols-3">{what.map(([I, t, d], i) => <Reveal key={t} delay={i * 0.08}><div className="h-full rounded-2xl border border-line bg-card p-7"><I className="mb-5 h-7 w-7 text-brand" aria-hidden /><h3 className="text-xl font-semibold text-white">{t}</h3><p className="mt-2 text-slate-400">{d}</p></div></Reveal>)}</div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Products" title="Products We're Building" desc="Our own apps and digital products, published under MS Labs." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}</div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Services" title="Software Development, Built Around Your Needs" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.filter(s => s.home).map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}</div>
        <Reveal className="mt-10"><Button to="/services/" variant="ghost">Explore Services <ArrowRight className="h-4 w-4" aria-hidden /></Button></Reveal>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div><SectionHeading eyebrow="How We Work" title="A clear path from problem to product" /></div>
          <div>{steps.map(([t, d], i) => <ProcessStep key={t} n={`0${i + 1}`} title={t} desc={d} last={i === steps.length - 1} />)}</div>
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Why MS Labs" title="Principles we build by" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{why.map(([t, d], i) => <Reveal key={t} delay={i * 0.05}><div className="h-full rounded-2xl border border-line p-6"><h3 className="font-semibold text-white">{t}</h3><p className="mt-2 text-sm text-slate-400">{d}</p></div></Reveal>)}</div>
      </Section>
      <Section>
        <Reveal className="max-w-3xl"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand2">Future Vision</p><h2 className="text-3xl font-semibold text-white sm:text-4xl">A growing family of useful products.</h2><p className="mt-4 text-lg text-slate-400">MS Labs is a product-first company. Our goal is to publish a growing portfolio of focused apps while partnering with teams that need dependable software.</p></Reveal>
      </Section>
      <CTASection />
    </>
  )
}
