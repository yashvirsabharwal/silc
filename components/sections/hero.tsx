'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative bg-midnight">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(201,151,63,0.8) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gold glow from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,151,63,0.08),transparent)]" />

      <div className="relative container-custom pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-36">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-7" />

          <motion.p variants={fadeInUp} className="text-eyebrow mb-5">
            {siteConfig.tagline}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-editorial text-[2.4rem] sm:text-5xl md:text-[3.6rem] lg:text-[4rem] text-white mb-6 leading-tight"
          >
            Sikh Ivy League
            <br />
            <span className="text-gold">Conference</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-[0.9rem] md:text-[0.98rem] text-white/55 leading-[1.8] mb-9 max-w-lg mx-auto"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          >
            <Link href="/rsvp" className="btn-primary">
              Reserve Your Seat
              <ArrowRight size={14} />
            </Link>
            <Link href="#speakers" className="btn-ghost-dark">
              View Speakers
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            <span className="flex items-center gap-2 text-[0.75rem] text-white/40">
              <Calendar size={12} className="text-gold/70" />
              {siteConfig.day}, {siteConfig.date}
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="flex items-center gap-2 text-[0.75rem] text-white/40">
              <Clock size={12} className="text-gold/70" />
              {siteConfig.time}
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="flex items-center gap-2 text-[0.75rem] text-white/40">
              <MapPin size={12} className="text-gold/70" />
              {siteConfig.location}, {siteConfig.city}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
