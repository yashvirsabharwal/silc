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
      className="border-t border-border bg-off-white"
    >
      <div className="container-custom py-10 md:py-14">
        <motion.div variants={stagger} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <motion.div variants={fadeInUp}>
            <p className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-near-black mb-2">
              {siteConfig.shortName}
            </p>
            <p className="text-[0.8rem] text-muted-foreground max-w-sm leading-relaxed">
              {siteConfig.date} at the {siteConfig.location}, {siteConfig.city}.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-6 text-[0.75rem] text-muted-foreground">
            <Link href="/rsvp" className="hover:text-near-black transition-colors">RSVP</Link>
            <Link href="/sponsors" className="hover:text-near-black transition-colors">Sponsors</Link>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-near-black transition-colors">Contact</a>
          </motion.div>
        </motion.div>

        <div className="divider my-8" />

        <p className="text-[0.65rem] text-muted-foreground/60 text-center">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </motion.footer>
  )
}
