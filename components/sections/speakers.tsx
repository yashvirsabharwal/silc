'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { speakers } from '@/lib/content'
import { fadeInUp, stagger, viewport } from '@/lib/animations'

function SpeakerPhoto({ speaker }: { speaker: (typeof speakers)[0] }) {
  if (speaker.image) {
    return (
      <div className="w-14 h-14 rounded-full overflow-hidden border border-border flex-shrink-0 bg-off-white">
        <Image
          src={speaker.image}
          alt={speaker.name}
          width={56}
          height={56}
          className="w-full h-full object-cover object-top"
          unoptimized
        />
      </div>
    )
  }

  return (
    <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm tracking-wider font-medium bg-off-white border border-border text-muted-foreground flex-shrink-0">
      {speaker.initials}
    </div>
  )
}

export function Speakers() {
  return (
    <section id="speakers" className="section-padding bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom"
      >
        <motion.div variants={stagger} className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            Speakers
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-4xl text-near-black mb-4">
            Who You Will Hear From
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[0.88rem] text-muted-foreground leading-[1.7] max-w-lg mx-auto">
            Professionals at the top of their fields in finance, technology, medicine, and investing.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {speakers.map((speaker) => (
            <motion.div key={speaker.name} variants={fadeInUp} className="card p-6 md:p-7">
              <div className="flex items-start gap-4">
                <SpeakerPhoto speaker={speaker} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-display text-base md:text-lg text-near-black mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-[0.72rem] text-gold font-medium tracking-wide mb-0.5">{speaker.title}</p>
                  <p className="text-[0.72rem] text-muted-foreground mb-3">{speaker.organization}</p>
                  <div className="divider mb-3" />
                  <p className="text-[0.8rem] text-muted-foreground leading-[1.7]">{speaker.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
