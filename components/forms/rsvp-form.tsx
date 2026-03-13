'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ivyLeagueSchools, siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'
import type { RSVPFormData } from '@/lib/types'

const currentYear = new Date().getFullYear()
const graduationYears = Array.from({ length: 6 }, (_, i) => currentYear + i)

export function RSVPForm() {
  const [form, setForm] = useState<RSVPFormData>({
    full_name: '',
    email: '',
    school: '',
    graduation_year: currentYear,
    major: '',
    linkedin_url: '',
    dietary_restrictions: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field: keyof RSVPFormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const { error } = await supabase.from('rsvps').insert([{
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        school: form.school,
        graduation_year: form.graduation_year,
        major: form.major.trim() || null,
        linkedin_url: form.linkedin_url.trim() || null,
        dietary_restrictions: form.dietary_restrictions.trim() || null,
      }])

      if (error) {
        setErrorMsg(error.code === '23505'
          ? 'This email has already been registered. See you there!'
          : 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 md:p-12 text-center max-w-md mx-auto"
      >
        <CheckCircle2 className="w-10 h-10 text-gold mx-auto mb-5" strokeWidth={1.5} />
        <h3 className="text-display text-xl text-near-black mb-3">You&apos;re In</h3>
        <p className="text-[0.84rem] text-mid-gray mb-1">
          Your seat is reserved for {siteConfig.date}.
        </p>
        <p className="text-[0.84rem] text-mid-gray">
          We will email you shortly with more details.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="max-w-lg mx-auto"
    >
      <motion.div variants={fadeInUp} className="card p-6 md:p-8 space-y-5">
        <div>
          <label htmlFor="full_name" className="block text-[0.68rem] text-muted-foreground mb-1.5 tracking-wider uppercase font-medium">
            Full Name <span className="text-gold">*</span>
          </label>
          <input id="full_name" type="text" required value={form.full_name} onChange={(e) => update('full_name', e.target.value)}
            className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black placeholder:text-muted-foreground/40" placeholder="Your full name" />
        </div>

        <div>
          <label htmlFor="email" className="block text-[0.68rem] text-muted-foreground mb-1.5 tracking-wider uppercase font-medium">
            Email <span className="text-gold">*</span>
          </label>
          <input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
            className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black placeholder:text-muted-foreground/40" placeholder="your.email@university.edu" />
        </div>

        <div>
          <label htmlFor="school" className="block text-[0.68rem] text-muted-foreground mb-1.5 tracking-wider uppercase font-medium">
            School <span className="text-gold">*</span>
          </label>
          <select id="school" required value={form.school} onChange={(e) => update('school', e.target.value)}
            className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black appearance-none cursor-pointer">
            <option value="">Select your school</option>
            {ivyLeagueSchools.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="graduation_year" className="block text-[0.68rem] text-muted-foreground mb-1.5 tracking-wider uppercase font-medium">
              Grad Year <span className="text-gold">*</span>
            </label>
            <select id="graduation_year" required value={form.graduation_year} onChange={(e) => update('graduation_year', Number(e.target.value))}
              className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black appearance-none cursor-pointer">
              {graduationYears.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="major" className="block text-[0.68rem] text-muted-foreground mb-1.5 tracking-wider uppercase font-medium">
              Major / Field
            </label>
            <input id="major" type="text" value={form.major} onChange={(e) => update('major', e.target.value)}
              className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black placeholder:text-muted-foreground/40" placeholder="e.g. CS" />
          </div>
        </div>

        <div>
          <label htmlFor="linkedin_url" className="block text-[0.68rem] text-muted-foreground mb-1.5 tracking-wider uppercase font-medium">
            LinkedIn URL
          </label>
          <input id="linkedin_url" type="url" value={form.linkedin_url} onChange={(e) => update('linkedin_url', e.target.value)}
            className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black placeholder:text-muted-foreground/40" placeholder="https://linkedin.com/in/yourprofile" />
        </div>

        <div>
          <label htmlFor="dietary" className="block text-[0.68rem] text-muted-foreground mb-1.5 tracking-wider uppercase font-medium">
            Dietary Restrictions
          </label>
          <input id="dietary" type="text" value={form.dietary_restrictions} onChange={(e) => update('dietary_restrictions', e.target.value)}
            className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black placeholder:text-muted-foreground/40" placeholder="Vegetarian, vegan, allergies, etc." />
        </div>

        <AnimatePresence>
          {status === 'error' && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 p-3.5 rounded-md bg-destructive/5 border border-destructive/15">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-[0.8rem] text-destructive">{errorMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
          {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Reserving...</> : 'Reserve Your Seat'}
        </button>
      </motion.div>
    </motion.form>
  )
}
