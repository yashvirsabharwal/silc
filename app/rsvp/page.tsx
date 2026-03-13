'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RSVPForm } from '@/components/forms/rsvp-form'
import { siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-off-white">
      <div className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-lg mx-auto text-center mb-10 md:mb-14"
          >
            <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
            <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
              {siteConfig.date}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-editorial text-2xl md:text-4xl text-near-black mb-4">
              Reserve Your Seat
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-[0.88rem] text-muted-foreground leading-[1.7]">
              Open to Sikh students and alumni from the eight Ivy League campuses. Complete the form below to secure your spot.
            </motion.p>
          </motion.div>

          <RSVPForm />

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center mt-8 text-[0.78rem] text-muted-foreground"
          >
            Already registered?{' '}
            <Link href="/rsvp/manage" className="text-near-black underline underline-offset-2 hover:text-gold transition-colors">
              Update your details
            </Link>
          </motion.p>
        </div>
      </div>
    </main>
  )
}
