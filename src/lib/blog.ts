export interface Post {
  title: string
  slug: string
  url: string
  excerpt: string
  keyword: string
  wordCount: number
  publishedAt: string
}

export interface PostDetail {
  title: string
  slug: string
  htmlContent: string
  excerpt: string
  keyword: string
  wordCount: number
  publishedAt: string
}

const API_URL = process.env.NEXT_PUBLIC_LOCALRANK_API_URL ?? "https://app.hvacleadcapture.com"
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID ?? ""

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/api/blog/${TENANT_ID}/feed?limit=50`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.posts ?? []
  } catch {
    return []
  }
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(`${API_URL}/api/blog/${TENANT_ID}/${slug}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}
