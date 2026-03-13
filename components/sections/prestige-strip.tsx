'use client'

import { motion } from 'framer-motion'
import { ivyLeagueSchools } from '@/lib/content'
import { fadeIn, viewport } from '@/lib/animations'

export function PrestigeStrip() {
  return (
    <section className="bg-midnight-mid border-b border-midnight-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom py-5 md:py-6"
      >
        <motion.div
          variants={fadeIn}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-x-9"
        >
          <span className="text-[0.6rem] font-medium tracking-[0.18em] uppercase text-gold/60 mr-2 hidden md:inline">
            Ivy League
          </span>
          {ivyLeagueSchools.map((school) => (
            <span
              key={school.shortName}
              className="text-[0.72rem] md:text-[0.78rem] text-white/30 tracking-[0.04em] hover:text-white/60 transition-colors duration-500 cursor-default"
            >
              {school.shortName}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
