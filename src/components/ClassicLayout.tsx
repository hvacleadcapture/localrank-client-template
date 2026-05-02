import type { SiteConfig } from '@/lib/site-config'
import { CTA_DEFAULT, TRUST_BADGE_LABELS } from '@/lib/site-config'
import ContactForm from './ContactForm'
import PhoneCTA from './PhoneCTA'
import ServicesEmptyState from './ServicesEmptyState'

export default function ClassicLayout({ config }: { config: SiteConfig }) {
  const { primary, accent } = config.brand_colors
  const ctaText = config.primary_cta_text ?? CTA_DEFAULT
  const hasCategories = !!config.service_categories && config.service_categories.length > 0
  const hasTrustBadges = !!config.trust_badges && config.trust_badges.length > 0
  const hasHours = !!config.hours_of_operation
  const hasSocial = !!config.social_links && Object.values(config.social_links).some(Boolean)

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <header style={{ backgroundColor: primary }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-lg leading-tight">{config.business_name}</p>
            {config.tagline && <p className="text-xs opacity-80 mt-0.5">{config.tagline}</p>}
          </div>
          <div className="flex items-center gap-5">
            <a href="/blog" className="text-sm font-semibold text-white/90 hover:text-white">Tips & Guides</a>
            {config.phone && <a href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold hover:underline">{config.phone}</a>}
          </div>
        </div>
      </header>

      <section style={{ backgroundColor: primary }} className="text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{config.hero_headline}</h1>
          <p className="mt-4 text-lg sm:text-xl opacity-90">{config.hero_subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {config.phone && <PhoneCTA phone={config.phone} accentColor={accent} />}
            <a href="#contact" style={{ borderColor: 'white' }} className="inline-flex items-center px-6 py-3 rounded-lg font-semibold border-2 text-white hover:bg-white hover:text-gray-900 transition">
              {ctaText}
            </a>
          </div>
          {hasTrustBadges && (
            <div className="mt-10 flex flex-wrap gap-2 justify-center">
              {config.trust_badges!.map(id => (
                <span key={id} className="px-3 py-1 text-xs font-semibold rounded-full bg-white/15 border border-white/30">
                  {TRUST_BADGE_LABELS[id]}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Our Services</h2>
        {hasCategories ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.service_categories!.map(c => (
              <div key={c.category} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3" style={{ color: primary }}>{c.category}</h3>
                <ul className="space-y-1.5">
                  {c.tasks.map(t => (
                    <li key={t} className="text-sm text-gray-700 flex gap-2">
                      <span style={{ color: accent }}>•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : config.services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.services.map(s => (
              <div key={s.name} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-lg" style={{ color: primary }}>{s.name}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <ServicesEmptyState businessName={config.business_name} phone={config.phone} primary={config.brand_colors.primary} />
        )}
      </section>

      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Serving {config.city}{config.state ? `, ${config.state}` : ''} and Surrounding Areas</h2>
          {config.service_areas.length > 0 && (
            <p className="mt-4 text-gray-700">{config.service_areas.join(' · ')}</p>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">About {config.business_name}</h2>
        <p className="text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">{config.about}</p>
        {config.origin_story && (
          <div className="mt-8 max-w-2xl mx-auto border-l-4 pl-5 py-2" style={{ borderColor: accent }}>
            <p className="text-sm uppercase tracking-wider font-semibold mb-2" style={{ color: primary }}>Our Story</p>
            <p className="text-gray-700 leading-relaxed">{config.origin_story}</p>
          </div>
        )}
        {config.credentials && config.credentials.length > 0 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-wider font-semibold mb-3 text-center" style={{ color: primary }}>Credentials</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {config.credentials.map(c => (
                <span key={c} className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 border border-gray-200">{c}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.why_choose_us.map(w => (
              <div key={w} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <p className="font-semibold" style={{ color: primary }}>{w}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {config.testimonials.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.testimonials.map((t, i) => (
              <blockquote key={i} className="border-l-4 pl-4" style={{ borderColor: accent }}>
                {t.rating && (
                  <div className="text-sm mb-1" style={{ color: accent }}>
                    {'★'.repeat(t.rating)}<span className="text-gray-300">{'★'.repeat(5 - t.rating)}</span>
                  </div>
                )}
                <p className="text-gray-700 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-2 text-sm text-gray-500">— {t.author}{t.location ? `, ${t.location}` : ''}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {hasHours && (
        <section className="bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Hours of Operation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex justify-between">
                <span className="font-semibold text-gray-800">Mon–Fri</span>
                <span className="text-gray-600">{config.hours_of_operation!.weekdays}</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex justify-between">
                <span className="font-semibold text-gray-800">Saturday</span>
                <span className="text-gray-600">{config.hours_of_operation!.saturday}</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex justify-between">
                <span className="font-semibold text-gray-800">Sunday</span>
                <span className="text-gray-600">{config.hours_of_operation!.sunday}</span>
              </div>
              <div className="rounded-xl p-5 flex justify-between text-white" style={{ backgroundColor: accent }}>
                <span className="font-semibold">Emergency</span>
                <span>{config.hours_of_operation!.emergency}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="contact" style={{ backgroundColor: primary }} className="text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">{ctaText}</h2>
          <p className="text-center mb-8 opacity-90">We&rsquo;ll get back to you within an hour during business hours.</p>
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-900">
            <ContactForm accentColor={accent} />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-center space-y-2">
          <p className="font-semibold text-white">{config.business_name}</p>
          {config.phone && <p>{config.phone}</p>}
          {config.address && <p>{config.address}</p>}
          <p className="text-gray-500">{config.city}{config.state ? `, ${config.state}` : ''} · Licensed & Insured</p>
          {config.license_numbers && <p className="text-gray-500 text-xs">License: {config.license_numbers}</p>}
          <p className="pt-2"><a href="/blog" className="text-gray-400 hover:text-white text-xs font-semibold">Tips & Guides</a></p>
          {hasSocial && (
            <div className="flex gap-4 justify-center pt-3">
              {Object.entries(config.social_links!).map(([k, v]) => v && (
                <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="capitalize text-gray-400 hover:text-white text-xs">{k}</a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </main>
  )
}
