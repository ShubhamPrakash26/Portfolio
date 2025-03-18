"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  {
    title: "Pixelated Image Detection System",
    date: "Jun 2024",
    description: [
      "Refined image quality by 70% by developing an AI-powered web app using Flask and TensorFlow, using super-resolution GAN (SRGAN).",
      "Reduced processing time by 50% by implementing CNN-based de-pixelation techniques, improving the real-time image restoration efficiency.",
    ],
    technologies: ["Flask", "TensorFlow", "SRGAN", "CNN", "Python"],
    github: "https://github.com/shubhamprakash26/pixelated-image-detection",
    demo: "#",
  },
  {
    title: "BudgetMentor – AI-Powered Financial Advisor",
    date: "Jan 2025",
    description: [
      "Built an AI-driven financial advisor using the MERN stack and Gemini APIs, allowing users to track budgets, manage expenses, and receive personalized insights.",
      "Enhanced financial planning by integrating AI-based budget recommendations, spending trend visualizations, and goal tracking, increasing user engagement.",
    ],
    technologies: ["MERN Stack", "Gemini API", "AI", "Data Visualization"],
    github: "https://github.com/shubhamprakash26/budget-mentor",
    demo: "#",
  },
  {
    title: "Quiz Master App – Multiuser Quiz Management System",
    date: "Feb 2025",
    description: [
      "Authored a flask-based quiz management system with an admin panel, allowing easy quiz creation, user management, and real-time performance tracking.",
      "Implemented database efficiency and response time by integrating SQLAlchemy and optimizing the UI with Bootstrap and JavaScript for a seamless user experience.",
    ],
    technologies: ["Flask", "SQLAlchemy", "Bootstrap", "JavaScript"],
    github: "https://github.com/shubhamprakash26/quiz-master",
    demo: "#",
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Projects</span>
        </h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{project.date}</span>
                  </div>
                </div>

                <ul className="mb-4 space-y-2">
                  {project.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-sm">
                      {desc}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

