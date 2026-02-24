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
    const { name, otp, state, accessToken } = body
    const phone = normalizeIndianPhone((body.phone as string) || '')

    // Validation
    if (!phone || !name || (!otp && !accessToken)) {
      return NextResponse.json(
        { error: 'Phone, name, and OTP/access token are required' },
        { status: 400 }
      )
    }

    if (phone.length !== 12) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
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

    const prismaClient = getPrismaClient()

    // Check if phone already exists (double-check)
    const existingSignup = await prismaClient.billShieldSignup.findUnique({
      where: { phone },
    })

    if (existingSignup) {
      return NextResponse.json(
        { 
          error: 'Phone number already registered',
          alreadySignedUp: true,
          phone: existingSignup.phone,
        },
        { status: 409 }
      )
    }

    // Create new signup with ₹500 welcome credits
    const signup = await prismaClient.billShieldSignup.create({
      data: {
        phone,
        name,
        state: state || 'Not Specified',
        credits: 500,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Signup successful',
        signup: {
          id: signup.id,
          name: signup.name,
          phone: signup.phone,
          credits: signup.credits,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Server error: ${message}` },
      { status: 500 }
    )
  }
}
