import type React from "react"
import Navbar from "@/components/navbar"
import type { Metadata } from "next"
import { SessionProvider } from "@/components/session-provider"

export const metadata: Metadata = {
  title: "Blog | Shubham Prakash",
  description: "Read my latest thoughts and insights",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </div>
  )
}

