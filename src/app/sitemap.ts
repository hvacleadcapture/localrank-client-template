import type { MetadataRoute } from "next"
import { getPosts } from "@/lib/blog"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ""
  const posts = await getPosts()
  const now = new Date()

  return [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/blog`, lastModified: now },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    })),
  ]
}
