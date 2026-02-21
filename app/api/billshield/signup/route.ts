import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

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
    const { email, name, phone, state } = body

    // Validation
    if (!email || !name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const prismaClient = getPrismaClient()

    // Check if email already exists
    const existingSignup = await prismaClient.billShieldSignup.findUnique({
      where: { email },
    })

    if (existingSignup) {
      return NextResponse.json(
        { 
          error: 'Email already registered',
          alreadySignedUp: true,
          email: existingSignup.email,
        },
        { status: 409 }
      )
    }

    // Create new signup with ₹500 welcome credits
    const signup = await prismaClient.billShieldSignup.create({
      data: {
        email,
        name,
        phone,
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
          email: signup.email,
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
