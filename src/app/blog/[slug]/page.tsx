import type { Metadata } from "next"

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_LOCALRANK_API_URL ?? "https://app.hvacleadcapture.com"
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID ?? ""
  try {
    const res = await fetch(apiUrl + "/api/blog/" + tenantId + "/feed?limit=50", { next: { revalidate: 3600 } })
    const data = res.ok ? await res.json() : { posts: [] }
    const post = (data.posts ?? []).find((p: {slug:string}) => p.slug === params.slug)
    if (post) return { title: post.title, description: post.excerpt, keywords: post.keyword }
  } catch {}
  return { title: "Blog Post" }
}

export default function BlogPostPage({ params }: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_LOCALRANK_API_URL ?? "https://app.hvacleadcapture.com"
  // Render the post from the LocalRank Pro platform
  return (
    <iframe
      src={apiUrl + "/blog/" + params.slug}
      className="w-full min-h-screen border-0"
      title="Blog Post"
    />
  )
}
