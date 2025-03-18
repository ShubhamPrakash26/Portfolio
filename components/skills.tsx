"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Server, Globe, Terminal, Cloud } from "lucide-react"

const skillCategories = [
  {
    title: "Programming",
    icon: <Code className="h-6 w-6" />,
    skills: ["Java", "Python", "C", "JavaScript"],
  },
  {
    title: "Web Development",
    icon: <Globe className="h-6 w-6" />,
    skills: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js", "RESTful APIs", "Firebase"],
  },
  {
    title: "Tools",
    icon: <Terminal className="h-6 w-6" />,
    skills: ["SQL", "MongoDB", "PostgreSQL", "Cassandra", "Git", "Docker", "AWS", "CI/CD", "OAuth", "JWT"],
  },
  {
    title: "Cloud",
    icon: <Cloud className="h-6 w-6" />,
    skills: ["AWS", "Azure", "GCP"],
  },
  {
    title: "Core Strengths",
    icon: <Server className="h-6 w-6" />,
    skills: ["Data Structures & Algorithms", "SDLC", "Teamwork"],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Technical <span className="text-primary">Skills</span>
        </h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary mr-4">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="px-3 py-1 bg-muted rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

