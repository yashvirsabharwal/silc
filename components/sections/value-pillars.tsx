'use client'

import { motion } from 'framer-motion'
import { Users, Compass, Landmark } from 'lucide-react'
import { valuePillars } from '@/lib/content'
import { fadeInUp, stagger, viewport } from '@/lib/animations'

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  users: Users,
  compass: Compass,
  landmark: Landmark,
}

export function ValuePillars() {
  return (
    <section className="section-padding bg-white border-y border-cream-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom"
      >
        <motion.div variants={stagger} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            Why This Matters
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-4xl text-near-black">
            Built for Those Who Lead
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {valuePillars.map((pillar) => {
            const Icon = iconMap[pillar.icon] || Users
            return (
              <motion.div key={pillar.title} variants={fadeInUp} className="card p-7 md:p-8">
                <div className="w-9 h-9 rounded-full bg-gold/8 border border-gold/15 flex items-center justify-center mb-5">
                  <Icon className="text-gold" size={16} />
                </div>
                <h3 className="text-display text-lg text-near-black mb-3">{pillar.title}</h3>
                <p className="text-[0.84rem] text-mid-gray leading-[1.75]">{pillar.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
