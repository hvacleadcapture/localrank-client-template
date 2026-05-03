import { getApiUrl, getTenantId } from './site-config'

export type LandingPageStatus = 'draft' | 'published' | 'archived'

export interface LandingPageTestimonial {
  name: string
  city?: string
  rating?: 1 | 2 | 3 | 4 | 5
  quote: string
}

export type TrustBadgeId =
  | 'licensed'
  | 'insured'
  | 'bbb_accredited'
  | 'years_in_business'
  | 'satisfaction_guaranteed'
  | 'family_owned'
  | 'same_day_service'
  | 'free_estimates'

export const TRUST_BADGE_LABELS: Record<TrustBadgeId, string> = {
  licensed: 'Licensed',
  insured: 'Insured',
  bbb_accredited: 'BBB Accredited',
  years_in_business: 'Years in Business',
  satisfaction_guaranteed: 'Satisfaction Guaranteed',
  family_owned: 'Family Owned',
  same_day_service: 'Same-Day Service',
  free_estimates: 'Free Estimates',
}

export interface PublicLandingPage {
  id: string
  tenant_id: string
  slug: string
  service: string
  headline: string
  subheadline: string | null
  phone: string
  hero_image: string | null
  testimonials: LandingPageTestimonial[]
  offer_text: string | null
  offer_starts: string | null
  offer_ends: string | null
  trust_badges: TrustBadgeId[]
  service_areas: string[]
  primary_cta_text: string
  form_enabled: boolean
  form_email_field: boolean
  status: LandingPageStatus
  business: {
    name: string
    industry: string | null
    city: string | null
    state: string | null
    address: string | null
    email: string | null
    website_url: string | null
    favicon_url: string | null
    brand_colors: { primary: string; accent: string; secondary?: string }
    why_choose_us: string[]
    hours_of_operation: { weekdays?: string; saturday?: string; sunday?: string; emergency?: string } | null
  }
}

export async function getLandingPage(slug: string, previewToken?: string): Promise<PublicLandingPage | null> {
  const tenant = getTenantId()
  if (!tenant || !slug) return null
  const url = new URL(`${getApiUrl()}/api/landing-pages/${encodeURIComponent(tenant)}/${encodeURIComponent(slug)}`)
  if (previewToken) url.searchParams.set('preview', previewToken)

  try {
    const res = await fetch(url.toString(), {
      // No revalidation for previews; 60s for published.
      next: previewToken ? { revalidate: 0 } : { revalidate: 60 },
    })
    if (!res.ok) return null
    return (await res.json()) as PublicLandingPage
  } catch {
    return null
  }
}

export function isOfferActive(lp: PublicLandingPage, now: Date = new Date()): boolean {
  if (!lp.offer_text) return false
  const t = now.getTime()
  if (lp.offer_starts && t < new Date(lp.offer_starts).getTime()) return false
  if (lp.offer_ends && t > new Date(lp.offer_ends).getTime()) return false
  return true
}
