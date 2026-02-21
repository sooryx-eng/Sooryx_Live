'use client'

import { Suspense } from 'react'
import ConfirmationContent from './confirmation-content'

export default function BillShieldConfirmation() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-amber-50/30 to-emerald-50/30"><p className="text-slate-600">Loading...</p></div>}>
      <ConfirmationContent />
    </Suspense>
  )
}

