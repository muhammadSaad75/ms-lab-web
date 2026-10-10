import { Section } from '../components/ui'
import { site } from '../config/siteConfig'
const docs = {
  privacy: ['Privacy Policy', ['This website does not use accounts or store contact-form data on a server.', 'When you use the contact form, your message opens in WhatsApp and is sent under WhatsApp\'s own terms and privacy policy.', `Questions? Contact us at ${site.email}.`]],
  terms: ['Terms of Service', ['Content on this site is provided for general information about MS Labs.', 'Project scope, pricing and delivery are agreed in writing with each client before work starts.', 'We may update this site and these terms from time to time.']],
} as const
export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const [t, ps] = docs[kind]
  return <Section className="max-w-3xl"><h1 className="text-4xl font-semibold text-white">{t}</h1><p className="mt-2 text-xs text-slate-500">Starter text — have it reviewed before relying on it.</p><div className="mt-8 space-y-4 text-slate-400">{ps.map(p => <p key={p}>{p}</p>)}</div></Section>
}
