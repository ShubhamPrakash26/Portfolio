"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Intel Unnati Industrial Training Program",
    period: "Jul 2023 - Present",
    responsibilities: [
      "Developed a web application using Flask and TensorFlow to detect and remove pixelation from images, enhancing image clarity and user experience by 20%.",
      "Optimized the image processing pipeline, reducing the processing time by 30%, and collaborated with a team of four to ensure efficient project execution.",
    ],
  },
  {
    title: "Bharat Intern",
    period: "Oct 2023 - Dec 2023",
    responsibilities: [
      "Created a responsive web application using HTML, CSS, and JavaScript, improving user engagement by 40%.",
      "Designed UI/UX and optimized website performance, achieving a 30% increase in loading speed and usability.",
    ],
  },
  {
    title: "Federation of Entrepreneurship Development (FED KIIT)",
    period: "Oct 2023 - Present",
    responsibilities: [
      "Improved website performance by 30% by optimizing MERN stack applications, enhancing functionality and user experience.",
      "Led cross-functional collaboration for major events, including SkillHunt, BIZZ Battle, and 405 Found Hackathon, increasing student participation and engagement.",
    ],
  },
  {
    title: "Student Council Member",
    period: "Jun 2017 - Jun 2019",
    responsibilities: [
      "Strengthened accountability and inclusivity by leading student council initiatives that affect a diverse student body.",
      "Developed and implemented a revised code of conduct, securing administrative approval and increasing student policy adherence.",
    ],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Work <span className="text-primary">Experience</span>
        </h2>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-8 bg-card rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary">{exp.title}</h3>
                <div className="flex items-center mt-2 md:mt-0">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="flex items-start">
                    <Briefcase className="h-5 w-5 mr-2 mt-0.5 text-primary/70" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

