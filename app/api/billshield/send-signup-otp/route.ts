import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { normalizeIndianPhone, sendMsg91Otp } from '@/lib/msg91'

let prisma: PrismaClient | undefined

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const phoneInput = body.phone as string
    const validateOnly = Boolean(body.validateOnly)
    const phone = normalizeIndianPhone(phoneInput || '')

    // Validation
    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    if (phone.length !== 12) {
      return NextResponse.json(
        { error: 'Please enter a valid Indian phone number' },
        { status: 400 }
      )
    }

    // Check if phone is already registered
    const existingUser = await getPrismaClient().billShieldSignup.findUnique({
      where: { phone },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Phone number already registered', alreadySignedUp: true },
        { status: 400 }
      )
    }

    if (validateOnly) {
      return NextResponse.json({
        success: true,
        message: 'Phone number validated successfully',
      })
    }

    const sendResult = await sendMsg91Otp(phone)
    if (!sendResult.ok) {
      return NextResponse.json(
        { error: sendResult.error || 'Failed to send OTP' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
    })
  } catch (error) {
    console.error('Send signup OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
