import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import type { User } from "@/lib/models/user"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("portfolio")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Determine if this is the first user (make them admin)
    const userCount = await db.collection("users").countDocuments()
    const role = userCount === 0 ? "admin" : "user"

    // Create user
    const user: Omit<User, "_id"> = {
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    }

    const result = await db.collection("users").insertOne(user)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        _id: result.insertedId,
        ...userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}

