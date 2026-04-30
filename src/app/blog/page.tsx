import Link from "next/link"
import { getPosts, type Post } from "@/lib/blog"

export default async function BlogPage() {
  const posts = await getPosts()
  const biz = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Our Business"
  const city = process.env.NEXT_PUBLIC_CITY ?? ""
  const ind = process.env.NEXT_PUBLIC_INDUSTRY ?? "Home Services"
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">{biz}</p>
          <h1 className="text-3xl font-bold text-gray-900">{ind} Tips &amp; Guides for {city}</h1>
          <p className="text-gray-500 mt-1">Expert advice for homeowners in {city}.</p>
        </div>
        {!posts.length && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">New articles coming soon.</p>
          </div>
        )}
        <div className="space-y-4">
          {posts.map((post: Post) => (
            <article key={post.slug} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">{post.title}</h2>
                  </Link>
                  {post.excerpt && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>}
                  <div className="flex items-center gap-3 mt-3">
                    {post.keyword && <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{post.keyword}</span>}
                    <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    {post.wordCount && <span className="text-xs text-gray-400">{Math.ceil(post.wordCount / 238)} min read</span>}
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`} className="shrink-0 text-xs font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">Read &#8594;</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
