'use client'

import { useState } from 'react'
import { getApiUrl, getTenantId } from '@/lib/site-config'

export default function ContactForm({ accentColor = '#F97316' }: { accentColor?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const form = e.currentTarget
    const fd = new FormData(form)
    try {
      const res = await fetch(`${getApiUrl()}/api/track/conversion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: getTenantId(),
          conversion_type: 'form_submit',
          name: String(fd.get('name') ?? ''),
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          message: String(fd.get('message') ?? ''),
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => null)
        setError(j?.error ?? `HTTP ${res.status}`)
        setStatus('failed')
        return
      }
      setStatus('sent')
      form.reset()
    } catch (err: any) {
      setError(err?.message ?? 'Network error')
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
        <p className="text-base font-semibold text-emerald-900">Thanks — we&rsquo;ll be in touch shortly.</p>
        <p className="text-sm text-emerald-800 mt-1">Most messages get a response within an hour during business hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" required placeholder="Your name"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input name="email" type="email" required placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1" />
        <input name="phone" type="tel" placeholder="Phone (optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1" />
      </div>
      <textarea name="message" required rows={4} placeholder="What can we help with?"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1" />
      <button type="submit" disabled={status === 'sending'}
        style={{ backgroundColor: accentColor }}
        className="w-full px-6 py-3 rounded-lg font-semibold text-white hover:opacity-90 disabled:opacity-50">
        {status === 'sending' ? 'Sending…' : 'Request a Quote'}
      </button>
      {error && <p className="text-sm text-red-700">✗ {error}</p>}
    </form>
  )
}
