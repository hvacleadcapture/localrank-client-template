export type BrandVibe = 'luxury' | 'blue_collar' | 'family' | 'corporate' | 'modern'
export type TrustBadgeId = 'google_reviews' | 'yelp' | 'bbb' | 'home_advisor' | 'angi'

export interface SiteService { name: string; description: string }

export interface SiteServiceCategory {
  category: string
  tasks: string[]
}

export interface SiteTestimonial {
  quote: string
  author: string
  location?: string
  rating?: 1 | 2 | 3 | 4 | 5
}

export interface HoursOfOperation {
  weekdays: string
  saturday: string
  sunday: string
  emergency: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  nextdoor?: string
  twitter?: string
  tiktok?: string
  youtube?: string
}

export interface BrandColors {
  primary: string
  accent: string
  secondary?: string
}

export interface SiteConfig {
  business_name: string
  industry: string
  city: string
  state: string
  phone: string | null
  email: string | null
  address: string | null
  website_url: string | null
  hero_headline: string
  hero_subhead: string
  about: string
  services: SiteService[]
  service_areas: string[]
  why_choose_us: string[]
  testimonials: SiteTestimonial[]
  brand_colors: BrandColors
  tagline?: string
  primary_cta_text?: string
  brand_vibe?: BrandVibe
  imagery_style?: string
  hero_image_description?: string
  origin_story?: string
  credentials?: string[]
  service_categories?: SiteServiceCategory[]
  trust_badges?: TrustBadgeId[]
  hours_of_operation?: HoursOfOperation
  social_links?: SocialLinks
  license_numbers?: string
  favicon_url?: string | null
  schema_jsonld?: string

  // Build #20: header logo + hero photo, both pushed in by LRP from the
  // tailor wizard. When present, layouts render <img>; when null, layouts
  // fall back to text/gradient as before.
  logo_url?: string | null
  hero_image_url?: string | null
}

export type TemplateVariant = 'classic' | 'modern' | 'bold'

export const TRUST_BADGE_LABELS: Record<TrustBadgeId, string> = {
  google_reviews: 'Google Reviews',
  yelp: 'Yelp',
  bbb: 'BBB',
  home_advisor: 'HomeAdvisor',
  angi: 'Angi',
}

export const CTA_DEFAULT = 'Get a Free Quote'

export function getSiteConfig(): SiteConfig {
  const raw = process.env.NEXT_PUBLIC_SITE_CONFIG
  if (!raw) {
    return fallbackConfig()
  }
  try {
    return JSON.parse(raw) as SiteConfig
  } catch (err) {
    console.error('[site-config] Failed to parse NEXT_PUBLIC_SITE_CONFIG, using fallback:', err)
    return fallbackConfig()
  }
}

export function getTemplateVariant(): TemplateVariant {
  const v = process.env.NEXT_PUBLIC_TEMPLATE_VARIANT
  if (v === 'modern' || v === 'bold' || v === 'classic') return v
  return 'classic'
}

export function getTenantId(): string {
  return process.env.NEXT_PUBLIC_TENANT_ID ?? ''
}

export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_LOCALRANK_API_URL ?? 'https://app.hvacleadcapture.com'
}

// Build #19: each Vercel project is one of two roles. The root page reads
// this to choose between the marketing-site layout and the LP renderer.
export type SiteRole = 'main' | 'landing_page'

export function getSiteRole(): SiteRole {
  return process.env.NEXT_PUBLIC_SITE_ROLE === 'landing_page' ? 'landing_page' : 'main'
}

// Google Ads gtag conversion ID (formatted "AW-XXXXXXXX" by LRP at deploy
// time). When null, the gtag script is not injected at all.
export function getGoogleAdsConvId(): string | null {
  const v = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONV_ID
  return v && v.length > 0 ? v : null
}

// Phone-conversion action label. Combined with the conv id at click time as
// `send_to: '${CONV_ID}/${LABEL}'`. When null, no conversion event fires.
export function getGoogleAdsPhoneLabel(): string | null {
  const v = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL
  return v && v.length > 0 ? v : null
}

// On LP sites, identifies which landing page to render at /. When null, the
// LP site shows a "coming soon" placeholder.
export function getPrimaryLpSlug(): string | null {
  const v = process.env.NEXT_PUBLIC_PRIMARY_LP_SLUG
  return v && v.length > 0 ? v : null
}

function fallbackConfig(): SiteConfig {
  return {
    business_name: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Local Business',
    industry: process.env.NEXT_PUBLIC_INDUSTRY ?? 'Home Services',
    city: process.env.NEXT_PUBLIC_CITY ?? 'Your City',
    state: process.env.NEXT_PUBLIC_STATE ?? '',
    phone: process.env.NEXT_PUBLIC_PHONE ?? null,
    email: null,
    address: null,
    website_url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    hero_headline: 'Trusted Local Service',
    hero_subhead: 'Licensed, insured, and locally owned.',
    about: 'A trusted local home services company.',
    services: [],
    service_areas: [],
    why_choose_us: ['Licensed and insured', 'Fast response', 'Satisfaction guaranteed'],
    testimonials: [],
    brand_colors: { primary: '#1E40AF', accent: '#F97316' },
  }
}
