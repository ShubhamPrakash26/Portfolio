import type { Metadata } from "next"
import { notFound } from "next/navigation"
import BlogForm from "@/components/blog/blog-form"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

interface BlogEditPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Edit Blog Post | Shubham Prakash",
  description: "Edit your blog post",
}

export default async function BlogEditPage({ params }: BlogEditPageProps) {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Edit <span className="text-primary">Blog Post</span>
          </h1>
          <BlogForm post={JSON.parse(JSON.stringify(post))} />
        </div>
      </main>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
}

