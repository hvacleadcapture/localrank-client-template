import type { SiteConfig } from '@/lib/site-config'
import ContactForm from './ContactForm'
import PhoneCTA from './PhoneCTA'

export default function ClassicLayout({ config }: { config: SiteConfig }) {
  const { primary, accent } = config.brand_colors

  return (
    <main className="min-h-screen bg-white text-gray-900 antialiased">
      <header style={{ backgroundColor: primary }} className="text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="font-bold text-lg">{config.business_name}</p>
          {config.phone && <a href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold hover:underline">{config.phone}</a>}
        </div>
      </header>

      <section style={{ backgroundColor: primary }} className="text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">{config.hero_headline}</h1>
          <p className="mt-4 text-lg sm:text-xl opacity-90">{config.hero_subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {config.phone && <PhoneCTA phone={config.phone} accentColor={accent} />}
            <a href="#contact" style={{ borderColor: 'white' }} className="inline-flex items-center px-6 py-3 rounded-lg font-semibold border-2 text-white hover:bg-white hover:text-gray-900 transition">
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.services.map(s => (
            <div key={s.name} className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg" style={{ color: primary }}>{s.name}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
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
                <p className="text-gray-700 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-2 text-sm text-gray-500">— {t.author}{t.location ? `, ${t.location}` : ''}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section id="contact" style={{ backgroundColor: primary }} className="text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">Get a Free Quote</h2>
          <p className="text-center mb-8 opacity-90">We&rsquo;ll get back to you within an hour during business hours.</p>
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-gray-900">
            <ContactForm accentColor={accent} />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-center space-y-1">
          <p className="font-semibold text-white">{config.business_name}</p>
          {config.phone && <p>{config.phone}</p>}
          {config.address && <p>{config.address}</p>}
          <p className="text-gray-500">{config.city}{config.state ? `, ${config.state}` : ''} · Licensed & Insured</p>
        </div>
      </footer>
    </main>
  )
}
