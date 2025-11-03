import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { addPayment } from '@/lib/google-sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, paymentId, signature, courseId, courseName, email, amount } = body

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Payment verified - add to Google Sheets
    await addPayment({
      email,
      amount,
      orderId,
      paymentId,
      courseId,
      courseName,
    })

    console.log(`Payment verified for ${email} - Course: ${courseName}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payment verification error:', error)

    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
