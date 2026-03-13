'use client'

import { motion } from 'framer-motion'
import { agenda } from '@/lib/content'
import { fadeInUp, stagger, viewport } from '@/lib/animations'

export function AgendaPreview() {
  return (
    <section id="agenda" className="section-padding bg-white border-y border-cream-border">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom"
      >
        <motion.div variants={stagger} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            Agenda
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-4xl text-near-black">
            Schedule for the Day
          </motion.h2>
        </motion.div>

        <motion.div variants={stagger} className="max-w-2xl mx-auto space-y-2.5">
          {agenda.map((block) => (
            <motion.div key={block.time} variants={fadeInUp} className="card flex items-start gap-5 p-5 md:p-6">
              <div className="flex-shrink-0 w-[4.5rem] md:w-20 pt-0.5">
                <span className="text-[0.72rem] font-mono text-gold font-medium">{block.time}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[0.88rem] text-near-black font-medium mb-1">{block.title}</h3>
                <p className="text-[0.8rem] text-mid-gray leading-[1.65]">{block.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
