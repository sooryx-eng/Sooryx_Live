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

export default function BillShieldUserPage() {
  const [user, setUser] = useState<BillShieldUser | null>(null)
  const [buyAmount, setBuyAmount] = useState(500)
  const [billAmount, setBillAmount] = useState(0)
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    if (!raw) {
      return
    }

    try {
      const parsed = JSON.parse(raw) as BillShieldUser
      setUser(parsed)
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
    window.location.href = '/billshield/login'
  }

  const handleBuyCredits = async () => {
    setLoadingCheckout(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: buyAmount }),
      })

      const data = await response.json()

      if (!response.ok || !data.url) {
        setError('Unable to start checkout right now. Please try again.')
        return
      }

      window.location.href = data.url
    } catch {
      setError('Unable to start checkout right now. Please try again.')
    } finally {
      setLoadingCheckout(false)
    }
  }

  const handlePayBill = () => {
    setError('')
    setMessage('')

    if (!user) {
      setError('Please sign in again.')
      return
    }

    const amount = Number(billAmount)
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Enter a valid utility bill amount.')
      return
    }

    if (amount > walletBalance) {
      setError('Insufficient wallet balance. Buy credits to continue.')
      return
    }

    const updatedUser: BillShieldUser = {
      ...user,
      credits: (walletBalance - amount).toFixed(2),
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser))
    setUser(updatedUser)
    setBillAmount(0)
    setMessage('Utility bill paid successfully from your wallet.')
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
            <input
              type="number"
              min={100}
              step={100}
              value={buyAmount}
              onChange={(e) => setBuyAmount(Number(e.target.value) || 0)}
              className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
            <button
              onClick={() => void handleBuyCredits()}
              disabled={loadingCheckout}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-bold text-white transition hover:shadow-lg disabled:opacity-50"
            >
              {loadingCheckout ? 'Starting Checkout...' : 'Buy Credits'}
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="size-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Pay Utility Bill</h2>
            </div>
            <p className="mb-4 text-sm text-slate-600">Pay your bill directly from wallet balance.</p>
            <input
              type="number"
              min={1}
              step={1}
              value={billAmount || ''}
              onChange={(e) => setBillAmount(Number(e.target.value) || 0)}
              placeholder="Enter bill amount"
              className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              onClick={handlePayBill}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 font-bold text-white transition hover:shadow-lg"
            >
              Pay Bill
            </button>
          </div>
        </div>

        {error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        {message && <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p>}
      </div>
    </div>
  )
}
