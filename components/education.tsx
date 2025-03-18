"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, Calendar } from "lucide-react"

const educationData = [
  {
    institution: "IIT Madras, India",
    degree: "B.Sc in Data Science & Application",
    period: "Jun 2023 - Present",
    details: "CGPA: 7.5",
  },
  {
    institution: "KIIT Bhubaneswar, India",
    degree: "B.Tech. in Computer Science",
    period: "Jul 2020 - Jun 2024",
    details: "CGPA: 8.85",
  },
  {
    institution: "Chinmaya Vidyalaya Bokaro, Jharkhand",
    degree: "AISSCE (Class XII)",
    period: "Apr 2018 - Mar 2020",
    details: "Aggregate: 87.6%",
  },
]

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-primary">Education</span> Timeline
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:translate-x-px"></div>

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} mb-12`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-primary transform -translate-x-2 md:-translate-x-2.5 mt-1.5"></div>

              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-0 md:pr-12" : "md:pl-12 md:pr-0"}`}>
                <div className="bg-card rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-xl font-semibold">{edu.institution}</h3>
                  </div>
                  <p className="text-lg font-medium mb-2">{edu.degree}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-sm">{edu.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

