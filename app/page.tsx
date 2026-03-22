import { Hero } from '@/components/sections/hero'
import { PrestigeStrip } from '@/components/sections/prestige-strip'
import { EventDetails } from '@/components/sections/event-details'
import { ValuePillars } from '@/components/sections/value-pillars'
import { Speakers } from '@/components/sections/speakers'
import { AgendaPreview } from '@/components/sections/agenda-preview'
import { SponsorsCTA } from '@/components/sections/sponsors-cta'

export default function Home() {
  return (
    <main>
      <Hero />
      <PrestigeStrip />
      <EventDetails />
      <Speakers />
      <ValuePillars />
      <AgendaPreview />
      <SponsorsCTA />
    </main>
  )
}
