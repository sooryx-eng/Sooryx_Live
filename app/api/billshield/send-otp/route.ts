import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { otpStore } from '@/lib/otpStore'

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
    const { phone } = body

    // Validation
    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    if (phone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
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

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP with 5-minute expiry
    otpStore.set(phone, otp, 5)

    // TODO: In production, send OTP via SMS service (Twilio, AWS SNS, etc.)
    // For development, return OTP in response
    console.log(`OTP for ${phone}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      otp, // Remove this in production
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
