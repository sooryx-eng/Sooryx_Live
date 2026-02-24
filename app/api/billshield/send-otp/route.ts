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

    // Check if user exists in the database
    const user = await getPrismaClient().billShieldSignup.findUnique({
      where: { phone },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Phone number not registered. Please sign up first.' },
        { status: 404 }
      )
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
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
