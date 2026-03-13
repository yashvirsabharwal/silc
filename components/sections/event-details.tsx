'use client'

import { motion } from 'framer-motion'
import { fadeInUp, stagger, viewport } from '@/lib/animations'
import { siteConfig } from '@/lib/content'

export function EventDetails() {
  return (
    <section id="about" className="section-padding bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom"
      >
        <motion.div variants={stagger} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            About the Conference
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-4xl text-near-black mb-5">
            What to Expect
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[0.88rem] text-muted-foreground leading-[1.7]">
            The Sikh Ivy League Conference is a half-day event designed to connect, inspire, and build community.
            You will hear from accomplished professionals across finance, technology, medicine, and venture capital.
            You will meet Sikh peers from campuses you may have never visited. And you will leave with a network that extends
            far beyond your own university.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            {
              label: 'Date and Time',
              value: `${siteConfig.day}, ${siteConfig.date}`,
              sub: siteConfig.time,
            },
            {
              label: 'Location',
              value: siteConfig.location,
              sub: siteConfig.city,
            },
            {
              label: 'Details',
              value: siteConfig.food,
              sub: siteConfig.dressCode,
            },
          ].map((item) => (
            <motion.div key={item.label} variants={fadeInUp} className="text-center p-6 card">
              <p className="text-eyebrow !text-[0.55rem] mb-3">{item.label}</p>
              <p className="text-[0.88rem] text-near-black font-medium mb-1">{item.value}</p>
              <p className="text-[0.8rem] text-muted-foreground">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
