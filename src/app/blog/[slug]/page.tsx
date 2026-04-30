import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost } from "@/lib/blog"

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: "Post Not Found" }
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keyword,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      tags: post.keyword ? [post.keyword] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const readMinutes = post.wordCount ? Math.ceil(post.wordCount / 238) : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mb-8">
          &#8592; Back to all posts
        </Link>
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-10">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {post.keyword && <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{post.keyword}</span>}
              <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              {readMinutes && <span className="text-xs text-gray-400">{readMinutes} min read</span>}
            </div>
          </header>
          <div
            className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </article>
      </div>
    </div>
  )
}
