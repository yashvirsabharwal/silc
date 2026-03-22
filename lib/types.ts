export interface NavLink {
  label: string
  href: string
}

export interface Speaker {
  name: string
  title: string
  organization: string
  bio: string
  image?: string
  initials: string
  isRevealed: boolean
  panel: 'experienced' | 'earlyCareer'
}

export interface Sponsor {
  name: string
  title: string
  organization: string
}

export interface AgendaBlock {
  time: string
  title: string
  description: string
}

export interface ValuePillar {
  title: string
  description: string
  icon: string
}

export interface SponsorTier {
  name: string
  price: string
  features: string[]
}

export interface IvyLeagueSchool {
  name: string
  shortName: string
}

export interface RSVPFormData {
  full_name: string
  email: string
  school: string
  graduation_year: number
  major: string
  linkedin_url: string
  dietary_restrictions: string
}
