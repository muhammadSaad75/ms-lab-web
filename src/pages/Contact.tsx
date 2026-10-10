import { useState, type FormEvent } from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { Button, Section, SectionHeading } from '../components/ui'
import { site } from '../config/siteConfig'
const types = ['Mobile app', 'Web application', 'Backend / API', 'SDK / integration', 'Optimization / support', 'Other']
const field = 'w-full rounded-xl border border-line bg-card px-4 py-3 text-base text-white outline-none focus:border-brand'
export default function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const text = `Hi MS Labs, I'm ${d.get('name')} (${d.get('email')}).\nProject type: ${d.get('type')}\n\n${d.get('message')}`
    window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setSent(true)
  }
  return (
    <Section>
      <SectionHeading page eyebrow="Contact" title="Let's talk about your project" desc="Message us on WhatsApp for the fastest reply, or send the form." />
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          <Button href={site.whatsapp} variant="wa" className="w-full"><MessageCircle className="h-4 w-4" aria-hidden />WhatsApp {site.phone}</Button>
          <Button href={site.tel} variant="ghost" className="w-full"><Phone className="h-4 w-4" aria-hidden />Call {site.phone}</Button>
          <Button href={`mailto:${site.email}`} variant="ghost" className="w-full"><Mail className="h-4 w-4" aria-hidden />{site.email}</Button>
        </div>
        <form onSubmit={submit} className="space-y-4 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">Name<input required name="name" autoComplete="name" className={`${field} mt-1.5`} /></label>
            <label className="text-sm">Email<input required type="email" name="email" autoComplete="email" className={`${field} mt-1.5`} /></label>
          </div>
          <label className="block text-sm">Project type<select name="type" className={`${field} mt-1.5`}>{types.map(t => <option key={t}>{t}</option>)}</select></label>
          <label className="block text-sm">Message<textarea required name="message" rows={5} className={`${field} mt-1.5`} /></label>
          <Button type="submit" className="w-full sm:w-auto">Send via WhatsApp</Button>
          {sent && <p role="status" className="text-sm text-emerald-400">WhatsApp opened with your message ready to send.</p>}
        </form>
      </div>
    </Section>
  )
}
