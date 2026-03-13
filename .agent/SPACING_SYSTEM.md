# Spacing System Documentation

This document outlines the standardized spacing system used throughout the Sikh Ivy League Conference website.

## Spacing Scale

We use a consistent spacing scale based on multiples of 4px (Tailwind's base unit):

- **2** = 0.5rem (8px) - Micro spacing
- **4** = 1rem (16px) - Small spacing
- **6** = 1.5rem (24px) - Medium spacing  
- **8** = 2rem (32px) - Large spacing
- **12** = 3rem (48px) - Extra large spacing
- **16** = 4rem (64px) - Section spacing

## Component-Specific Spacing

### Section Headers
- Eyebrow to headline: `mb-4`
- Headline to description: `mb-6`
- Header to content below: `mt-16`

### Cards
- Uniform padding: `p-8`
- Icon/avatar to content: `mb-8`
- Title to body text: `mb-4`
- Quote to attribution: `mb-8`

### Grid Layouts
- Column gap: `gap-8`
- Row gap: `gap-8`
- Responsive: `gap-6 md:gap-8`

### Lists
- List item spacing: `space-y-2`
- Bullet to text: `mr-2`

### Sections
- Between major sections: `section-padding` utility (responsive: 4rem → 6rem → 8rem)
- Within section to grid: `mt-16`
- Content to CTA button: `mt-16`

### Navigation
- Nav items gap: `gap-8`
- Mobile menu items: `gap-4`
- Mobile menu padding: `py-6`

### Footer
- Grid gap: `gap-12 md:gap-8`
- Section titles to content: `mb-4`
- Between paragraphs: `mb-4` or `mb-8`
- Social icons gap: `gap-4`
- Separator margins: `my-12`

### Separators
- Standard vertical spacing: `my-16`
- Within dark sections: `my-16`
- In footer: `my-12`

## Color Usage

All custom colors are now defined using hex values for Tailwind v4 compatibility:

- **Deep Navy**: `#0F1419` - Primary dark background
- **Off White**: `#FAFAF7` - Primary light background & text
- **Saffron**: `#D4A574` - Accent color, highlights
- **Saffron Light**: `#E8CBAB` - Hover states
- **Near Black**: `#0A0A0B` - Text on light backgrounds

## Utilities

### Container
- `container-custom` - Max-width 80rem with responsive horizontal padding

### Section Padding
- `section-padding` - Responsive vertical padding (4rem/6rem/8rem)

### Typography
- `text-editorial` - Hero headlines with responsive sizing
- `text-display` - Section headlines with responsive sizing
- `text-eyebrow` - Small, uppercase labels with tracking

## Implementation Notes

1. **Consistency First**: Always use the standardized spacing values. Avoid one-off spacing.
2. **Responsive Approach**: Mobile gets smaller spacing, desktop gets larger (using md: and lg: breakpoints)
3. **Visual Hierarchy**: Larger spacing creates separation, smaller spacing groups related items
4. **Touch Targets**: Minimum 44px touch targets for mobile (p-2 = 8px padding gives ~40px total)
5. **Breathing Room**: Cards and sections have generous padding for premium feel

## Migration from Tailwind v3 → v4

All custom color classes have been migrated to use hex values:
- ❌ `bg-deep-navy` → ✅ `bg-[#0F1419]`
- ❌ `text-saffron` → ✅ `text-[#D4A574]`
- ❌ `hover:text-saffron-light` → ✅ `hover:text-[#E8CBAB]`

This ensures compatibility with Tailwind CSS v4's CSS-first configuration approach.
