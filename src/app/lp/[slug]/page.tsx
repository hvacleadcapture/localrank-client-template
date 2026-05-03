import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLandingPage, isOfferActive, TRUST_BADGE_LABELS, type PublicLandingPage } from '@/lib/landing-page'
import { CountdownBanner, LeadForm, PhoneLink, StickyCallBar } from '@/components/LandingPageClient'

interface Props {
  params: { slug: string }
  searchParams: { preview?: string }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const lp = await getLandingPage(params.slug, searchParams.preview)
  if (!lp) return { title: 'Landing page not found', robots: { index: false, follow: false } }
  const desc = (lp.subheadline ?? `${lp.service} in ${lp.business.city ?? ''}.`).slice(0, 155)
  return {
    title: `${lp.headline} | ${lp.business.name}`,
    description: desc,
    // Landing pages are paid-traffic only — never index, prevent canonical conflicts with main site.
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    icons: lp.business.favicon_url ? { icon: lp.business.favicon_url } : undefined,
    openGraph: { title: lp.headline, description: desc, type: 'website' },
  }
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div className="flex gap-0.5 text-amber-500" aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill={i < filled ? 'currentColor' : '#E5E7EB'} aria-hidden>
          <path d="M10 1.5l2.6 5.4 5.9.9-4.3 4.2 1 5.9L10 15.1 4.8 17.9l1-5.9L1.5 7.8l5.9-.9z"/>
        </svg>
      ))}
    </div>
  )
}

function offerSchemaJsonLd(lp: PublicLandingPage): string | null {
  if (!lp.offer_text) return null
  const offer: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: lp.offer_text,
    category: lp.service,
    seller: { '@type': 'LocalBusiness', name: lp.business.name, telephone: lp.phone },
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
  }
  if (lp.offer_starts) offer.validFrom = lp.offer_starts
  if (lp.offer_ends) offer.validThrough = lp.offer_ends
  if (lp.service_areas.length > 0) offer.areaServed = lp.service_areas.map(name => ({ '@type': 'City', name }))
  return JSON.stringify(offer)
}

