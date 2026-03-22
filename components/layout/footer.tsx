'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/content'
import { fadeInUp, stagger, viewport } from '@/lib/animations'

export function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="bg-midnight border-t border-midnight-border"
    >
      <div className="container-custom pt-12 pb-8 md:pt-16 md:pb-10">
        <motion.div
          variants={stagger}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-10"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-gold mb-3">
              {siteConfig.shortName}
            </p>
            <p className="text-[0.8rem] text-white/40 max-w-sm leading-relaxed">
              {siteConfig.date} · {siteConfig.location}, {siteConfig.city}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-6 text-[0.75rem] text-white/35">
              <Link href="/rsvp" className="hover:text-white/70 transition-colors duration-300">RSVP</Link>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white/70 transition-colors duration-300">Contact</a>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <p className="text-[0.6rem] text-white/25 tracking-wider uppercase font-medium">Outreach</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a href="mailto:harjasan@wharton.upenn.edu" className="text-[0.72rem] text-white/30 hover:text-gold/70 transition-colors duration-300">
                  harjasan@wharton.upenn.edu
                </a>
                <a href="mailto:gurjeet.singh@princeton.edu" className="text-[0.72rem] text-white/30 hover:text-gold/70 transition-colors duration-300">
                  gurjeet.singh@princeton.edu
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="divider-dark mb-6" />

        <p className="text-[0.65rem] text-white/20 text-center tracking-wider">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </motion.footer>
  )
}
