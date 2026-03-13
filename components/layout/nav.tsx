'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig, navLinks } from '@/lib/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const resolveHref = (href: string) => {
    if (href.startsWith('#') && !isHome) return `/${href}`
    return href
  }

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-midnight/95 backdrop-blur-md border-b border-midnight-border'
          : isHome
          ? 'bg-transparent'
          : 'bg-midnight'
      }`}
    >
      <div className="container-custom flex items-center justify-between h-14 md:h-16">
        <Link
          href="/"
          className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-gold hover:text-gold-light transition-colors duration-300"
        >
          {siteConfig.shortName}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={resolveHref(link.href)}
              className="text-[0.8rem] text-white/55 hover:text-white/90 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/rsvp" className="btn-primary !py-2 !px-4 !text-[0.68rem]">
            RSVP
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70 p-2 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-midnight border-t border-midnight-border overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-white/55 hover:text-white/90 transition-colors py-3 border-b border-midnight-border"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/rsvp" onClick={() => setMobileOpen(false)} className="btn-primary mt-4 text-center">
                RSVP
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