export default async function LandingPage({ params, searchParams }: Props) {
  const lp = await getLandingPage(params.slug, searchParams.preview)
  if (!lp) notFound()

  const primary = lp.business.brand_colors.primary
  const accent = lp.business.brand_colors.accent
  const offerActive = isOfferActive(lp)
  const offerSchema = offerSchemaJsonLd(lp)
  const isPreview = !!searchParams.preview && lp.status !== 'published'

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-24 md:pb-0">
      {offerSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: offerSchema }} />
      )}

      {isPreview && (
        <div className="bg-amber-400 text-amber-950 text-center py-1.5 text-xs font-semibold">
          PREVIEW — this draft is not visible to the public.
        </div>
      )}

      {offerActive && lp.offer_text && lp.offer_ends && (
        <CountdownBanner endsAt={lp.offer_ends} offerText={lp.offer_text} color={accent} />
      )}
      {offerActive && lp.offer_text && !lp.offer_ends && (
        <div style={{ backgroundColor: accent }} className="text-white text-center py-2.5 px-4 text-sm font-semibold">
          🔥 {lp.offer_text}
        </div>
      )}

      <header className="border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-3">
          <div className="font-bold text-base sm:text-lg truncate" style={{ color: primary }}>
            {lp.business.name}
          </div>
          <PhoneLink
            lp={lp}
            source="header"
            className="text-sm sm:text-base font-bold tabular-nums"
            style={{ color: primary }}
          >
            {lp.phone}
          </PhoneLink>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 pt-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {lp.headline}
            </h1>
            {lp.subheadline && (
              <p className="mt-4 text-base sm:text-lg text-slate-700">{lp.subheadline}</p>
            )}

            <div className="mt-6 space-y-3">
              <PhoneLink
                lp={lp}
                source="hero_phone"
                className="block text-3xl sm:text-4xl font-extrabold tabular-nums"
                style={{ color: primary }}
              >
                {lp.phone}
              </PhoneLink>
              <PhoneLink
                lp={lp}
                source="hero_cta"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-base font-bold text-white shadow-md hover:opacity-95 transition"
                style={{ backgroundColor: primary }}
              >
                {lp.primary_cta_text}
              </PhoneLink>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {lp.testimonials.length > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <StarRow rating={5} />
                  <span className="font-semibold">{lp.testimonials.length}+ reviews</span>
                </span>
              )}
              {lp.trust_badges.slice(0, 4).map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 text-slate-700">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ color: primary }} aria-hidden>
                    <path d="M10 0l3 6 6 .9-4.5 4.4 1 6.7L10 15l-5.5 3 1-6.7L1 6.9 7 6z"/>
                  </svg>
                  <span className="font-medium">{TRUST_BADGE_LABELS[b]}</span>
                </span>
              ))}
            </div>

            {lp.form_enabled && (
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-sm font-semibold text-slate-900 mb-3">Or request a callback:</p>
                <LeadForm lp={lp} />
              </div>
            )}
          </div>

          <div className="order-first lg:order-last">
            {lp.hero_image ? (
              <img
                src={lp.hero_image}
                alt={`${lp.service} — ${lp.business.name}`}
                className="w-full h-56 sm:h-80 lg:h-[420px] object-cover rounded-2xl shadow-md"
              />
            ) : (
              <div
                className="w-full h-56 sm:h-80 lg:h-[420px] rounded-2xl shadow-md flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}
              >
                {lp.business.name}
              </div>
            )}
          </div>
        </div>
      </section>

      {lp.testimonials.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200 py-10">
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lp.testimonials.slice(0, 3).map((t, i) => (
                <div key={i} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
                  <StarRow rating={t.rating ?? 5} />
                  <p className="mt-3 text-sm text-slate-800">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-3 text-xs font-semibold text-slate-900">
                    {t.name}{t.city ? <span className="text-slate-500 font-normal"> — {t.city}</span> : null}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-5 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Why Choose {lp.business.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lp.business.why_choose_us.slice(0, 4).map((reason, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-4">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold mb-3"
                style={{ backgroundColor: primary }}
                aria-hidden
              >
                {i + 1}
              </div>
              <p className="text-sm font-medium text-slate-900">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      {lp.service_areas.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200 py-8">
          <div className="max-w-6xl mx-auto px-5 text-center">
            <h2 className="text-lg font-bold mb-3">Proudly serving</h2>
            <p className="text-sm text-slate-700">{lp.service_areas.join(' · ')}</p>
          </div>
        </section>
      )}

      <section className="py-12" style={{ backgroundColor: primary }}>
        <div className="max-w-3xl mx-auto px-5 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to get started?</h2>
          <p className="text-base sm:text-lg opacity-95 mb-6">
            Call now for fast {lp.service.toLowerCase()} service{lp.business.city ? ` in ${lp.business.city}` : ''}.
          </p>
          <PhoneLink
            lp={lp}
            source="footer_cta"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-lg text-lg font-bold shadow-md hover:opacity-95"
            style={{ backgroundColor: 'white', color: primary }}
          >
            {lp.primary_cta_text}: {lp.phone}
          </PhoneLink>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-6">
        <div className="max-w-6xl mx-auto px-5 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">{lp.business.name}</p>
          {lp.business.address && <p>{lp.business.address}</p>}
          <p>
            <PhoneLink lp={lp} source="footer_phone" className="font-medium" style={{ color: primary }}>
              {lp.phone}
            </PhoneLink>
          </p>
          {lp.business.hours_of_operation?.weekdays && (
            <p>Mon–Fri {lp.business.hours_of_operation.weekdays}</p>
          )}
        </div>
      </footer>

      <StickyCallBar lp={lp} />
    </main>
  )
}
