import type React from "react"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | Shubham Prakash",
  description: "Login or register to access the blog",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navbar />
      {children}
    </div>
  )
}

