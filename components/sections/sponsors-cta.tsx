'use client'

import { motion } from 'framer-motion'
import { sponsors } from '@/lib/content'
import { fadeInUp, stagger, viewport } from '@/lib/animations'

export function SponsorsCTA() {
  return (
    <section className="section-padding bg-midnight relative">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(201,151,63,0.8) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(201,151,63,0.06),transparent)]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative container-custom"
      >
        <motion.div variants={stagger} className="max-w-3xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-7" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            Sponsors
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-[2.4rem] text-white mb-3">
            Our Sponsors
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[0.78rem] text-gold font-medium tracking-widest uppercase mb-8">
            Co-Sponsored by United Sikh Movement (USM) and Sikhs of NY (SONY)
          </motion.p>

          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                variants={fadeInUp}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-5 text-center"
              >
                <p className="text-[0.88rem] text-white font-medium mb-1">{sponsor.name}</p>
                <p className="text-[0.7rem] text-gold font-medium tracking-wide mb-0.5">{sponsor.title}</p>
                <p className="text-[0.7rem] text-white/40">{sponsor.organization}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
