import type { SiteConfig } from '@/lib/site-config'
import ContactForm from './ContactForm'
import PhoneCTA from './PhoneCTA'

export default function ModernLayout({ config }: { config: SiteConfig }) {
  const { primary, accent } = config.brand_colors

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <p className="font-bold tracking-tight">{config.business_name}</p>
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
                Get a Free Estimate
              </a>
              {config.phone && <PhoneCTA phone={config.phone} accentColor={accent} />}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl shadow-lg" style={{ backgroundImage: `linear-gradient(135deg, ${primary}, ${accent})` }} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-center mb-3" style={{ color: accent }}>Services</p>
        <h2 className="text-3xl font-bold text-center tracking-tight mb-12">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {config.services.map(s => (
            <div key={s.name} className="rounded-2xl bg-white border border-gray-100 p-6 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-lg mb-4" style={{ backgroundColor: primary }} />
              <h3 className="font-bold text-lg">{s.name}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">About {config.business_name}</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">{config.about}</p>
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
                  <p className="text-gray-700">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm text-gray-500">{t.author}{t.location ? ` · ${t.location}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center tracking-tight mb-2">Get in Touch</h2>
        <p className="text-center text-gray-600 mb-8">Tell us what you need. We&rsquo;ll respond fast.</p>
        <ContactForm accentColor={accent} />
      </section>

      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500 text-center">
          <p className="font-semibold text-gray-700">{config.business_name}</p>
          {config.phone && <p className="mt-1">{config.phone}</p>}
          <p className="mt-1">{config.city}{config.state ? `, ${config.state}` : ''} · Licensed & Insured</p>
        </div>
      </footer>
    </main>
  )
}
