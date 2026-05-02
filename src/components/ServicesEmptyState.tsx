interface Props {
  businessName: string
  phone: string | null
  primary: string
}

export default function ServicesEmptyState({ businessName, phone, primary }: Props) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '12px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>Services coming soon</h3>
      <p style={{ fontSize: '15px', color: '#4B5563', margin: '0 0 20px', maxWidth: '420px', marginInline: 'auto' }}>
        We&rsquo;re still building out our service catalog. Call {businessName} to ask about availability — we cover a wider range than what&rsquo;s listed online.
      </p>
      {phone && (
        <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} style={{ display: 'inline-block', padding: '12px 24px', background: primary, color: '#fff', fontWeight: 600, fontSize: '15px', borderRadius: '8px', textDecoration: 'none' }}>
          Call {phone}
        </a>
      )}
    </div>
  )
}
