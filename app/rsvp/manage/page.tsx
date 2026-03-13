'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle, Pencil, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ivyLeagueSchools } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

type RSVPRecord = {
  id: string
  full_name: string
  email: string
  school: string
  graduation_year: number
  major: string | null
  linkedin_url: string | null
  dietary_restrictions: string | null
  created_at: string
}

const currentYear = new Date().getFullYear()
const graduationYears = Array.from({ length: 6 }, (_, i) => currentYear + i)

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-[0.63rem] text-mid-gray tracking-wider uppercase font-medium mb-1">{label}</p>
      <p className="text-[0.88rem] text-near-black">
        {value || <span className="text-mid-gray/60 italic text-[0.82rem]">Not provided</span>}
      </p>
    </div>
  )
}

export default function ManageRSVPPage() {
  const [email, setEmail] = useState('')
  const [lookupStatus, setLookupStatus] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle')
  const [record, setRecord] = useState<RSVPRecord | null>(null)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<RSVPRecord>>({})
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLookupStatus('loading')
    const { data } = await supabase
      .from('rsvps')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (data) {
      setRecord(data)
      setEditForm(data)
      setLookupStatus('found')
    } else {
      setLookupStatus('not_found')
    }
  }

  const handleSave = async () => {
    if (!record) return
    setSaveStatus('saving')
    const { error } = await supabase
      .from('rsvps')
      .update({
        full_name: editForm.full_name,
        school: editForm.school,
        graduation_year: editForm.graduation_year,
        major: editForm.major || null,
        linkedin_url: editForm.linkedin_url || null,
        dietary_restrictions: editForm.dietary_restrictions || null,
      })
      .eq('id', record.id)

    if (error) {
      setSaveStatus('error')
    } else {
      setRecord({ ...record, ...editForm } as RSVPRecord)
      setSaveStatus('saved')
      setEditing(false)
      setTimeout(() => setSaveStatus('idle'), 2000)
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="bg-midnight pb-16 pt-24 md:pt-28">
        <div className="container-custom">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeInUp} className="mb-7">
              <Link href="/rsvp" className="inline-flex items-center gap-1.5 text-[0.75rem] text-white/40 hover:text-white/70 transition-colors">
                <ArrowLeft size={13} /> Back to RSVP
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="accent-line mb-6" />
            <motion.p variants={fadeInUp} className="text-eyebrow mb-4">Manage Registration</motion.p>
            <motion.h1 variants={fadeInUp} className="text-editorial text-2xl md:text-3xl text-white">
              Update Your RSVP
            </motion.h1>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-lg mx-auto">
          {lookupStatus !== 'found' && (
            <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleLookup} className="card p-6 md:p-8 space-y-5">
              <div>
                <label htmlFor="lookup_email" className="block text-[0.67rem] text-mid-gray mb-1.5 tracking-wider uppercase font-medium">
                  Your Email Address
                </label>
                <input id="lookup_email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black placeholder:text-mid-gray/40"
                  placeholder="email you registered with" />
              </div>
              <AnimatePresence>
                {lookupStatus === 'not_found' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2.5 p-3.5 rounded-md bg-destructive/5 border border-destructive/15">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <p className="text-[0.8rem] text-destructive">No registration found for that email.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button type="submit" disabled={lookupStatus === 'loading'} className="btn-primary w-full disabled:opacity-50">
                {lookupStatus === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Looking up...</> : 'Find My Registration'}
              </button>
            </motion.form>
          )}

          <AnimatePresence>
            {lookupStatus === 'found' && record && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[0.8rem] text-mid-gray">
                    <CheckCircle2 size={14} className="text-gold" />
                    Registered
                  </div>
                  {!editing && (
                    <button onClick={() => { setEditing(true); setEditForm(record) }}
                      className="inline-flex items-center gap-1.5 text-[0.75rem] text-near-black hover:text-gold transition-colors">
                      <Pencil size={12} /> Edit
                    </button>
                  )}
                </div>

                {!editing ? (
                  <div className="space-y-4">
                    <Field label="Full Name" value={record.full_name} />
                    <div className="divider" />
                    <Field label="Email" value={record.email} />
                    <div className="divider" />
                    <Field label="School" value={record.school} />
                    <div className="divider" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Graduation Year" value={String(record.graduation_year)} />
                      <Field label="Major" value={record.major} />
                    </div>
                    <div className="divider" />
                    <Field label="LinkedIn" value={record.linkedin_url} />
                    <div className="divider" />
                    <Field label="Dietary Restrictions" value={record.dietary_restrictions} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[0.65rem] text-mid-gray mb-1.5 tracking-wider uppercase font-medium">Full Name</label>
                      <input type="text" value={editForm.full_name || ''} onChange={(e) => setEditForm(p => ({ ...p, full_name: e.target.value }))}
                        className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black" />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] text-mid-gray mb-1.5 tracking-wider uppercase font-medium">School</label>
                      <select value={editForm.school || ''} onChange={(e) => setEditForm(p => ({ ...p, school: e.target.value }))}
                        className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black appearance-none">
                        {ivyLeagueSchools.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[0.65rem] text-mid-gray mb-1.5 tracking-wider uppercase font-medium">Grad Year</label>
                        <select value={editForm.graduation_year || currentYear} onChange={(e) => setEditForm(p => ({ ...p, graduation_year: Number(e.target.value) }))}
                          className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black appearance-none">
                          {graduationYears.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[0.65rem] text-mid-gray mb-1.5 tracking-wider uppercase font-medium">Major</label>
                        <input type="text" value={editForm.major || ''} onChange={(e) => setEditForm(p => ({ ...p, major: e.target.value }))}
                          className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black" placeholder="e.g. CS" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.65rem] text-mid-gray mb-1.5 tracking-wider uppercase font-medium">LinkedIn URL</label>
                      <input type="url" value={editForm.linkedin_url || ''} onChange={(e) => setEditForm(p => ({ ...p, linkedin_url: e.target.value }))}
                        className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] text-mid-gray mb-1.5 tracking-wider uppercase font-medium">Dietary Restrictions</label>
                      <input type="text" value={editForm.dietary_restrictions || ''} onChange={(e) => setEditForm(p => ({ ...p, dietary_restrictions: e.target.value }))}
                        className="form-input w-full px-3.5 py-2.5 text-[0.85rem] text-near-black" placeholder="Vegetarian, vegan, allergies..." />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button onClick={handleSave} disabled={saveStatus === 'saving'} className="btn-primary flex-1 disabled:opacity-50">
                        {saveStatus === 'saving' ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                          : saveStatus === 'saved' ? <><Check className="w-4 h-4" /> Saved</>
                          : 'Save Changes'}
                      </button>
                      <button onClick={() => setEditing(false)} className="btn-secondary px-5">Cancel</button>
                    </div>
                    {saveStatus === 'error' && <p className="text-[0.8rem] text-destructive">Something went wrong. Please try again.</p>}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
