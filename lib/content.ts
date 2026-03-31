import type {
  NavLink,
  Speaker,
  AgendaBlock,
  ValuePillar,
  SponsorTier,
  IvyLeagueSchool,
  Sponsor,
} from './types'

export const siteConfig = {
  name: 'Sikh Ivy League Conference',
  shortName: 'SILC',
  tagline: 'The Inaugural Gathering',
  description:
    'The first conference bringing together Sikh students and professionals from Ivy League campuses for an afternoon of leadership, learning, and community.',
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
  { name: 'Dartmouth College', shortName: 'Dartmouth' },
  { name: 'Cornell University', shortName: 'Cornell' },
]

export const speakers: Speaker[] = [
  {
    name: 'Sandeep Chhabra',
    title: 'Director, Investment Banking',
    organization: 'PJT Partners',
    bio: 'Director in PJT Partners\' Strategic Advisory Group, advising on M&A and capital markets across the consumer and retail sectors. Previously a Vice President at Lazard and Corporate Associate at Cravath, Swaine & Moore. Harvard Law School J.D.; Rutgers University B.A. in Economics and Political Science.',
    initials: 'SC',
    image: '/speakers/sandeep-chhabra.jpg',
    isRevealed: true,
    panel: 'experienced',
  },
  {
    name: 'Akash Magoon',
    title: 'Co-Founder & CEO',
    organization: 'Adonis',
    bio: 'Forbes 30 Under 30 honoree who co-founded Nayya (AI benefits platform, $515M valuation) before launching Adonis, a healthcare revenue intelligence platform that has raised $54M+. Previously an engineer at AWS, Cedar, and Enigma Technologies. University of Maryland B.S. in Computer Science.',
    initials: 'AM',
    image: '/speakers/akash-magoon.jpg',
    isRevealed: true,
    panel: 'experienced',
  },
  {
    name: 'Dr. Gunisha Kaur',
    title: 'Associate Professor of Anesthesiology',
    organization: 'Weill Cornell Medicine',
    bio: 'Physician-scientist and Co-Medical Director of the Weill Cornell Center for Human Rights. Named an Emerging Leader by the National Academy of Medicine. Author of "Lost in History: 1984 Reconstructed." Cornell University B.S.; Weill Cornell M.D.; Harvard M.A. in Medical Anthropology.',
    initials: 'GK',
    image: '/speakers/gunisha-kaur.jpg',
    isRevealed: true,
    panel: 'experienced',
  },
  {
    name: 'Navi Singh',
    title: 'Partner',
    organization: 'Taisu Ventures',
    bio: 'Partner at Taisu Ventures and Principal at TiE Boston. Previously a General Partner and Head of Technology at Antler U.S., leading early-stage investments across the firm\'s decentralized venture model. MIT research background in infrared technology with over 10 years in tech startups and risk management.',
    initials: 'NS',
    image: '/speakers/navi-singh.jpg',
    isRevealed: true,
    panel: 'experienced',
  },
  {
    name: 'Jaspreet Singh',
    title: 'Private Equity Associate',
    organization: 'Blackstone',
    bio: 'Private Equity Associate at Blackstone Capital Partners. Previously an Investment Banking Analyst at Evercore in Liability Management & Restructuring and a Special Situations Analyst at APL Group covering real estate and digital infrastructure. Wharton School B.S. in Finance and Accounting, Summa Cum Laude.',
    initials: 'JS',
    image: '/speakers/jaspreet-singh.jpg',
    isRevealed: true,
    panel: 'earlyCareer',
  },
  {
    name: 'Jupneet Singh',
    title: 'MD Student, Harvard-MIT HST',
    organization: 'U.S. Air Force',
    bio: 'Harvard Medical School HST MD student and U.S. Air Force Second Lieutenant training to become a trauma surgeon. First female Air Force ROTC Rhodes Scholar; first woman in the Armed Forces to receive the Paul & Daisy Soros Fellowship. MIT B.S. in Chemistry; commanded ROTC Detachment 365, named best in the nation.',
    initials: 'JS',
    image: '/speakers/jupneet-singh.jpg',
    isRevealed: true,
    panel: 'earlyCareer',
  },
  {
    name: 'Avi Singh',
    title: 'Investment Banking Analyst, M&A',
    organization: 'J.P. Morgan',
    bio: 'M&A Investment Banking Analyst at J.P. Morgan. Previously a Summer Investment Associate at Citadel (L/S Equities, Consumer & TMT) and Summer Analyst at Enhanced Healthcare Partners. Duke University B.S. in Mathematics and Computer Science with a Finance minor.',
    initials: 'AS',
    image: '/speakers/avi-singh.jpg',
    isRevealed: true,
    panel: 'earlyCareer',
  },
  {
    name: 'Neelam Sandhu',
    title: 'J.D. Candidate & Davis Polk Fellow',
    organization: 'Columbia Law School',
    bio: 'J.D. Candidate at Columbia Law School and Davis Polk Leadership Fellow. Previously an Associate under Blackstone\'s General Counsel for four years; incoming Cravath Summer Associate. Yale College B.A. with Distinction in Global Affairs and History; Cambridge Pembroke-King\'s Programme, highest honors.',
    initials: 'NS',
    image: '/speakers/neelam-sandhu.jpg',
    isRevealed: true,
    panel: 'earlyCareer',
  },
]

export const agenda: AgendaBlock[] = [
  {
    time: '1:00 PM',
    title: 'Arrival & Registration',
    description: 'Check in, receive your name badge, and connect with attendees over chai.',
  },
  {
    time: '1:15 PM',
    title: 'Opening Remarks',
    description: 'Welcome address from the organizing committee and an overview of the afternoon.',
  },
  {
    time: '1:30 PM',
    title: 'Experienced Professionals Speaker Session',
    description: 'Presentations from leaders in finance, technology, medicine, and venture capital on building exceptional careers.',
  },
  {
    time: '2:30 PM',
    title: 'Networking Break & Dinner',
    description: 'Indian cuisine and structured networking to connect with peers from across the Ivy League.',
  },
  {
    time: '3:15 PM',
    title: 'Recent Graduates Speaker Session',
    description: 'Insights from early-career professionals navigating the transition from campus to career.',
  },
  {
    time: '3:45 PM',
    title: 'Networking Session',
    description: 'Open networking to build connections with fellow attendees, speakers, and sponsors.',
  },
  {
    time: '4:15 PM',
    title: 'Closing Remarks',
    description: 'Reflections on the day and next steps for building the Sikh Ivy League community.',
  },
  {
    time: '4:30 PM',
    title: 'Social',
    description: 'Casual gathering and continued conversation to close out the inaugural conference.',
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

export const overallSponsor = {
  name: 'SONY',
  fullName: 'Sikhs of New York',
}

export const sponsors: Sponsor[] = [
  {
    name: 'Rick Singh',
    title: 'Chief Growth Officer',
    organization: 'Fiserv',
  },
  {
    name: 'Manraj Singh',
    title: 'Founding Partner',
    organization: 'Vicus Ventures',
  },
  {
    name: 'GS Suri',
    title: 'Founding Engineer',
    organization: 'Tabs',
  },
  {
    name: 'Satwant Singh',
    title: 'SVP & Head of Monetization, DTC',
    organization: 'NBA',
  },
  {
    name: 'Harjap Singh',
    title: 'Investor',
    organization: 'Insight Partners',
  },
]
