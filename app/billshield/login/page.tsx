'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import GlowingHeader from '@/app/components/GlowingHeader'
import { retryOtpWithMsg91, sendOtpWithMsg91, verifyOtpWithMsg91 } from '@/lib/msg91Widget'

export default function BillShieldLogin() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [reqId, setReqId] = useState('')
  const [accessToken, setAccessToken] = useState('')

  const normalizePhoneForOtp = (value: string) => {
    const digits = value.replace(/\D/g, '')

    if (digits.length === 10) {
      return `91${digits}`
    }

    if (digits.length === 12 && digits.startsWith('91')) {
      return digits
    }

    return ''
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!phone) {
        setError('Please enter your phone number')
        return
      }
      if (phone.length < 10) {
        setError('Please enter a valid 10-digit phone number')
        return
      }

      const normalizedPhone = normalizePhoneForOtp(phone)
      if (!normalizedPhone) {
        setError('Please enter a valid Indian phone number')
        return
      }

      // Validate via API (registered user check)
      const response = await fetch('/api/billshield/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: normalizedPhone, validateOnly: true }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP. Please try again.')
        return
      }

      const sendResult = await sendOtpWithMsg91(normalizedPhone)
      if (!sendResult.ok) {
        const fallbackResponse = await fetch('/api/billshield/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phone: normalizedPhone }),
        })

        const fallbackData = await fallbackResponse.json()
        if (!fallbackResponse.ok) {
          setError(fallbackData.error || sendResult.error || 'Failed to send OTP. Please try again.')
          return
        }

        setReqId('')
      } else {
        setReqId(sendResult.reqId || '')
      }

      setPhone(normalizedPhone)
      setOtpSent(true)
      setSuccess('OTP sent successfully!')
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!otp) {
        setError('Please enter the OTP')
        return
      }
      if (otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP')
        return
      }

      let tokenToSend = accessToken
      const verifyWidgetResult = await verifyOtpWithMsg91(otp, reqId || undefined)
      if (verifyWidgetResult.ok && verifyWidgetResult.accessToken) {
        tokenToSend = verifyWidgetResult.accessToken
        setAccessToken(verifyWidgetResult.accessToken)
        setReqId(verifyWidgetResult.reqId || reqId)
      }

      // Call API to verify OTP
      const response = await fetch('/api/billshield/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp, accessToken: tokenToSend || undefined }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Invalid OTP. Please try again.')
        setOtp('')
        return
      }

      setSuccess('Login successful!')
      
      // Redirect to dashboard or BillShield page
      setTimeout(() => {
        window.location.href = '/billshield'
      }, 1000)
    } catch (err) {
      setError('Verification failed. Please try again.')
      setOtp('')
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
        <p className="text-lg text-slate-600">Sign in with your phone number</p>
      </div>

      {/* Login Card */}
      <div className="mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-2xl backdrop-blur"
        >
          {!otpSent ? (
            // Step 1: Enter phone number
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-amber-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
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

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-xl bg-green-50 p-4"
                >
                  <CheckCircle className="size-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-700">{success}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-bold text-white transition hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </motion.button>
            </form>
          ) : (
            // Step 2: Enter OTP
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Enter OTP
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-amber-500" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-center text-2xl font-bold tracking-widest text-slate-900 placeholder-slate-400 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  OTP sent to {phone}
                </p>
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

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-xl bg-green-50 p-4"
                >
                  <CheckCircle className="size-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-700">{success}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-bold text-white transition hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </motion.button>

              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  setError('')
                  setSuccess('')
                  setLoading(true)
                  try {
                    const retryResult = await retryOtpWithMsg91(reqId || undefined)
                    if (!retryResult.ok) {
                      setError(retryResult.error || 'Failed to resend OTP. Please try again.')
                      return
                    }
                    setReqId(retryResult.reqId || reqId)
                    setSuccess('OTP resent successfully!')
                  } catch {
                    setError('Failed to resend OTP. Please try again.')
                  } finally {
                    setLoading(false)
                  }
                }}
                className="w-full text-sm font-semibold text-slate-600 hover:text-amber-600 transition disabled:opacity-50"
              >
                Resend OTP
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpSent(false)
                  setOtp('')
                  setError('')
                  setSuccess('')
                  setReqId('')
                  setAccessToken('')
                }}
                className="w-full text-sm font-semibold text-slate-600 hover:text-amber-600 transition"
              >
                Change Phone Number
              </button>
            </form>
          )}

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
