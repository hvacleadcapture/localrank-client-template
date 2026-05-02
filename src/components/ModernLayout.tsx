import type { SiteConfig } from '@/lib/site-config'
import { CTA_DEFAULT, TRUST_BADGE_LABELS } from '@/lib/site-config'
import ContactForm from './ContactForm'
import PhoneCTA from './PhoneCTA'

export default function ModernLayout({ config }: { config: SiteConfig }) {
  const { primary, accent } = config.brand_colors
  const ctaText = config.primary_cta_text ?? CTA_DEFAULT
  const hasCategories = !!config.service_categories && config.service_categories.length > 0
  const hasTrustBadges = !!config.trust_badges && config.trust_badges.length > 0
  const hasHours = !!config.hours_of_operation
  const hasSocial = !!config.social_links && Object.values(config.social_links).some(Boolean)

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-bold tracking-tight leading-tight">{config.business_name}</p>
            {config.tagline && <p className="text-xs text-gray-500 mt-0.5">{config.tagline}</p>}
          </div>
          {config.phone && <a href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold" style={{ color: primary }}>{config.phone}</a>}
        </div>
      </header>

      <section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>{config.industry} · {config.city}</p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">{config.hero_headline}</h1>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">{config.hero_subhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" style={{ backgroundColor: primary }} className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-white hover:opacity-90">
                {ctaText}
              </a>
              {config.phone && <PhoneCTA phone={config.phone} accentColor={accent} />}
            </div>
            {hasTrustBadges && (
              <div className="mt-8 flex flex-wrap gap-2">
                {config.trust_badges!.map(id => (
                  <span key={id} className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                    {TRUST_BADGE_LABELS[id]}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="aspect-[4/3] rounded-2xl shadow-lg" style={{ backgroundImage: `linear-gradient(135deg, ${primary}, ${accent})` }} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-center mb-3" style={{ color: accent }}>Services</p>
        <h2 className="text-3xl font-bold text-center tracking-tight mb-12">What We Do</h2>
        {hasCategories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.service_categories!.map(c => (
              <div key={c.category} className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg mb-4" style={{ backgroundColor: primary }} />
                <h3 className="font-bold text-lg mb-3">{c.category}</h3>
                <ul className="space-y-1.5">
                  {c.tasks.map(t => (
                    <li key={t} className="text-sm text-gray-600 flex gap-2">
                      <span style={{ color: accent }}>→</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {config.services.map(s => (
              <div key={s.name} className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-md transition">
                <div className="w-10 h-10 rounded-lg mb-4" style={{ backgroundColor: primary }} />
                <h3 className="font-bold text-lg">{s.name}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">About {config.business_name}</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">{config.about}</p>
            {config.origin_story && (
              <p className="mt-4 text-gray-600 leading-relaxed italic">{config.origin_story}</p>
            )}
            {config.credentials && config.credentials.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {config.credentials.map(c => (
                  <span key={c} className="px-3 py-1 text-sm rounded-full bg-white border border-gray-200 text-gray-700">{c}</span>
                ))}
              </div>
            )}
          </div>
          <ul className="space-y-4">
            {config.why_choose_us.map(w => (
              <li key={w} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: accent }}>✓</span>
                <span className="text-gray-800 font-medium">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: accent }}>Service Area</p>
        <h2 className="text-3xl font-bold tracking-tight">Proudly Serving {config.city}{config.state ? `, ${config.state}` : ''}</h2>
        {config.service_areas.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {config.service_areas.map(a => (
              <span key={a} className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">{a}</span>
            ))}
          </div>
        )}
      </section>

      {config.testimonials.length > 0 && (
        <section className="bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center tracking-tight mb-12">From Our Customers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {config.testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  {t.rating && (
                    <div className="text-sm mb-2" style={{ color: accent }}>
                      {'★'.repeat(t.rating)}<span className="text-gray-300">{'★'.repeat(5 - t.rating)}</span>
                    </div>
                  )}
                  <p className="text-gray-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm text-gray-500">{t.author}{t.location ? ` · ${t.location}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasHours && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-center mb-3" style={{ color: accent }}>Availability</p>
          <h2 className="text-3xl font-bold text-center tracking-tight mb-12">Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-gray-100 p-5 text-center">
              <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">Mon–Fri</p>
              <p className="mt-2 font-medium">{config.hours_of_operation!.weekdays}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-5 text-center">
              <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">Saturday</p>
              <p className="mt-2 font-medium">{config.hours_of_operation!.saturday}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-5 text-center">
              <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">Sunday</p>
              <p className="mt-2 font-medium">{config.hours_of_operation!.sunday}</p>
            </div>
            <div className="rounded-2xl p-5 text-center text-white" style={{ backgroundColor: accent }}>
              <p className="text-xs uppercase tracking-widest font-semibold opacity-90">Emergency</p>
              <p className="mt-2 font-medium">{config.hours_of_operation!.emergency}</p>
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center tracking-tight mb-2">{ctaText}</h2>
        <p className="text-center text-gray-600 mb-8">Tell us what you need. We&rsquo;ll respond fast.</p>
        <ContactForm accentColor={accent} />
      </section>

      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500 text-center space-y-1">
          <p className="font-semibold text-gray-700">{config.business_name}</p>
          {config.phone && <p>{config.phone}</p>}
          <p>{config.city}{config.state ? `, ${config.state}` : ''} · Licensed & Insured</p>
          {config.license_numbers && <p className="text-xs text-gray-400">License: {config.license_numbers}</p>}
          {hasSocial && (
            <div className="flex gap-4 justify-center pt-3">
              {Object.entries(config.social_links!).map(([k, v]) => v && (
                <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="capitalize text-gray-500 hover:text-gray-900 text-xs">{k}</a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </main>
  )
}
