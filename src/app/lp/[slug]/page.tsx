import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLandingPage } from '@/lib/landing-page'
import { LandingPageView } from '@/components/LandingPageView'

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

export default async function LandingPage({ params, searchParams }: Props) {
  const view = await LandingPageView({ slug: params.slug, previewToken: searchParams.preview })
  if (!view) notFound()
  return view
}
