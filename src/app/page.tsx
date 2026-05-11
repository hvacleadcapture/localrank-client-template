import SiteSwitcher from '@/components/SiteSwitcher'
import { getSiteRole, getPrimaryLpSlug, getSiteConfig } from '@/lib/site-config'
import { LandingPageView } from '@/components/LandingPageView'

// Build #19: a single template repo serves two project roles. Main-site
// deploys see the marketing pages they always have; landing-page deploys
// render the client's primary published LP at / instead.
export default async function Page() {
  if (getSiteRole() !== 'landing_page') {
    return <SiteSwitcher />
  }
  const slug = getPrimaryLpSlug()
  if (slug) {
    const view = await LandingPageView({ slug })
    if (view) return view
  }
  return <ComingSoon />
}

function ComingSoon() {
  const c = getSiteConfig()
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 px-6 py-20">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{c.business_name}</h1>
        <p className="text-sm text-slate-600">
          Our landing page is launching soon. In the meantime, give us a call.
        </p>
        {c.phone && (
          <a
            href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white shadow-md"
            style={{ backgroundColor: c.brand_colors.accent }}
          >
            Call {c.phone}
          </a>
        )}
      </div>
    </main>
  )
}
