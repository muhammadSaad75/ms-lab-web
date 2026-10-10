import { Section, SectionHeading } from '../components/ui'
import { ServiceCard } from '../components/Cards'
import CTASection from '../components/CTASection'
import { services } from '../data/services'
export default function Services() {
  return (<><Section><SectionHeading page eyebrow="Services" title="Software Development, Built Around Your Needs" desc="Practical engineering across mobile, web and backend." />
    <div className="grid gap-5 md:grid-cols-2">{services.map((s, i) => <ServiceCard key={s.slug} s={s} full i={i} />)}</div></Section><CTASection /></>)
}
