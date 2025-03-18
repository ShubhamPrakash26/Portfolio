import clientPromise from "./mongodb"
import { hash } from "bcryptjs"

export async function seedDefaultData() {
  try {
    const client = await clientPromise
    const db = client.db("portfolio")

    // Check if we already have blog posts
    const blogCount = await db.collection("blogPosts").countDocuments()

    // Only seed if no blog posts exist
    if (blogCount === 0) {
      console.log("Seeding default blog posts...")

      const defaultPosts = [
        {
          title: "Getting Started with Next.js",
          content: `
            <h2>Introduction to Next.js</h2>
            <p>Next.js is a React framework that enables server-side rendering, static site generation, and more.</p>
            <h2>Key Features</h2>
            <ul>
              <li>Server-side rendering</li>
              <li>Static site generation</li>
              <li>API routes</li>
              <li>File-based routing</li>
            </ul>
            <h2>Getting Started</h2>
            <p>To create a new Next.js app, run:</p>
            <pre><code>npx create-next-app@latest my-app</code></pre>
            <p>This will set up a new Next.js project with all the defaults.</p>
          `,
          excerpt:
            "Learn the basics of Next.js and how to create your first application with this powerful React framework.",
          coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
          author: "Shubham Prakash",
          tags: ["Next.js", "React", "Web Development"],
          createdAt: new Date(),
          updatedAt: new Date(),
          published: true,
        },
        {
          title: "Understanding MongoDB with Next.js",
          content: `
            <h2>MongoDB and Next.js</h2>
            <p>MongoDB is a popular NoSQL database that works great with Next.js applications.</p>
            <h2>Setting Up MongoDB</h2>
            <p>First, you'll need to create a MongoDB Atlas account or set up a local MongoDB instance.</p>
            <h2>Connecting to MongoDB</h2>
            <p>In your Next.js application, you can connect to MongoDB using the official MongoDB Node.js driver:</p>
            <pre><code>
            import { MongoClient } from 'mongodb'

            const uri = process.env.MONGODB_URI
            const client = new MongoClient(uri)
            
            export default async function handler(req, res) {
              await client.connect()
              const db = client.db('your-database')
              // Use the database
              await client.close()
            }
            </code></pre>
          `,
          excerpt: "Learn how to integrate MongoDB with your Next.js application for powerful, flexible data storage.",
          coverImage: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=1000",
          author: "Shubham Prakash",
          tags: ["MongoDB", "Next.js", "Database"],
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          updatedAt: new Date(Date.now() - 86400000),
          published: true,
        },
        {
          title: "Building a Portfolio with Next.js",
          content: `
            <h2>Why Next.js for Portfolios?</h2>
            <p>Next.js provides an excellent foundation for building a portfolio website due to its performance, SEO capabilities, and developer experience.</p>
            <h2>Key Components</h2>
            <p>A good portfolio should include:</p>
            <ul>
              <li>About section</li>
              <li>Projects showcase</li>
              <li>Skills and experience</li>
              <li>Contact information</li>
              <li>Blog (optional but recommended)</li>
            </ul>
            <h2>Deployment</h2>
            <p>Vercel provides the easiest deployment experience for Next.js applications, with features like:</p>
            <ul>
              <li>Automatic deployments from Git</li>
              <li>Preview deployments for pull requests</li>
              <li>Custom domains</li>
              <li>Analytics</li>
            </ul>
          `,
          excerpt: "Discover how to create an impressive portfolio website using Next.js and modern web technologies.",
          coverImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=1000",
          author: "Shubham Prakash",
          tags: ["Portfolio", "Next.js", "Web Development"],
          createdAt: new Date(Date.now() - 172800000), // 2 days ago
          updatedAt: new Date(Date.now() - 172800000),
          published: true,
        },
      ]

      await db.collection("blogPosts").insertMany(defaultPosts)
      console.log("Default blog posts seeded successfully")
    }

    // Check if we already have users
    const userCount = await db.collection("users").countDocuments()

    // Only seed if no users exist
    if (userCount === 0) {
      console.log("Seeding default admin user...")

      // Create default admin user
      const hashedPassword = await hash("admin123", 12)

      const defaultAdmin = {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
      }

      await db.collection("users").insertOne(defaultAdmin)
      console.log("Default admin user seeded successfully")
    }
  } catch (error) {
    console.error("Error seeding default data:", error)
  }
}

