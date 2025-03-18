"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Award } from "lucide-react"

const achievements = [
  {
    title: "International Math Olympiad",
    description:
      "Ranked 272 out of 15,000 participants worldwide in the International Math Olympiad, demonstrating strong analytical, problem-solving, and quantitative reasoning skills.",
  },
]

export default function Achievements() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-primary">Achievements</span> & Certifications
        </h2>

        <div className="max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary mr-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{achievement.title}</h3>
              </div>
              <p className="text-foreground/80">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

