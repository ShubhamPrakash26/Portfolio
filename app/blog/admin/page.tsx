import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import BlogAdmin from "@/components/blog/blog-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog Admin | Shubham Prakash",
  description: "Manage your blog posts",
}

export default async function BlogAdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  if (session.user.role !== "admin") {
    redirect("/blog")
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Blog <span className="text-primary">Admin</span>
        </h1>
        <BlogAdmin />
      </div>
    </main>
  )
}

