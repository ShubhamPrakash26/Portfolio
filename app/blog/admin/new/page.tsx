import type { Metadata } from "next"
import BlogForm from "@/components/blog/blog-form"

export const metadata: Metadata = {
  title: "New Blog Post | Shubham Prakash",
  description: "Create a new blog post",
}

export default function NewBlogPostPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Create <span className="text-primary">Blog Post</span>
        </h1>
        <BlogForm />
      </div>
    </main>
  )
}

