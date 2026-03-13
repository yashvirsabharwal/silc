'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Mail } from 'lucide-react'
import { sponsorTiers, siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-off-white">
      <div className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-custom">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-8">
              <Link href="/" className="inline-flex items-center gap-1.5 text-[0.78rem] text-muted-foreground hover:text-near-black transition-colors">
                <ArrowLeft size={13} /> Back
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="accent-line mb-6" />
            <motion.p variants={fadeInUp} className="text-eyebrow mb-4">Sponsorship</motion.p>
            <motion.h1 variants={fadeInUp} className="text-editorial text-2xl md:text-4xl text-near-black mb-4">
              Partner With Us
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-[0.88rem] text-muted-foreground max-w-xl mb-12 md:mb-16 leading-[1.7]">
              The Sikh Ivy League Conference brings together students and professionals from the most
              prestigious universities in the country. Sponsoring this event puts your brand directly
              in front of future leaders.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 md:mb-20">
              {sponsorTiers.map((tier, index) => (
                <motion.div key={tier.name} variants={fadeInUp} className={`card p-6 md:p-8 ${index === 0 ? 'border-gold/30' : ''}`}>
                  {index === 0 && (
                    <span className="text-[0.6rem] uppercase tracking-[0.15em] text-gold bg-gold/8 px-2.5 py-1 rounded font-medium inline-block mb-4">
                      Premier
                    </span>
                  )}
                  <h3 className="text-display text-lg text-near-black mb-1.5">{tier.name}</h3>
                  <p className="text-[0.8rem] text-gold mb-5">{tier.price}</p>
                  <ul className="space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span className="text-[0.8rem] text-muted-foreground leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="card p-8 md:p-12 text-center max-w-md mx-auto">
              <h3 className="text-display text-lg text-near-black mb-3">Interested?</h3>
              <p className="text-[0.84rem] text-muted-foreground mb-6 leading-[1.7]">
                All packages are customizable. Reach out and we will find the right fit for your organization.
              </p>
              <a href={`mailto:${siteConfig.email}?subject=SILC Sponsorship Inquiry`} className="btn-primary">
                <Mail size={14} /> Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
