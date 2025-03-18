"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="bg-card rounded-xl shadow-lg p-6 md:p-8">
            <p className="text-lg mb-4">
              I'm a Software Development Engineer (SDE) skilled in full-stack development using the MERN stack, with
              proficiency in Java, Python, and C.
            </p>
            <p className="text-lg mb-4">
              My experience spans data science and machine learning, with a focus on optimizing application performance
              and enhancing user experience. I bring strong analytical and technical abilities to develop innovative
              software solutions.
            </p>
            <p className="text-lg mb-4">
              Currently pursuing a B.Sc in Data Science & Applications at IIT Madras, I've also completed my B.Tech in
              Computer Science from KIIT Bhubaneswar with a CGPA of 8.85.
            </p>
            <p className="text-lg">
              I'm passionate about creating efficient, user-friendly applications and continuously expanding my
              knowledge in emerging technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

