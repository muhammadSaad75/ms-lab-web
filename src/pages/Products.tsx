import { Section, SectionHeading } from '../components/ui'
import { ProductCard } from '../components/Cards'
import CTASection from '../components/CTASection'
import { products } from '../data/products'
export default function Products() {
  return (<><Section><SectionHeading page eyebrow="Products" title="Our Products" desc="Apps and digital products built to solve real problems. More are on the way." />
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}</div></Section><CTASection /></>)
}
