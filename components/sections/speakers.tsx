'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { speakers } from '@/lib/content'
import { fadeInUp, stagger, viewport } from '@/lib/animations'
import type { Speaker } from '@/lib/types'

function SpeakerPhoto({ speaker }: Readonly<{ speaker: Speaker }>) {
  if (speaker.image) {
    return (
      <div className="w-12 h-12 rounded-full overflow-hidden border border-cream-border flex-shrink-0 bg-cream">
        <Image
          src={speaker.image}
          alt={speaker.name}
          width={48}
          height={48}
          className="w-full h-full object-cover object-top"
          unoptimized
        />
      </div>
    )
  }
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs tracking-wider font-medium bg-cream border border-cream-border text-mid-gray flex-shrink-0">
      {speaker.initials}
    </div>
  )
}

function SpeakerCard({ speaker }: Readonly<{ speaker: Speaker }>) {
  return (
    <motion.div variants={fadeInUp} className="card p-5 md:p-6 flex flex-col h-full">
      <div className="flex items-start gap-3.5">
        <SpeakerPhoto speaker={speaker} />
        <div className="flex-1 min-w-0">
          <h3 className="text-display text-[0.95rem] md:text-base text-near-black mb-0.5">
            {speaker.name}
          </h3>
          <p className="text-[0.7rem] text-gold font-medium tracking-wide mb-0.5">{speaker.title}</p>
          <p className="text-[0.7rem] text-mid-gray">{speaker.organization}</p>
        </div>
      </div>
      <div className="divider my-3" />
      <p className="text-[0.78rem] text-mid-gray leading-[1.75] flex-1">{speaker.bio}</p>
    </motion.div>
  )
}

function SpeakerPanel({ title, panelSpeakers }: Readonly<{ title: string; panelSpeakers: Speaker[] }>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="mb-14 last:mb-0"
    >
      <motion.div variants={stagger}>
        <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px bg-cream-border" />
          <h3 className="text-display text-base md:text-lg text-near-black whitespace-nowrap px-2">
            {title}
          </h3>
          <div className="flex-1 h-px bg-cream-border" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {panelSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Speakers() {
  const experienced = speakers.filter((s) => s.panel === 'experienced')
  const earlyCareer = speakers.filter((s) => s.panel === 'earlyCareer')

  return (
    <section id="speakers" className="section-padding bg-cream">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="container-custom"
      >
        <motion.div variants={stagger} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
          <motion.div variants={fadeInUp} className="accent-line mx-auto mb-6" />
          <motion.p variants={fadeInUp} className="text-eyebrow mb-4">
            Speakers
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-display text-2xl md:text-4xl text-near-black mb-4">
            Who You Will Hear From
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[0.88rem] text-mid-gray leading-[1.8] max-w-lg mx-auto">
            Leaders and rising professionals across finance, technology, medicine, law, and venture capital.
          </motion.p>
        </motion.div>

        <SpeakerPanel title="Experienced Professionals" panelSpeakers={experienced} />
        <SpeakerPanel title="Early Career &amp; Recent Graduates" panelSpeakers={earlyCareer} />
      </motion.div>
    </section>
  )
}
