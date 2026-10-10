import { MessageCircle } from 'lucide-react'
import { Button, Reveal } from './ui'
import { site } from '../config/siteConfig'
export default function CTASection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
        <div aria-hidden className="blob absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
        <h2 className="relative text-3xl font-semibold tracking-tight text-white sm:text-5xl">Have a Problem Worth Solving?</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-slate-400 sm:text-lg">Let's turn your idea into a useful digital product.</p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/contact/">Start a Conversation</Button>
          <Button href={site.whatsapp} variant="wa"><MessageCircle className="h-4 w-4" aria-hidden />WhatsApp Us</Button>
        </div>
      </Reveal>
    </section>
  )
}
