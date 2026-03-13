# Sikh Ivy League Conference Website

A premium, exclusive website for a one-day Sikh conference bringing together students from all eight Ivy League institutions in New York City.

## Overview

This Next.js application conveys quiet luxury, legacy, and polish while remaining welcoming and community-driven. The site optimizes for three primary conversions:
- **Apply / Request Invite** - For students
- **Partner/Sponsor** - For organizations
- **Attend (Members)** - For confirmed participants

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Fonts**: next/font (Cinzel serif + Inter sans-serif)
- **Animation**: Framer Motion (minimal, tasteful)

## Theme Documentation

### Visual Direction

The design follows a **"quiet luxury"** aesthetic inspired by editorial magazines, private members clubs, and museum-quality typography. The goal is exclusivity and sophistication without being flashy or gimmicky.

### Color Palette

```
Near-Black:     #0A0A0B  (primary text, dark backgrounds)
Deep Navy:      #0F1419  (hero backgrounds, footer)
Off-White:      #FAFAF7  (primary background, light text)
Saffron:        #D4A574  (accent color - used sparingly)
Saffron Light:  #E8CBAB  (hover states)
```

**Usage Guidelines**:
- **Near-black** and **off-white** form the primary text/background pairing
- **Deep navy** used for hero sections and footer to create depth
- **Saffron** is the signature accent - use sparingly for:
  - Call-to-action buttons
  - Hover states and highlights
  - Eyebrow text (small uppercase labels)
  - Icons and micro-interactions
- Avoid using saffron for large areas; it should feel precious

### Typography

**Serif (Cinzel)**:
- Headlines and display text
- Section titles
- Editorial feel
- Usage: `font-serif` class

**Sans-Serif (Inter)**:
- Body copy
- UI elements
- Navigation
- Forms
- Usage: `font-sans` class

**Utility Classes**:
- `.text-editorial` - Large hero headlines (5xl-7xl)
- `.text-display` - Section headlines (3xl-5xl)
- `.text-eyebrow` - Small uppercase labels with saffron color

### Layout Principles

1. **Generous Whitespace**: Don't crowd elements; let content breathe
2. **Strict Grid System**: Use Tailwind's grid utilities consistently
3. **Section Rhythm**: Alternate between background colors (off-white vs muted)
4. **Container Width**: Max-width of `max-w-7xl` for most content
5. **Section Padding**: Consistent vertical spacing with `section-padding` utility

### Visual Enhancements

**Grain Overlay**:
- Subtle noise texture applied globally via `.grain-overlay` class
- Creates premium, tactile feel
- Very low opacity (3%)

**Radial Gradients**:
- Used in hero sections and dark backgrounds
- Creates depth without being heavy-handed
- Applied via `.radial-gradient` and `.radial-gradient-dark` utilities

**Micro-Animations**:
- Fade-in: `animate-fade-in`
- Slide-up: `animate-slide-up`
- Slide-down: `animate-slide-down`
- Motion limited to 8-12px of movement
- Duration: 400-600ms
- Easing: ease-out

### Accessibility

- Semantic HTML5 elements throughout
- ARIA labels on interactive elements
- Keyboard navigation supported
- Focus states visible (saffron ring)
- Color contrast meets WCAG AA standards
- Heading hierarchy maintained

## Project Structure

```
sikh/
├── app/                      # Next.js app router pages
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Landing page
│   ├── about/
│   ├── program/
│   ├── apply/
│   ├── partners/
│   ├── faq/
│   └── contact/
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Nav, Footer
│   ├── sections/            # Landing page sections
│   ├── common/              # Reusable components
│   └── forms/               # Form components
├── lib/
│   ├── content.ts           # All site copy and data
│   ├── types.ts             # TypeScript interfaces
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Content Updates

All site content is centralized in `/lib/content.ts`. To update copy, testimonials, FAQ, or other text:

1. Open `/lib/content.ts`
2. Find the relevant section
3. Update the content
4. Changes will reflect immediately in dev mode

## Adding New Components

This project uses shadcn/ui components. To add a new component:

```bash
npx shadcn@latest add [component-name]
```

## Development Notes

### Forms

Both forms (Request Invite and Partner Inquiry) currently log to console on submit. In production, wire these up to your backend API or form service (e.g., Formspree, Netlify Forms, or custom API route).

### Images

Placeholder areas exist for:
- Hero background image
- Speaker/panelist photos

Replace these with actual photography when available.

### Animations

Animations are intentionally minimal and tasteful. If adding more:
- Keep movement to 8-12px
- Use 400-600ms duration
- Apply ease-out easing
- Ensure they enhance, not distract

## Design Philosophy

This site embodies "quiet luxury":
- **Confidence without arrogance**: Selective but not elitist
- **Premium without pretense**: High-quality design, accessible tone
- **Legacy-focused**: Building institutions, not just events
- **Culturally respectful**: Honors Sikh values and traditions
- **Community-driven**: Individual achievement meets collective purpose

## Performance

- Next.js automatic code splitting
- Font optimization via next/font
- Minimal JavaScript (most components are server-side)
- Lighthouse score target: 90+ across all metrics

## Deployment

This is a standard Next.js application. Deploy to:
- **Vercel** (recommended, zero-config)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

All rights reserved.

---

Built with care for the Sikh Ivy League community.
