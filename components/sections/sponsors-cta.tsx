'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, stagger, viewport } from '@/lib/animations'

export function SponsorsCTA() {
  return (
    <section className="section-padding bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom"
      >
        <motion.div variants={stagger} className="max-w-xl mx-auto text-center">
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            Sponsorship
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-4xl text-near-black mb-4">
            Partner With Us
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[0.88rem] text-muted-foreground mb-8 leading-[1.7]">
            We are seeking partners who want to invest in the next generation of Sikh leaders from the Ivy League.
            Sponsorship packages are limited and fully customizable.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/sponsors" className="btn-secondary">
              View Sponsorship Tiers
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
