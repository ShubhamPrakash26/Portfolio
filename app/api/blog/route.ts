import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { BlogPost } from "@/lib/models/blog"

// GET all blog posts
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const searchParams = req.nextUrl.searchParams
    const published = searchParams.get("published")

    let query = {}
    if (published === "true") {
      query = { published: true }
    }

    const posts = await db.collection("blogPosts").find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(posts)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

// POST a new blog post
export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const data = await req.json()

    // Process tags
    const tags = data.tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean)

    const blogPost: BlogPost = {
      ...data,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("blogPosts").insertOne(blogPost)

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...blogPost,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

