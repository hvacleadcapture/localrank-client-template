import type { Metadata } from "next"
import "./globals.css"

const biz = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Local Business"
const city = process.env.NEXT_PUBLIC_CITY ?? ""
const ind = process.env.NEXT_PUBLIC_INDUSTRY ?? "Home Services"

export const metadata: Metadata = {
  title: biz + " | " + ind + " in " + city,
  description: "Professional " + ind.toLowerCase() + " services in " + city + ". Call us today.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  )
}
