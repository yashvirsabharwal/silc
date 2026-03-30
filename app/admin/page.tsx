'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { RefreshCw, LogOut, Download, Users, GraduationCap, Trash2, Pencil, X, Check, UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

type RSVP = {
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

const SCHOOL_SHORT: Record<string, string> = {
  'Harvard University': 'Harvard',
  'Yale University': 'Yale',
  'Princeton University': 'Princeton',
  'Columbia University': 'Columbia',
  'University of Pennsylvania': 'Penn',
  'Dartmouth College': 'Dartmouth',
  'Cornell University': 'Cornell',
}

export default function AdminPage() {
  const router = useRouter()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<RSVP>>({})
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addValues, setAddValues] = useState({ full_name: '', email: '', school: '', graduation_year: '', major: '', dietary_restrictions: '' })
  const [addError, setAddError] = useState('')

  const fetchRSVPs = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })
    setRsvps(data ?? [])
    setLastRefreshed(new Date())
    setLoading(false)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void fetchRSVPs() }, [fetchRSVPs])

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'School', 'Grad Year', 'Major', 'LinkedIn', 'Dietary Restrictions', 'Registered At']
    const rows = rsvps.map((r) => [
      r.full_name,
      r.email,
      r.school,
      r.graduation_year,
      r.major ?? '',
      r.linkedin_url ?? '',
      r.dietary_restrictions ?? '',
      new Date(r.created_at).toLocaleString(),
    ])
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `silc-rsvps-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const startEdit = (r: RSVP) => {
    setEditingId(r.id)
    setEditValues({
      full_name: r.full_name,
      email: r.email,
      school: r.school,
      graduation_year: r.graduation_year,
      major: r.major ?? '',
      dietary_restrictions: r.dietary_restrictions ?? '',
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValues({})
  }

  const saveEdit = async (id: string) => {
    setSaving(true)
    const { error } = await supabase
      .from('rsvps')
      .update({
        full_name: editValues.full_name,
        email: editValues.email,
        school: editValues.school,
        graduation_year: editValues.graduation_year,
        major: editValues.major || null,
        dietary_restrictions: editValues.dietary_restrictions || null,
      })
      .eq('id', id)
    if (!error) {
      setRsvps((prev) => prev.map((r) => r.id === id ? { ...r, ...editValues } as RSVP : r))
    }
    setEditingId(null)
    setEditValues({})
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('rsvps').delete().eq('id', id)
    if (!error) {
      setRsvps((prev) => prev.filter((r) => r.id !== id))
    }
    setDeletingId(null)
  }

  const handleAdd = async () => {
    if (!addValues.full_name || !addValues.email || !addValues.school || !addValues.graduation_year) {
      setAddError('Name, email, school, and graduation year are required.')
      return
    }
    setSaving(true)
    setAddError('')
    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        full_name: addValues.full_name,
        email: addValues.email,
        school: addValues.school,
        graduation_year: Number(addValues.graduation_year),
        major: addValues.major || null,
        dietary_restrictions: addValues.dietary_restrictions || null,
      })
      .select()
      .single()
    if (error) {
      setAddError(error.message)
    } else {
      setRsvps((prev) => [data, ...prev])
      setShowAddModal(false)
      setAddValues({ full_name: '', email: '', school: '', graduation_year: '', major: '', dietary_restrictions: '' })
    }
    setSaving(false)
  }

  // Stats
  const schoolCounts = rsvps.reduce<Record<string, number>>((acc, r) => {
    const short = SCHOOL_SHORT[r.school] ?? r.school
    acc[short] = (acc[short] ?? 0) + 1
    return acc
  }, {})

  const dietaryCount = rsvps.filter((r) => r.dietary_restrictions).length

  return (
    <main className="min-h-screen bg-midnight text-white">
      {/* Header */}
      <div className="border-b border-midnight-border">
        <div className="w-full px-6 md:px-10 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <span className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-gold">
              {siteConfig.shortName}
            </span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-[0.72rem] text-white/40">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchRSVPs}
              className="flex items-center gap-1.5 text-[0.72rem] text-white/40 hover:text-white/70 transition-colors"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-[0.72rem] text-white/40 hover:text-white/70 transition-colors"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 py-8 md:py-12">
        <motion.div variants={stagger} initial="hidden" animate="visible">

          {/* Stats row */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/[0.03] border border-midnight-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className="text-gold/70" />
                <p className="text-[0.62rem] text-white/35 tracking-wider uppercase font-medium">Total RSVPs</p>
              </div>
              <p className="text-3xl font-light text-white">{rsvps.length}</p>
            </div>
            <div className="bg-white/[0.03] border border-midnight-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap size={14} className="text-gold/70" />
                <p className="text-[0.62rem] text-white/35 tracking-wider uppercase font-medium">Schools</p>
              </div>
              <p className="text-3xl font-light text-white">{Object.keys(schoolCounts).length}</p>
            </div>
            <div className="bg-white/[0.03] border border-midnight-border rounded-lg p-5 col-span-2">
              <p className="text-[0.62rem] text-white/35 tracking-wider uppercase font-medium mb-3">By School</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {Object.entries(schoolCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([school, count]) => (
                    <span key={school} className="text-[0.75rem] text-white/60">
                      {school} <span className="text-gold">{count}</span>
                    </span>
                  ))}
                {Object.keys(schoolCounts).length === 0 && (
                  <span className="text-[0.75rem] text-white/25 italic">No RSVPs yet</span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Table header */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[0.9rem] text-white font-medium">Registrations</h2>
              {lastRefreshed && (
                <p className="text-[0.65rem] text-white/25 mt-0.5">
                  Last updated {lastRefreshed.toLocaleTimeString()}
                  {dietaryCount > 0 && ` · ${dietaryCount} dietary restriction${dietaryCount > 1 ? 's' : ''}`}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 text-[0.72rem] bg-white/[0.05] hover:bg-white/[0.08] text-white/70 border border-white/10 px-3 py-1.5 rounded-md transition-colors"
              >
                <UserPlus size={13} />
                Add
              </button>
              <button
                onClick={downloadCSV}
                disabled={rsvps.length === 0}
                className="flex items-center gap-1.5 text-[0.72rem] bg-gold/10 hover:bg-gold/15 text-gold border border-gold/20 px-3 py-1.5 rounded-md transition-colors disabled:opacity-30"
              >
                <Download size={13} />
                Export CSV
              </button>
            </div>
          </motion.div>

          {/* Add modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-midnight border border-midnight-border rounded-xl p-7 max-w-md w-full mx-4 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-medium">Add Registration</h3>
                  <button onClick={() => { setShowAddModal(false); setAddError('') }} className="text-white/30 hover:text-white/70 transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Full Name *', key: 'full_name', type: 'text', placeholder: 'e.g. Gurpreet Singh' },
                    { label: 'Email *', key: 'email', type: 'email', placeholder: 'e.g. gsingh@princeton.edu' },
                    { label: 'School *', key: 'school', type: 'text', placeholder: 'e.g. Princeton University' },
                    { label: 'Graduation Year *', key: 'graduation_year', type: 'number', placeholder: 'e.g. 2026' },
                    { label: 'Major', key: 'major', type: 'text', placeholder: 'e.g. Computer Science' },
                    { label: 'Dietary Restrictions', key: 'dietary_restrictions', type: 'text', placeholder: 'e.g. Vegetarian' },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[0.65rem] text-white/35 tracking-wider uppercase mb-1">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-[0.82rem] text-white placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                        value={addValues[key as keyof typeof addValues]}
                        onChange={(e) => setAddValues((v) => ({ ...v, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                  {addError && <p className="text-[0.75rem] text-red-400">{addError}</p>}
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="flex-1 bg-gold/15 hover:bg-gold/25 text-gold border border-gold/25 text-[0.78rem] py-2 rounded-lg transition-colors disabled:opacity-40"
                  >
                    {saving ? 'Saving…' : 'Add Registration'}
                  </button>
                  <button
                    onClick={() => { setShowAddModal(false); setAddError('') }}
                    className="flex-1 bg-white/[0.05] hover:bg-white/[0.08] text-white/60 text-[0.78rem] py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete confirm modal */}
          {deletingId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-midnight border border-midnight-border rounded-xl p-7 max-w-sm w-full mx-4 shadow-2xl">
                <h3 className="text-white font-medium mb-2">Remove this RSVP?</h3>
                <p className="text-[0.82rem] text-white/45 mb-6">
                  This will permanently delete{' '}
                  <span className="text-white/80">{rsvps.find((r) => r.id === deletingId)?.full_name}</span>{' '}
                  from the list.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDelete(deletingId)}
                    className="flex-1 bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/20 text-[0.78rem] py-2 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => setDeletingId(null)}
                    className="flex-1 bg-white/[0.05] hover:bg-white/[0.08] text-white/60 text-[0.78rem] py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <motion.div variants={fadeInUp} className="border border-midnight-border rounded-lg overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-white/30 text-sm">
                <RefreshCw size={16} className="animate-spin mr-2" /> Loading...
              </div>
            ) : rsvps.length === 0 ? (
              <div className="flex items-center justify-center py-16 text-white/30 text-sm">
                No RSVPs yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-midnight-border bg-white/[0.02]">
                      {['Name', 'Email', 'School', 'Year', 'Major', 'Dietary', 'Registered', ''].map((h) => (
                        <th key={h} className="px-4 py-3 text-[0.62rem] text-white/35 tracking-wider uppercase font-medium whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((r, i) => {
                      const isEditing = editingId === r.id
                      return (
                        <tr
                          key={r.id}
                          className={`border-b border-midnight-border/50 transition-colors ${
                            isEditing ? 'bg-gold/[0.04]' : i % 2 === 0 ? 'hover:bg-white/[0.02]' : 'bg-white/[0.01] hover:bg-white/[0.02]'
                          }`}
                        >
                          <td className="px-4 py-3 text-[0.82rem] whitespace-nowrap font-medium">
                            {isEditing ? (
                              <input
                                className="bg-white/[0.07] border border-white/15 rounded px-2 py-1 text-[0.8rem] text-white w-36"
                                value={editValues.full_name ?? ''}
                                onChange={(e) => setEditValues((v) => ({ ...v, full_name: e.target.value }))}
                              />
                            ) : (
                              <span className="text-white/90">{r.full_name}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-[0.78rem] whitespace-nowrap">
                            {isEditing ? (
                              <input
                                className="bg-white/[0.07] border border-white/15 rounded px-2 py-1 text-[0.8rem] text-white w-44"
                                value={editValues.email ?? ''}
                                onChange={(e) => setEditValues((v) => ({ ...v, email: e.target.value }))}
                              />
                            ) : (
                              <span className="text-white/55">{r.email}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-[0.78rem] text-white/70 whitespace-nowrap">
                            {isEditing ? (
                              <input
                                className="bg-white/[0.07] border border-white/15 rounded px-2 py-1 text-[0.8rem] text-white w-44"
                                value={editValues.school ?? ''}
                                onChange={(e) => setEditValues((v) => ({ ...v, school: e.target.value }))}
                              />
                            ) : (
                              SCHOOL_SHORT[r.school] ?? r.school
                            )}
                          </td>
                          <td className="px-4 py-3 text-[0.78rem] text-white/55 whitespace-nowrap">
                            {isEditing ? (
                              <input
                                type="number"
                                className="bg-white/[0.07] border border-white/15 rounded px-2 py-1 text-[0.8rem] text-white w-20"
                                value={editValues.graduation_year ?? ''}
                                onChange={(e) => setEditValues((v) => ({ ...v, graduation_year: Number(e.target.value) }))}
                              />
                            ) : (
                              r.graduation_year
                            )}
                          </td>
                          <td className="px-4 py-3 text-[0.78rem] text-white/50">
                            {isEditing ? (
                              <input
                                className="bg-white/[0.07] border border-white/15 rounded px-2 py-1 text-[0.8rem] text-white w-32"
                                value={editValues.major ?? ''}
                                onChange={(e) => setEditValues((v) => ({ ...v, major: e.target.value }))}
                              />
                            ) : (
                              r.major ?? <span className="text-white/20 italic">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-[0.78rem] text-white/50">
                            {isEditing ? (
                              <input
                                className="bg-white/[0.07] border border-white/15 rounded px-2 py-1 text-[0.8rem] text-white w-32"
                                value={editValues.dietary_restrictions ?? ''}
                                onChange={(e) => setEditValues((v) => ({ ...v, dietary_restrictions: e.target.value }))}
                              />
                            ) : r.dietary_restrictions ? (
                              <span className="text-gold/70">{r.dietary_restrictions}</span>
                            ) : (
                              <span className="text-white/20 italic">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-[0.72rem] text-white/30 whitespace-nowrap">
                            {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => saveEdit(r.id)}
                                  disabled={saving}
                                  className="p-1.5 rounded text-green-400 hover:bg-green-400/10 transition-colors disabled:opacity-40"
                                  title="Save"
                                >
                                  <Check size={13} />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="p-1.5 rounded text-white/40 hover:bg-white/10 transition-colors"
                                  title="Cancel"
                                >
                                  <X size={13} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => startEdit(r)}
                                  className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded text-white/60 hover:text-white/85 hover:bg-white/[0.06] transition-colors"
                                  title="Edit"
                                >
                                  <Pencil size={13} />
                                  <span className="text-[0.72rem]">Edit</span>
                                </button>
                                <button
                                  onClick={() => setDeletingId(r.id)}
                                  className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded text-white/60 hover:text-red-400 hover:bg-red-400/[0.08] transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={13} />
                                  <span className="text-[0.72rem]">Remove</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

        </motion.div>
      </div>
    </main>
  )
}
