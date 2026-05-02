export interface SiteService { name: string; description: string }

export interface SiteTestimonial { quote: string; author: string; location?: string }

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
  brand_colors: { primary: string; accent: string }
}

export type TemplateVariant = 'classic' | 'modern' | 'bold'

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
