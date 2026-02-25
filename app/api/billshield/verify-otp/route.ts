import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { normalizeIndianPhone, verifyMsg91AccessToken, verifyMsg91Otp } from '@/lib/msg91'

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
    const otp = body.otp as string
    const accessToken = body.accessToken as string | undefined
    const phone = normalizeIndianPhone((body.phone as string) || '')

    console.log('Verify OTP - Phone before normalization:', body.phone)
    console.log('Verify OTP - Phone after normalization:', phone)

    // Validation
    if (!phone || (!otp && !accessToken)) {
      console.log('Verify OTP - Missing phone or otp/accessToken')
      return NextResponse.json(
        { error: 'Phone number and OTP/access token are required' },
        { status: 400 }
      )
    }

    if (otp && (otp.length < 4 || otp.length > 8)) {
      return NextResponse.json(
        { error: 'Invalid OTP format' },
        { status: 400 }
      )
    }

    if (accessToken) {
      const tokenVerifyResult = await verifyMsg91AccessToken(String(accessToken))
      if (!tokenVerifyResult.ok) {
        return NextResponse.json(
          { error: tokenVerifyResult.error || 'OTP verification failed. Please try again.' },
          { status: 400 }
        )
      }
    } else if (otp) {
      const verifyResult = await verifyMsg91Otp(phone, otp)
      if (!verifyResult.ok) {
        return NextResponse.json(
          { error: verifyResult.error || 'Invalid OTP. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Get user data
    console.log('Verify OTP - Looking up user with phone:', phone)
    const user = await getPrismaClient().billShieldSignup.findUnique({
      where: { phone },
    })

    console.log('Verify OTP - User lookup result:', user ? 'Found' : 'Not found')

    if (!user) {
      console.error('Verify OTP - User not found for phone:', phone)
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
