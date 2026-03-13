'use client'

import { motion } from 'framer-motion'
import { ivyLeagueSchools } from '@/lib/content'
import { fadeIn, viewport } from '@/lib/animations'

export function PrestigeStrip() {
  return (
    <section className="bg-white border-b border-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom py-6 md:py-8"
      >
        <motion.div
          variants={fadeIn}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-10"
        >
          {ivyLeagueSchools.map((school) => (
            <span
              key={school.shortName}
              className="text-[0.75rem] md:text-[0.8rem] text-muted-foreground/60 tracking-[0.04em]"
            >
              {school.shortName}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
