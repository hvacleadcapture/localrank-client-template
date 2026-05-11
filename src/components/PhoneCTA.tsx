'use client'

import {
  getApiUrl,
  getTenantId,
  getGoogleAdsConvId,
  getGoogleAdsPhoneLabel,
} from '@/lib/site-config'

export default function PhoneCTA({
  phone, accentColor = '#F97316', label,
}: { phone: string; accentColor?: string; label?: string }) {
  if (!phone) return null
  const onClick = () => {
    // Internal LRP analytics — fire and forget. Errors are swallowed so they
    // never block the tel: navigation.
    fetch(`${getApiUrl()}/api/track/conversion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenant_id: getTenantId(),
        conversion_type: 'phone_click',
        phone,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
      }),
      keepalive: true,
    }).catch(() => undefined)

    // Google Ads conversion — only fires when both env vars are set. Skipped
    // entirely otherwise (no gtag script in the page either, see layout.tsx).
    // Wrapped so a missing/blocked gtag never blocks the tel: nav above.
    const convId = getGoogleAdsConvId()
    const phoneLabel = getGoogleAdsPhoneLabel()
    if (convId && phoneLabel) {
      try {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
        if (typeof gtag === 'function') {
          gtag('event', 'conversion', { send_to: `${convId}/${phoneLabel}` })
        }
      } catch { /* swallow — phone call must still proceed */ }
    }
  }
  return (
    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} onClick={onClick}
      style={{ backgroundColor: accentColor }}
      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90">
      {label ?? `Call ${phone}`}
    </a>
  )
}
