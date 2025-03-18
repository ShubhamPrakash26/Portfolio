"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-2xl font-medium text-primary mb-2">Hello, I'm</h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">Shubham Prakash</h1>
          <h3 className="text-xl md:text-2xl text-foreground/80 mb-6">Software Development Engineer</h3>
          <p className="text-lg max-w-2xl mx-auto text-foreground/70 mb-8">
            Skilled in full-stack development using the MERN stack, with proficiency in Java, Python, and C. Experienced
            in data science and machine learning, optimizing application performance and enhancing user experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button asChild className="rounded-full">
            <Link href="#contact">Contact Me</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="#projects">View Projects</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-6 mb-16"
        >
          <Link
            href="https://github.com/shubhamprakash26"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/shubhamprakash26"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:prakashshubham26@gmail.com"
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <Mail size={24} />
            <span className="sr-only">Email</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="animate-bounce"
        >
          <Link href="#about" className="text-foreground/50 hover:text-primary transition-colors">
            <ArrowDown size={24} />
            <span className="sr-only">Scroll Down</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

