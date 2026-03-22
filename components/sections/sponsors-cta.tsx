'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { sponsors, overallSponsor } from '@/lib/content'
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
            Sponsorship
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-[2.4rem] text-white mb-3">
            Our Sponsors
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[0.78rem] text-gold font-medium tracking-widest uppercase mb-8">
            Sponsored by {overallSponsor.name} ({overallSponsor.fullName})
          </motion.p>

          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
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

          <motion.p variants={fadeInUp} className="text-[0.88rem] text-white/50 mb-9 leading-[1.8] max-w-md mx-auto">
            Interested in partnering with us? Packages are limited and fully customizable.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/sponsors" className="btn-ghost-dark">
              View Sponsorship Tiers
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
