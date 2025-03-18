"use client"

import type { BlogPost as BlogPostType } from "@/lib/models/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Tag, Clock, Edit } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSession } from "next-auth/react"

// You can use a markdown library like react-markdown for content rendering
// For simplicity, we'll use dangerouslySetInnerHTML here
interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const isAdmin = session?.user?.role === "admin"

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const readingTime = Math.max(1, Math.ceil(post.content.split(" ").length / 200))

  return (
    <article className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        {isAdmin && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/blog/admin/edit/${post._id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Post
            </Link>
          </Button>
        )}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          {formattedDate}
        </div>
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          {readingTime} min read
        </div>
      </div>

      {post.coverImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img src={post.coverImage || "/placeholder.svg"} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {tag}
          </Badge>
        ))}
      </div>

      <div className="border-t pt-6 mt-8">
        <p className="text-muted-foreground mb-4">Written by {post.author}</p>
        <Button asChild>
          <Link href="/blog">View All Posts</Link>
        </Button>
      </div>
    </article>
  )
}

