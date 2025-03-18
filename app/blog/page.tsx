import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import BlogList from "@/components/blog/blog-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"
import { seedDefaultData } from "@/lib/seed-data"

export const metadata: Metadata = {
  title: "Blog | Shubham Prakash",
  description: "Read my latest thoughts, tutorials, and insights on software development and technology.",
}

export default async function BlogPage() {
  // Seed default data (will only run if no data exists)
  await seedDefaultData()

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const isAdmin = session.user.role === "admin"

  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            My <span className="text-primary">Blog</span>
          </h1>

          <div className="flex gap-4">
            {isAdmin && (
              <Button asChild>
                <Link href="/blog/admin">Admin Dashboard</Link>
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/">Back to Portfolio</Link>
            </Button>
          </div>
        </div>

        <BlogList />
      </div>
    </main>
  )
}

