import type { Metadata } from 'next'
import './globals.css'
import { getSiteConfig } from '@/lib/site-config'

export function generateMetadata(): Metadata {
  const c = getSiteConfig()
  const title = `${c.business_name} — ${c.industry} in ${c.city}${c.state ? ', ' + c.state : ''}`
  const description = c.hero_subhead
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
