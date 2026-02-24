'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, LogOut, Wallet, Zap } from 'lucide-react'

type BillShieldUser = {
  id: string
  name: string
  phone: string
  credits: string | number
}

const USER_STORAGE_KEY = 'billshieldUser'
const FLOW_STORAGE_KEY = 'billshieldFlow'

export default function BillShieldUserPage() {
  const [user, setUser] = useState<BillShieldUser | null>(null)
  const [entryFlow, setEntryFlow] = useState<'signup' | 'signin'>('signin')

  useEffect(() => {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    if (!raw) {
      return
    }

    try {
      const parsed = JSON.parse(raw) as BillShieldUser
      setUser(parsed)

      const flow = localStorage.getItem(FLOW_STORAGE_KEY)
      if (flow === 'signup' || flow === 'signin') {
        setEntryFlow(flow)
      }
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }, [])

  const walletBalance = useMemo(() => {
    if (!user) {
      return 0
    }

    const value = Number(user.credits)
    return Number.isFinite(value) ? value : 0
  }, [user])

  const handleSignOut = () => {
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(FLOW_STORAGE_KEY)
    window.location.href = '/billshield/login'
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/30 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200/70 bg-white/90 p-8 text-center shadow-2xl backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900">Sign in required</h1>
          <p className="mt-3 text-slate-600">Please sign in to access your BillShield wallet.</p>
          <Link
            href="/billshield/login"
            className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-3 font-semibold text-white"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/30 px-4 py-8 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">BillShield Wallet</p>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Hi, {user.name}</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl"
        >
          <div className="mb-4 rounded-xl bg-gradient-to-r from-amber-50 to-emerald-50 px-4 py-3">
            <p className="text-lg font-bold text-slate-900">
              {entryFlow === 'signup' ? 'Account Created!' : 'Welcome to your dashboard'}
            </p>
            <p className="text-sm text-slate-600">
              {entryFlow === 'signup'
                ? 'Your signup is complete and your BillShield account is ready.'
                : 'You are signed in successfully.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 p-3">
              <Wallet className="size-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Wallet Balance</p>
              <p className="text-3xl font-black text-slate-900">₹{walletBalance.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="size-5 text-amber-600" />
              <h2 className="text-xl font-bold text-slate-900">Buy Credits</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600">Add solar credits to your wallet.</p>
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
              Coming Soon
            </div>
            <button
              disabled
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-bold text-white transition hover:shadow-lg disabled:opacity-50"
            >
              Buy Credits (Coming Soon)
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="size-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Pay Utility Bill</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600">Pay your bill directly from wallet balance.</p>
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Coming Soon
            </div>
            <button
              disabled
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 font-bold text-white transition hover:shadow-lg"
            >
              Pay Utility Bill (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
