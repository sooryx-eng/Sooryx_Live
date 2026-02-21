'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import GlowingHeader from '@/app/components/GlowingHeader'

export default function BillShieldLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Placeholder for auth logic
      // For now, just validate fields
      if (!email || !password) {
        setError('Please fill in all fields')
        return
      }
      if (!email.includes('@')) {
        setError('Please enter a valid email')
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Redirect to dashboard or app
      window.location.href = '/app/dashboard'
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/30 px-4 py-8 md:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <Link href="/billshield" className="inline-block">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-emerald-100 px-4 py-2 text-sm font-semibold text-amber-700 transition"
          >
            ← Back to BillShield
          </motion.div>
        </Link>
        <GlowingHeader as="h1" className="mb-4 text-4xl font-bold md:text-5xl">
          Welcome Back
        </GlowingHeader>
        <p className="text-lg text-slate-600">Sign in to your BillShield account</p>
      </div>

      {/* Login Card */}
      <div className="mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-2xl backdrop-blur"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-amber-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-amber-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-xl bg-red-50 p-4"
              >
                <AlertCircle className="size-5 text-red-600" />
                <p className="text-sm font-semibold text-red-700">{error}</p>
              </motion.div>
            )}

            {/* Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-bold text-white transition hover:shadow-lg disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                disabled
                className="text-sm font-semibold text-slate-400 cursor-not-allowed"
              >
                Forgot Password? (Coming Soon)
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <p className="text-center text-slate-600">
              Don't have an account?{' '}
              <Link href="/billshield/signup" className="font-bold text-amber-600 transition hover:text-amber-700">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 space-y-4 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-yellow-50/50 p-6 backdrop-blur"
        >
          <h3 className="font-bold text-slate-900">What you can do:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-slate-700">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-200">
                <span className="text-sm font-bold text-emerald-700">✓</span>
              </div>
              Buy electricity units at bulk discounts
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-200">
                <span className="text-sm font-bold text-emerald-700">✓</span>
              </div>
              View your account balance & transaction history
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-200">
                <span className="text-sm font-bold text-emerald-700">✓</span>
              </div>
              Apply units to any electricity bill
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <div className="flex size-6 items-center justify-center rounded-full bg-emerald-200">
                <span className="text-sm font-bold text-emerald-700">✓</span>
              </div>
              Track savings in real-time
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
