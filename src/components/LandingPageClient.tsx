'use client'

import { useEffect, useState } from 'react'
import type { PublicLandingPage } from '@/lib/landing-page'
import { getApiUrl } from '@/lib/site-config'

interface Props {
  lp: PublicLandingPage
}

function trackPhoneClick(lp: PublicLandingPage, source: string): void {
  // Fire-and-forget; don't block the tel: navigation.
  try {
    fetch(`${getApiUrl()}/api/track/conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant_id: lp.tenant_id,
        conversion_type: 'phone_click',
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        landing_page: `/lp/${lp.slug}`,
        metadata: { lp_id: lp.id, lp_slug: lp.slug, source_button: source, service: lp.service },
      }),
      keepalive: true,
    }).catch(() => { /* swallow */ })
  } catch { /* swallow */ }
}

export function PhoneLink({
  lp,
  source,
  className,
  style,
  children,
}: {
  lp: PublicLandingPage
  source: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const tel = lp.phone.replace(/[^\d+]/g, '')
  return (
    <a
      href={`tel:${tel}`}
      className={className}
      style={style}
      onClick={() => trackPhoneClick(lp, source)}
    >
      {children}
    </a>
  )
}

export function LeadForm({ lp }: { lp: PublicLandingPage }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [error, setError] = useState<string | null>(null)
  const accent = lp.business.brand_colors.accent

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload: Record<string, unknown> = {
      tenant_id: lp.tenant_id,
      conversion_type: 'form_submit',
      name: String(fd.get('name') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message: String(fd.get('issue') ?? ''),
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      landing_page: `/lp/${lp.slug}`,
      metadata: { lp_id: lp.id, lp_slug: lp.slug, source: 'landing_page', service: lp.service },
    }
    if (lp.form_email_field) {
      payload.email = String(fd.get('email') ?? '')
    }
    try {
      const res = await fetch(`${getApiUrl()}/api/track/conversion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        setError(j?.error ?? `HTTP ${res.status}`)
        setStatus('failed')
        return
      }
      setStatus('sent')
      e.currentTarget.reset()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Network error')
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
        <p className="text-base font-semibold text-emerald-900">Got it — we&rsquo;ll call you right back.</p>
        <p className="text-sm text-emerald-800 mt-1">For fastest service, call us directly: {lp.phone}.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <input
        name="name" required placeholder="Your name"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-offset-1"
      />
      <input
        name="phone" type="tel" required placeholder="Phone number"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-offset-1"
      />
      {lp.form_email_field && (
        <input
          name="email" type="email" placeholder="Email (optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-offset-1"
        />
      )}
      <textarea
        name="issue" required rows={3} placeholder="What do you need help with?"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-offset-1"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ backgroundColor: accent }}
        className="w-full px-6 py-3.5 rounded-lg text-base font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Request a Callback'}
      </button>
      {error && <p className="text-sm text-red-700">✗ {error}</p>}
    </form>
  )
}

export function CountdownBanner({ endsAt, offerText, color }: { endsAt: string; offerText: string; color: string }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, new Date(endsAt).getTime() - Date.now()))

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining(Math.max(0, new Date(endsAt).getTime() - Date.now()))
    }, 1000)
    return () => clearInterval(t)
  }, [endsAt])

  if (remaining === 0) return null

  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)
  const mins = Math.floor((remaining % 3600000) / 60000)
  const secs = Math.floor((remaining % 60000) / 1000)
  const parts = days > 0
    ? `${days}d ${hours}h ${mins}m`
    : `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <div style={{ backgroundColor: color }} className="text-white text-center py-2.5 px-4 text-sm font-semibold">
      <span className="mr-2">🔥 {offerText}</span>
      <span className="opacity-90">— ends in {parts}</span>
    </div>
  )
}

export function StickyCallBar({ lp }: { lp: PublicLandingPage }) {
  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 shadow-lg"
      style={{ backgroundColor: lp.business.brand_colors.primary }}
    >
      <PhoneLink
        lp={lp}
        source="sticky_bottom_bar"
        className="flex items-center justify-center gap-2 py-3.5 text-white font-bold text-base"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1A17 17 0 013 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        {lp.primary_cta_text}: {lp.phone}
      </PhoneLink>
    </div>
  )
}
