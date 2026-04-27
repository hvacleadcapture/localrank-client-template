import Link from "next/link"

export default function HomePage() {
  const biz = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Local Business"
  const city = process.env.NEXT_PUBLIC_CITY ?? ""
  const ind = process.env.NEXT_PUBLIC_INDUSTRY ?? "Home Services"
  const phone = process.env.NEXT_PUBLIC_PHONE ?? ""
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{biz}</h1>
        <p className="text-xl text-gray-500 mb-2">Professional {ind} Services in {city}</p>
        {phone && <p className="text-2xl font-bold text-blue-600 my-6">{phone}</p>}
        <div className="flex gap-4 justify-center mt-8">
          <a href={"tel:" + phone} className="rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700">Call Now</a>
          <Link href="/blog" className="rounded-xl border border-gray-200 bg-white px-8 py-3 text-gray-700 font-semibold hover:bg-gray-50">Tips & Guides</Link>
        </div>
      </div>
    </main>
  )
}
