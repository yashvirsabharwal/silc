import type {
  NavLink,
  Speaker,
  AgendaBlock,
  ValuePillar,
  SponsorTier,
  IvyLeagueSchool,
} from './types'

export const siteConfig = {
  name: 'Sikh Ivy League Conference',
  shortName: 'SILC',
  tagline: 'The Inaugural Gathering',
  description:
    'The first conference bringing together Sikh students and professionals from all eight Ivy League campuses for an afternoon of leadership, learning, and community.',
  date: 'April 11, 2026',
  dateShort: '04.11.26',
  day: 'Saturday',
  time: '1:00 PM to 5:00 PM',
  location: 'World Trade Center',
  city: 'New York City',
  food: 'Indian cuisine included',
  dressCode: 'Business Casual',
  email: 'sikhivyleague@gmail.com',
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Agenda', href: '#agenda' },
]

export const ivyLeagueSchools: IvyLeagueSchool[] = [
  { name: 'Harvard University', shortName: 'Harvard' },
  { name: 'Yale University', shortName: 'Yale' },
  { name: 'Princeton University', shortName: 'Princeton' },
  { name: 'Columbia University', shortName: 'Columbia' },
  { name: 'University of Pennsylvania', shortName: 'Penn' },
  { name: 'Brown University', shortName: 'Brown' },
  { name: 'Dartmouth College', shortName: 'Dartmouth' },
  { name: 'Cornell University', shortName: 'Cornell' },
]

export const speakers: Speaker[] = [
  {
    name: 'Sandeep Chhabra',
    title: 'Director, Consumer Investment Banking',
    organization: 'PJT Partners',
    bio: 'Harvard Law School J.D. with experience at Cravath, Swaine & Moore and Lazard M&A before joining PJT Partners. Over 14 years in corporate law, investment banking, and strategic advisory across consumer and retail sectors.',
    initials: 'SC',
    image: '/speakers/sandeep-chhabra.jpg',
    isRevealed: true,
  },
  {
    name: 'Akash Magoon',
    title: 'Co-Founder & CEO',
    organization: 'Adonis',
    bio: 'Forbes 30 Under 30 honoree. Co-founded Nayya, an AI benefits platform valued at $515M, before launching Adonis, a healthcare revenue intelligence company backed by $54M+ in funding from Point72 and others. University of Maryland CS graduate.',
    initials: 'AM',
    image: '/speakers/akash-magoon.jpg',
    isRevealed: true,
  },
  {
    name: 'Dr. Gunisha Kaur',
    title: 'Associate Professor of Anesthesiology',
    organization: 'Weill Cornell Medicine',
    bio: 'Physician-scientist, author of "Lost in History: 1984 Reconstructed," and Co-Medical Director of the Weill Cornell Center for Human Rights. Council on Foreign Relations member. Harvard MA in Medical Anthropology. Published in The New England Journal of Medicine and The Lancet.',
    initials: 'GK',
    image: '/speakers/gunisha-kaur.jpg',
    isRevealed: true,
  },
  {
    name: 'Sunpreet Singh',
    title: 'Vice President',
    organization: 'Insight Partners',
    bio: 'Investor at Insight Partners across a $20B fund, focused on SaaS, AI, developer tools, and cloud infrastructure. Dartmouth College graduate. Previously at Bain & Company. Covers investment stages from Seed through Series B.',
    initials: 'SS',
    image: '/speakers/sunpreet-singh.jpg',
    isRevealed: true,
  },
]

export const agenda: AgendaBlock[] = [
  {
    time: '1:00 PM',
    title: 'Arrival and Registration',
    description: 'Check in, receive your name badge, and connect with attendees over cha.',
  },
  {
    time: '1:30 PM',
    title: 'Opening Remarks',
    description: 'Welcome address from the organizing committee and an overview of the afternoon.',
  },
  {
    time: '2:00 PM',
    title: 'Speaker Sessions',
    description: 'Presentations from leaders in finance, technology, medicine, and venture capital on building exceptional careers.',
  },
  {
    time: '3:15 PM',
    title: 'Networking Break',
    description: 'Structured networking session to connect with peers from all eight Ivy League campuses.',
  },
  {
    time: '3:45 PM',
    title: 'Panel Discussion',
    description: 'A candid conversation on the Sikh experience in professional and academic spaces.',
  },
  {
    time: '4:30 PM',
    title: 'Closing Remarks',
    description: 'Reflections on the day and next steps for building the Sikh Ivy League community.',
  },
  {
    time: '5:00 PM',
    title: 'Dinner',
    description: 'Indian cuisine and continued conversation to close out the inaugural conference.',
  },
]

export const valuePillars: ValuePillar[] = [
  {
    title: 'Community',
    description:
      'There is no formal network connecting Sikh students across the Ivy League. This conference changes that by creating a space for shared identity, shared ambition, and lasting relationships.',
    icon: 'users',
  },
  {
    title: 'Leadership',
    description:
      'Hear directly from professionals who have built careers at the highest levels of finance, technology, medicine, and investing. Practical insight from people who have been where you are.',
    icon: 'compass',
  },
  {
    title: 'Legacy',
    description:
      'This is the first event of its kind. By attending, you become part of the founding generation of a community that will serve Sikh students at these institutions for years to come.',
    icon: 'landmark',
  },
]

export const sponsorTiers: SponsorTier[] = [
  {
    name: 'Founding Partner',
    price: 'Custom',
    features: [
      'Premier logo placement across all materials',
      'Dedicated speaking slot or introduction',
      'VIP access to speakers and organizers',
      'Full-page feature in the event program',
    ],
  },
  {
    name: 'Leadership Sponsor',
    price: 'Custom',
    features: [
      'Logo on event materials and website',
      'Branded presence at the venue',
      'Recognition during opening remarks',
    ],
  },
  {
    name: 'Community Supporter',
    price: 'Custom',
    features: [
      'Logo on event website',
      'Recognition in event communications',
    ],
  },
]
