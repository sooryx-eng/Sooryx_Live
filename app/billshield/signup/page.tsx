'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Shield, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import GlowingHeader from '@/app/components/GlowingHeader'
import { initMsg91Widget, retryOtpWithMsg91, sendOtpWithMsg91, verifyOtpWithMsg91 } from '@/lib/msg91Widget'

export default function BillShieldSignup() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [success, setSuccess] = useState(false)
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

  useEffect(() => {
    if (otpSent) {
      return
    }

    initMsg91Widget('', 'msg91-captcha-signup').catch(() => undefined)
  }, [otpSent])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setLoading(true)

    try {
      // Validation
      if (!fullName || !phone) {
        setError('Please fill in all fields')
        return
      }
      if (phone.length < 10) {
        setError('Please enter a valid phone number')
        return
      }
      if (!agreed) {
        setError('Please agree to terms and conditions')
        return
      }

      const normalizedPhone = normalizePhoneForOtp(phone)
      if (!normalizedPhone) {
        setError('Please enter a valid Indian phone number')
        return
      }

      // Validate via API (duplicate signup check)
      const response = await fetch('/api/billshield/send-signup-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: normalizedPhone, validateOnly: true }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.alreadySignedUp) {
          setError('This phone number is already registered')
          return
        }
        setError(data.error || 'Failed to send OTP. Please try again.')
        return
      }

      const sendResult = await sendOtpWithMsg91(normalizedPhone, 'msg91-captcha-signup')
      if (!sendResult.ok) {
        const hasWidgetConfig = Boolean(
          process.env.NEXT_PUBLIC_MSG91_WIDGET_ID && process.env.NEXT_PUBLIC_MSG91_TOKEN_AUTH,
        )

        if (hasWidgetConfig) {
          setError(sendResult.error || 'Failed to send OTP. Please try again.')
          return
        }

        const fallbackResponse = await fetch('/api/billshield/send-signup-otp', {
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
      setSuccessMessage('OTP sent successfully!')
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validation
      if (!otp) {
        setError('Please enter the OTP')
        return
      }
      if (otp.length < 4 || otp.length > 8) {
        setError('Please enter a valid OTP (4-8 digits)')
        return
      }

      let tokenToSend = accessToken
      const verifyWidgetResult = await verifyOtpWithMsg91(otp, reqId || undefined)
      if (verifyWidgetResult.ok && verifyWidgetResult.accessToken) {
        tokenToSend = verifyWidgetResult.accessToken
        setAccessToken(verifyWidgetResult.accessToken)
        setReqId(verifyWidgetResult.reqId || reqId)
      }

      // Call API to register for early access with OTP verification
      const response = await fetch('/api/billshield/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          phone,
          otp,
          accessToken: tokenToSend || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.alreadySignedUp) {
          setError('This phone number is already registered for early access')
          setOtp('')
          return
        }
        setError(data.error || 'Signup failed. Please try again.')
        setOtp('')
        return
      }

      setSuccess(true)
      // Redirect to confirmation page with phone
      setTimeout(() => {
        window.location.href = `/billshield/confirmation?phone=${encodeURIComponent(phone)}`
      }, 1000)
    } catch (err) {
      setError('Signup failed. Please try again.')
      setOtp('')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/30 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="mx-auto mb-6 inline-flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-green-100"
          >
            <CheckCircle className="size-10 text-emerald-600" />
          </motion.div>
          <h2 className="mb-3 text-3xl font-bold text-slate-900">Account Created!</h2>
          <p className="mb-6 text-lg text-slate-600">Redirecting to confirmation...</p>
        </motion.div>
      </div>
    )
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
          Join BillShield
        </GlowingHeader>
        <p className="text-lg text-slate-600">Access digital solar. Save on every bill. Start today.</p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 inline-block rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 text-sm font-bold text-amber-700"
        >
          🎁 Get ₹500 Solar Credits on Signup
        </motion.div>
      </div>

      {/* Signup Card */}
      <div className="mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-2xl backdrop-blur"
        >
          {!otpSent ? (
            // Step 1: Enter details and send OTP
            <form onSubmit={handleSendOtp} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-amber-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Phone */}
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
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    disabled={loading}
                    className="size-5 rounded border-slate-300 accent-amber-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-slate-600">
                    I agree to the{' '}
                    <a href="#" className="font-semibold text-amber-600 hover:text-amber-700">
                      Terms & Conditions
                    </a>
                  </span>
                </label>
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
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-xl bg-green-50 p-4"
                >
                  <CheckCircle className="size-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-700">{successMessage}</p>
                </motion.div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Verification
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <div id="msg91-captcha-signup" className="mx-auto min-h-[78px] max-w-[320px] overflow-hidden" />
                </div>
              </div>

              {/* Send OTP Button */}
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Enter OTP
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-amber-500" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    placeholder="0000"
                    maxLength={8}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-center text-2xl font-bold tracking-widest text-slate-900 placeholder-slate-400 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:opacity-50"
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

              {/* Create Account Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-3 font-bold text-white transition hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>

              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  setError('')
                  setSuccessMessage('')
                  setLoading(true)
                  try {
                    const retryResult = await retryOtpWithMsg91(reqId || undefined)
                    if (!retryResult.ok) {
                      setError(retryResult.error || 'Failed to resend OTP. Please try again.')
                      return
                    }
                    setReqId(retryResult.reqId || reqId)
                    setSuccessMessage('OTP resent successfully!')
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
                  setSuccessMessage('')
                  setReqId('')
                  setAccessToken('')
                }}
                className="w-full text-sm font-semibold text-slate-600 hover:text-amber-600 transition"
              >
                Change Phone Number
              </button>
            </form>
          )}

          {/* Sign In Link */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <p className="text-center text-slate-600">
              Already have an account?{' '}
              <Link href="/billshield/login" className="font-bold text-amber-600 transition hover:text-amber-700">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          <div className="rounded-2xl bg-gradient-to-br from-amber-50/70 to-yellow-50/70 p-4 backdrop-blur">
            <h4 className="font-bold text-slate-900">☀️ Solar-Generated</h4>
            <p className="text-sm text-slate-600">5-10% cheaper than retail electricity</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50/70 to-green-50/70 p-4 backdrop-blur">
            <h4 className="font-bold text-slate-900">✨ No Lock-in</h4>
            <p className="text-sm text-slate-600">Use units anytime, no expiry date</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-blue-50/70 to-cyan-50/70 p-4 backdrop-blur">
            <h4 className="font-bold text-slate-900">📊 Instant Savings</h4>
            <p className="text-sm text-slate-600">See reduction on your next bill</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-purple-50/70 to-pink-50/70 p-4 backdrop-blur">
            <h4 className="font-bold text-slate-900">🔄 Any DISCOM</h4>
            <p className="text-sm text-slate-600">Works with all electricity providers</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
