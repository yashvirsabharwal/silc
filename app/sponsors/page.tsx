'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Mail } from 'lucide-react'
import { sponsorTiers, siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Navy header band */}
      <div className="bg-midnight pb-16 pt-24 md:pt-28">
        <div className="container-custom">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-7">
              <Link href="/" className="inline-flex items-center gap-1.5 text-[0.75rem] text-white/40 hover:text-white/70 transition-colors">
                <ArrowLeft size={13} /> Back
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="accent-line mb-6" />
            <motion.p variants={fadeInUp} className="text-eyebrow mb-4">Sponsorship</motion.p>
            <motion.h1 variants={fadeInUp} className="text-editorial text-2xl md:text-4xl text-white mb-4">
              Partner With Us
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-[0.88rem] text-white/50 max-w-xl leading-[1.8]">
              The Sikh Ivy League Conference brings together students and professionals from the
              most prestigious universities in the country. Sponsoring this event puts your brand
              directly in front of future leaders.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Content on cream */}
      <div className="container-custom py-12 md:py-16">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 md:mb-16">
            {sponsorTiers.map((tier, index) => (
              <motion.div key={tier.name} variants={fadeInUp}
                className={`card p-6 md:p-8 ${index === 0 ? 'border-gold/25' : ''}`}>
                {index === 0 && (
                  <span className="text-[0.58rem] uppercase tracking-[0.14em] text-gold bg-gold/8 px-2.5 py-1 rounded font-semibold inline-block mb-4 border border-gold/15">
                    Premier
                  </span>
                )}
                <h3 className="text-display text-lg text-near-black mb-1.5">{tier.name}</h3>
                <p className="text-[0.78rem] text-gold mb-5">{tier.price}</p>
                <ul className="space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center bg-gold/8 border border-gold/15 flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-gold" strokeWidth={2.5} />
                      </div>
                      <span className="text-[0.8rem] text-mid-gray leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="card p-8 md:p-12 text-center max-w-md mx-auto">
            <h3 className="text-display text-lg text-near-black mb-3">Interested?</h3>
            <p className="text-[0.84rem] text-mid-gray mb-6 leading-[1.7]">
              All packages are customizable. Reach out and we will find the right fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="mailto:harjasan@wharton.upenn.edu?subject=SILC Sponsorship Inquiry" className="btn-primary">
                <Mail size={14} /> harjasan@wharton.upenn.edu
              </a>
              <a href="mailto:gurjeet.singh@princeton.edu?subject=SILC Sponsorship Inquiry" className="btn-secondary">
                <Mail size={14} /> gurjeet.singh@princeton.edu
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
