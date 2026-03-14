'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Lock } from 'lucide-react'
import { siteConfig } from '@/lib/content'
import { fadeInUp, stagger } from '@/lib/animations'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push(from)
      router.refresh()
    } else {
      setError('Invalid credentials.')
      setLoading(false)
    }
  }

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={handleSubmit}
      className="bg-white/[0.03] border border-midnight-border rounded-lg p-7 space-y-4"
    >
      <div>
        <label className="block text-[0.65rem] text-white/40 mb-1.5 tracking-wider uppercase font-medium">
          Username
        </label>
        <input
          type="text"
          required
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3.5 py-2.5 text-[0.85rem] bg-white/[0.05] border border-midnight-border rounded-md text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/10 transition-all"
          placeholder="Username"
        />
      </div>

      <div>
        <label className="block text-[0.65rem] text-white/40 mb-1.5 tracking-wider uppercase font-medium">
          Password
        </label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3.5 py-2.5 text-[0.85rem] bg-white/[0.05] border border-midnight-border rounded-md text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/10 transition-all"
          placeholder="Password"
        />
      </div>

      {error && <p className="text-[0.78rem] text-red-400/80">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-gold hover:bg-gold-light text-midnight text-[0.78rem] font-semibold tracking-wide uppercase rounded-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 size={14} className="animate-spin" /> Signing in...</> : 'Sign In'}
      </button>
    </motion.form>
  )
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm"
      >
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <p className="text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-gold mb-2">
            {siteConfig.shortName}
          </p>
          <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-midnight-border flex items-center justify-center mx-auto mb-4">
            <Lock size={14} className="text-white/40" />
          </div>
          <p className="text-[0.82rem] text-white/40">Admin access only</p>
        </motion.div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </motion.div>
    </main>
  )
}
