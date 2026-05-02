import { getSiteConfig, getTemplateVariant } from '@/lib/site-config'
import ClassicLayout from './ClassicLayout'
import ModernLayout from './ModernLayout'
import BoldLayout from './BoldLayout'

export default function SiteSwitcher() {
  const config = getSiteConfig()
  const variant = getTemplateVariant()
  if (variant === 'modern') return <ModernLayout config={config} />
  if (variant === 'bold') return <BoldLayout config={config} />
  return <ClassicLayout config={config} />
}
