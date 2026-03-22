'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { RefreshCw, LogOut, Download, Users, GraduationCap } from 'lucide-react'
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
  'Brown University': 'Brown',
  'Dartmouth College': 'Dartmouth',
  'Cornell University': 'Cornell',
}

export default function AdminPage() {
  const router = useRouter()
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)

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
        <div className="container-custom flex items-center justify-between h-14">
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

      <div className="container-custom py-8 md:py-12">
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
            <button
              onClick={downloadCSV}
              disabled={rsvps.length === 0}
              className="flex items-center gap-1.5 text-[0.72rem] bg-gold/10 hover:bg-gold/15 text-gold border border-gold/20 px-3 py-1.5 rounded-md transition-colors disabled:opacity-30"
            >
              <Download size={13} />
              Export CSV
            </button>
          </motion.div>

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
                      {['Name', 'Email', 'School', 'Year', 'Major', 'Dietary', 'Registered'].map((h) => (
                        <th key={h} className="px-4 py-3 text-[0.62rem] text-white/35 tracking-wider uppercase font-medium whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rsvps.map((r, i) => (
                      <tr
                        key={r.id}
                        className={`border-b border-midnight-border/50 hover:bg-white/[0.02] transition-colors ${
                          i % 2 === 0 ? '' : 'bg-white/[0.01]'
                        }`}
                      >
                        <td className="px-4 py-3 text-[0.82rem] text-white/90 whitespace-nowrap font-medium">
                          {r.full_name}
                        </td>
                        <td className="px-4 py-3 text-[0.78rem] text-white/55 whitespace-nowrap">
                          {r.email}
                        </td>
                        <td className="px-4 py-3 text-[0.78rem] text-white/70 whitespace-nowrap">
                          {SCHOOL_SHORT[r.school] ?? r.school}
                        </td>
                        <td className="px-4 py-3 text-[0.78rem] text-white/55 whitespace-nowrap">
                          {r.graduation_year}
                        </td>
                        <td className="px-4 py-3 text-[0.78rem] text-white/50">
                          {r.major ?? <span className="text-white/20 italic">—</span>}
                        </td>
                        <td className="px-4 py-3 text-[0.78rem] text-white/50">
                          {r.dietary_restrictions ? (
                            <span className="text-gold/70">{r.dietary_restrictions}</span>
                          ) : (
                            <span className="text-white/20 italic">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[0.72rem] text-white/30 whitespace-nowrap">
                          {new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
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
