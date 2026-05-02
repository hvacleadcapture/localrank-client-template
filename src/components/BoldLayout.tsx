import type { SiteConfig } from '@/lib/site-config'
import { CTA_DEFAULT, TRUST_BADGE_LABELS } from '@/lib/site-config'
import ContactForm from './ContactForm'
import PhoneCTA from './PhoneCTA'
import ServicesEmptyState from './ServicesEmptyState'

export default function BoldLayout({ config }: { config: SiteConfig }) {
  const { primary, accent } = config.brand_colors
  const ctaText = config.primary_cta_text ?? CTA_DEFAULT
  const hasCategories = !!config.service_categories && config.service_categories.length > 0
  const hasTrustBadges = !!config.trust_badges && config.trust_badges.length > 0
  const hasHours = !!config.hours_of_operation
  const hasSocial = !!config.social_links && Object.values(config.social_links).some(Boolean)
  const emergency = config.hours_of_operation?.emergency

  return (
    <main className="min-h-screen bg-gray-950 text-white antialiased">
      {emergency && (
        <div style={{ backgroundColor: accent, color: '#000' }} className="text-center text-xs sm:text-sm font-black uppercase tracking-widest py-2 px-4">
          ⚡ Emergency Service · {emergency}
          {config.phone && <span className="ml-2 underline">Call {config.phone}</span>}
        </div>
      )}
      <header style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="border-b border-white/10 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-black tracking-tight uppercase leading-none">{config.business_name}</p>
            {config.tagline && <p className="text-[10px] uppercase tracking-widest text-white/60 mt-1">{config.tagline}</p>}
          </div>
          <div className="flex items-center gap-5">
            <a href="/blog" className="text-xs font-black uppercase tracking-widest text-white/80 hover:text-white">Tips & Guides</a>
            {config.phone && (
              <a href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`} style={{ backgroundColor: accent }} className="text-sm font-bold px-4 py-2 rounded text-black">
                {config.phone}
              </a>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden" style={{ backgroundImage: `linear-gradient(135deg, ${primary} 0%, #000 100%)` }}>
        <div className="max-w-5xl mx-auto px-6 py-28 text-center">
          <p className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-6" style={{ backgroundColor: accent, color: '#000' }}>
            {config.industry} · {config.city}{config.state ? `, ${config.state}` : ''}
          </p>
          <h1 className="text-5xl sm:text-6xl font-black leading-[1.05] uppercase tracking-tight">{config.hero_headline}</h1>
          <p className="mt-6 text-xl text-white/85 max-w-2xl mx-auto">{config.hero_subhead}</p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {config.phone && <PhoneCTA phone={config.phone} accentColor={accent} label={`Call Now · ${config.phone}`} />}
            <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-lg font-bold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition uppercase">
              {ctaText}
            </a>
          </div>
          {hasTrustBadges && (
            <div className="mt-10 flex flex-wrap gap-2 justify-center">
              {config.trust_badges!.map(id => (
                <span key={id} className="px-3 py-1 text-xs font-black uppercase tracking-widest rounded bg-white/10 border border-white/30">
                  {TRUST_BADGE_LABELS[id]}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black uppercase mb-10 text-center">Services</h2>
        {hasCategories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.service_categories!.map(c => (
              <div key={c.category} className="rounded-xl border-2 border-white/10 bg-white/5 p-6 hover:border-white/30 transition">
                <h3 className="font-black text-xl uppercase tracking-tight mb-3" style={{ color: accent }}>{c.category}</h3>
                <ul className="space-y-1.5">
                  {c.tasks.map(t => (
                    <li key={t} className="text-white/80 flex gap-2">
                      <span style={{ color: accent }}>▸</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : config.services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.services.map(s => (
              <div key={s.name} className="rounded-xl border-2 border-white/10 bg-white/5 p-6 hover:border-white/30 transition">
                <h3 className="font-bold text-xl uppercase tracking-tight" style={{ color: accent }}>{s.name}</h3>
                <p className="mt-2 text-white/80">{s.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <ServicesEmptyState businessName={config.business_name} phone={config.phone} primary={config.brand_colors.primary} />
        )}
      </section>

      <section style={{ backgroundColor: accent, color: '#000' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">Why {config.business_name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {config.why_choose_us.map(w => (
              <div key={w} className="px-4">
                <p className="text-xl font-bold">{w}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-black uppercase mb-6 text-center">About</h2>
        <p className="text-lg text-white/85 leading-relaxed text-center max-w-2xl mx-auto">{config.about}</p>
        {config.origin_story && (
          <div className="mt-8 max-w-2xl mx-auto rounded-xl border-2 border-white/10 bg-white/5 p-6">
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Our Story</p>
            <p className="text-white/85 leading-relaxed">{config.origin_story}</p>
          </div>
        )}
        {config.credentials && config.credentials.length > 0 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-xs font-black uppercase tracking-widest mb-3 text-center" style={{ color: accent }}>Credentials</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {config.credentials.map(c => (
                <span key={c} className="px-3 py-1 text-sm font-bold uppercase tracking-wider rounded bg-white/10 border border-white/20">{c}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Service Area</h2>
          <p className="text-2xl">{config.city}{config.state ? `, ${config.state}` : ''}</p>
          {config.service_areas.length > 0 && (
            <p className="mt-3 text-white/70">{config.service_areas.join(' · ')}</p>
          )}
        </div>
      </section>

      {config.testimonials.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-black uppercase mb-10 text-center">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.testimonials.map((t, i) => (
              <blockquote key={i} className="rounded-xl border-2 border-white/10 p-6">
                {t.rating && (
                  <div className="text-sm mb-2" style={{ color: accent }}>
                    {'★'.repeat(t.rating)}<span className="text-white/20">{'★'.repeat(5 - t.rating)}</span>
                  </div>
                )}
                <p className="text-white/90 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>{t.author}{t.location ? ` · ${t.location}` : ''}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {hasHours && (
        <section className="border-y border-white/10">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-black uppercase mb-10 text-center">Hours</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border-2 border-white/10 p-5 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-white/60">Mon–Fri</p>
                <p className="mt-2 font-bold">{config.hours_of_operation!.weekdays}</p>
              </div>
              <div className="rounded-xl border-2 border-white/10 p-5 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-white/60">Saturday</p>
                <p className="mt-2 font-bold">{config.hours_of_operation!.saturday}</p>
              </div>
              <div className="rounded-xl border-2 border-white/10 p-5 text-center">
                <p className="text-xs font-black uppercase tracking-widest text-white/60">Sunday</p>
                <p className="mt-2 font-bold">{config.hours_of_operation!.sunday}</p>
              </div>
              <div className="rounded-xl p-5 text-center text-black" style={{ backgroundColor: accent }}>
                <p className="text-xs font-black uppercase tracking-widest">⚡ Emergency</p>
                <p className="mt-2 font-black">{config.hours_of_operation!.emergency}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="contact" style={{ backgroundColor: accent, color: '#000' }}>
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-black uppercase mb-2 text-center">{ctaText}</h2>
          <p className="text-center mb-8 font-semibold">We respond fast. Most quotes within the hour.</p>
          <div className="bg-white rounded-xl p-6 sm:p-8">
            <ContactForm accentColor={primary} />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-center space-y-2 text-white/70">
          <p className="font-bold text-white uppercase">{config.business_name}</p>
          {config.phone && <p>{config.phone}</p>}
          <p>{config.city}{config.state ? `, ${config.state}` : ''} · Licensed & Insured</p>
          {config.license_numbers && <p className="text-xs text-white/50 uppercase tracking-wider">License: {config.license_numbers}</p>}
          <p className="pt-2"><a href="/blog" className="text-xs font-black uppercase tracking-widest text-white/70 hover:text-white">Tips & Guides</a></p>
          {hasSocial && (
            <div className="flex gap-4 justify-center pt-3">
              {Object.entries(config.social_links!).map(([k, v]) => v && (
                <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="capitalize text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest">{k}</a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </main>
  )
}
