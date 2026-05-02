'use client'

import { getApiUrl, getTenantId } from '@/lib/site-config'

export default function PhoneCTA({
  phone, accentColor = '#F97316', label,
}: { phone: string; accentColor?: string; label?: string }) {
  if (!phone) return null
  const onClick = () => {
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
  }
  return (
    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} onClick={onClick}
      style={{ backgroundColor: accentColor }}
      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90">
      {label ?? `Call ${phone}`}
    </a>
  )
}
