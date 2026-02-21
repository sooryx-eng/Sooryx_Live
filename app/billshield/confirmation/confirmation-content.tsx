'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Gift, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import GlowingHeader from '@/app/components/GlowingHeader'

export default function ConfirmationContent() {
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || ''
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/30 px-4 py-8 md:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-green-100">
            <CheckCircle className="size-16 text-emerald-600" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-2xl backdrop-blur md:p-12"
        >
          <GlowingHeader as="h1" className="mb-4 text-center text-3xl md:text-4xl">
            We've Got Your Interest!
          </GlowingHeader>

          <p className="mb-8 text-center text-lg text-slate-600">
            Thank you for expressing interest in BillShield. Your spot in our solar capacity pool is reserved.
          </p>

          {/* Phone Confirmation */}
          {phone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8 flex items-center gap-3 rounded-xl bg-blue-50 p-4"
            >
              <Phone className="size-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-semibold">Registered phone number</p>
                <p className="text-blue-900 font-bold">{phone}</p>
              </div>
            </motion.div>
          )}

          {/* Free Credits Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8 rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Gift className="size-6 text-amber-600" />
              <h2 className="text-xl font-bold text-amber-900">Welcome Gift</h2>
            </div>
            <p className="text-lg text-amber-900 font-bold mb-2">
              ₹500 Solar Credits on Launch
            </p>
            <p className="text-sm text-amber-800">
              When BillShield goes live, ₹500 worth of solar-generated electricity will be instantly available in your account. Use it to reduce your first bills at no cost.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-8 space-y-4 rounded-2xl bg-slate-50 p-6"
          >
            <h3 className="font-bold text-slate-900">What Happens Next</h3>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-amber-200 font-bold text-amber-700 flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-slate-900">We pool solar capacity</p>
                  <p className="text-sm text-slate-600">Building our solar generation network</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-yellow-200 font-bold text-yellow-700 flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Early access opens</p>
                  <p className="text-sm text-slate-600">You'll be among the first to access BillShield</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-emerald-200 font-bold text-emerald-700 flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Start saving immediately</p>
                  <p className="text-sm text-slate-600">Use your ₹500 credits + buy more at 5-10% discount</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mb-8 grid gap-3 sm:grid-cols-2"
          >
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-700">✓ Limited spots reserved</p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-700">✓ No commitment needed</p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-700">✓ ₹500 free credits</p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-700">✓ Priority access</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/billshield" className="w-full block">
              <button className="w-full rounded-xl border-2 border-slate-300 py-3 font-bold text-slate-900 transition hover:border-amber-400 hover:bg-amber-50">
                Back to BillShield
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 text-center text-sm text-slate-600"
        >
          We'll send updates to <span className="font-semibold">{phone || 'your phone'}</span> as we get closer to launch.
        </motion.p>
      </div>
    </div>
  )
}
