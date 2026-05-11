import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { getSiteConfig, getGoogleAdsConvId } from '@/lib/site-config'

export function generateMetadata(): Metadata {
  const c = getSiteConfig()
  const title = `${c.business_name} — ${c.industry} in ${c.city}${c.state ? ', ' + c.state : ''}`
  const description = c.hero_subhead
  const meta: Metadata = {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
  if (c.favicon_url) {
    meta.icons = { icon: c.favicon_url }
  }
  return meta
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteConfig()
  const googleAdsConvId = getGoogleAdsConvId()

  return (
    <html lang="en">
      <head>
        {config.schema_jsonld && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: config.schema_jsonld }}
          />
        )}
      </head>
      <body>
        {googleAdsConvId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsConvId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${googleAdsConvId}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  )
}
