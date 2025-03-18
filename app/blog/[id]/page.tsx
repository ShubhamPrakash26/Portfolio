import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogPost from "@/components/blog/blog-post"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const post = await db.collection("blogPosts").findOne({ _id: new ObjectId(params.id) })

    if (!post) {
      return {
        title: "Blog Post Not Found",
      }
    }

    return {
      title: `${post.title} | Shubham Prakash`,
      description: post.excerpt,
    }
  } catch (error) {
    console.error(error)
    return {
      title: "Blog Post",
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const post = await db.collection("blogPosts").findOne({ _id: new ObjectId(params.id) })

    if (!post) {
      notFound()
    }

    return (
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <BlogPost post={JSON.parse(JSON.stringify(post))} />
        </div>
      </main>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}

