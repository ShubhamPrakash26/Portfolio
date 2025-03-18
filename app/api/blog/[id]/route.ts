import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// GET a single blog post
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const post = await db.collection("blogPosts").findOne({ _id: new ObjectId(params.id) })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// PUT (update) a blog post
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const data = await req.json()

    // Process tags
    const tags = data.tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean)

    const updatedPost = {
      ...data,
      tags,
      updatedAt: new Date(),
    }

    const result = await db.collection("blogPosts").updateOne({ _id: new ObjectId(params.id) }, { $set: updatedPost })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({
      _id: params.id,
      ...updatedPost,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// DELETE a blog post
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    const result = await db.collection("blogPosts").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}

