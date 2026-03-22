'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RSVPForm } from '@/components/forms/rsvp-form'
import { siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Navy header band */}
      <div className="bg-midnight pb-16 pt-24 md:pt-28">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-lg mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
            <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
              {siteConfig.date} · {siteConfig.location}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-editorial text-2xl md:text-4xl text-white mb-4">
              Reserve Your Seat
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-[0.88rem] text-white/50 leading-[1.8]">
              Open to Sikh students and alumni from Ivy League campuses.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Form on cream */}
      <div className="container-custom py-12 md:py-16">
        <RSVPForm />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-7 text-[0.78rem] text-mid-gray"
        >
          Already registered?{' '}
          <Link href="/rsvp/manage" className="text-near-black underline underline-offset-2 hover:text-gold transition-colors">
            Update your details
          </Link>
        </motion.p>
      </div>
    </main>
  )
}
