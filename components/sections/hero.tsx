'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative bg-off-white border-b border-border">
      <div className="container-custom pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            {siteConfig.tagline}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-near-black mb-6"
          >
            Sikh Ivy League Conference
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-[0.92rem] md:text-base text-muted-foreground leading-[1.7] mb-8 max-w-lg mx-auto"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link href="/rsvp" className="btn-primary">
              Reserve Your Seat
              <ArrowRight size={14} />
            </Link>
            <Link href="#speakers" className="btn-secondary">
              View Speakers
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.78rem] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gold" />
              {siteConfig.day}, {siteConfig.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-gold" />
              {siteConfig.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-gold" />
              {siteConfig.location}, {siteConfig.city}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
