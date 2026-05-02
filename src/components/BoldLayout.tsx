import type { SiteConfig } from '@/lib/site-config'
import ContactForm from './ContactForm'
import PhoneCTA from './PhoneCTA'

export default function BoldLayout({ config }: { config: SiteConfig }) {
  const { primary, accent } = config.brand_colors

  return (
    <main className="min-h-screen bg-gray-950 text-white antialiased">
      <header style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} className="border-b border-white/10 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="font-black tracking-tight uppercase">{config.business_name}</p>
          {config.phone && (
            <a href={`tel:${config.phone.replace(/[^0-9+]/g, '')}`} style={{ backgroundColor: accent }} className="text-sm font-bold px-4 py-2 rounded">
              {config.phone}
            </a>
          )}
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
            <a href="#contact" className="inline-flex items-center px-6 py-3 rounded-lg font-bold border-2 border-white text-white hover:bg-white hover:text-gray-900 transition">
              Get Help Fast
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black uppercase mb-10 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.services.map(s => (
            <div key={s.name} className="rounded-xl border-2 border-white/10 bg-white/5 p-6 hover:border-white/30 transition">
              <h3 className="font-bold text-xl uppercase tracking-tight" style={{ color: accent }}>{s.name}</h3>
              <p className="mt-2 text-white/80">{s.description}</p>
            </div>
          ))}
        </div>
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
                <p className="text-white/90 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-bold uppercase tracking-wider" style={{ color: accent }}>{t.author}{t.location ? ` · ${t.location}` : ''}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      <section id="contact" style={{ backgroundColor: accent, color: '#000' }}>
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-black uppercase mb-2 text-center">Get a Quote</h2>
          <p className="text-center mb-8 font-semibold">We respond fast. Most quotes within the hour.</p>
          <div className="bg-white rounded-xl p-6 sm:p-8">
            <ContactForm accentColor={primary} />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-center space-y-1 text-white/70">
          <p className="font-bold text-white uppercase">{config.business_name}</p>
          {config.phone && <p>{config.phone}</p>}
          <p>{config.city}{config.state ? `, ${config.state}` : ''} · Licensed & Insured</p>
        </div>
      </footer>
    </main>
  )
}
