"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { BlogPost } from "@/lib/models/blog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export default function BlogList() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAdmin = session?.user?.role === "admin"

  useEffect(() => {
    async function fetchPosts() {
      try {
        // If admin, fetch all posts, otherwise only published ones
        const url = isAdmin ? "/api/blog" : "/api/blog?published=true"
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }

        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchPosts()
    }
  }, [session, isAdmin])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl mb-4">No blog posts found.</p>
        <p className="text-muted-foreground">Check back later for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link href={`/blog/${post._id}`} key={post._id?.toString()}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </CardDescription>
              {!post.published && isAdmin && (
                <Badge variant="outline" className="mt-2">
                  Draft
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && <Badge variant="outline">+{post.tags.length - 3}</Badge>}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

