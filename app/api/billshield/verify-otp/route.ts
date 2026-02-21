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
    const { phone, otp } = body

    // Validation
    if (!phone || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      )
    }

    if (otp.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid OTP format' },
        { status: 400 }
      )
    }

    // Check if OTP exists for this phone
    const stored = otpStore.get(phone)

    if (!stored) {
      return NextResponse.json(
        { error: 'Incorrect OTP. Please try again.' },
        { status: 400 }
      )
    }

    // Check if OTP is expired
    if (otpStore.isExpired(phone)) {
      otpStore.delete(phone)
      return NextResponse.json(
        { error: 'OTP expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Verify OTP
    if (stored.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 400 }
      )
    }

    // OTP is valid - clear it from store
    otpStore.delete(phone)

    // Get user data
    const user = await getPrismaClient().billShieldSignup.findUnique({
      where: { phone },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // In production, you would:
    // - Create a session token
    // - Set secure HTTP-only cookie
    // - Return user data

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        credits: user.credits.toString(),
      },
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}
