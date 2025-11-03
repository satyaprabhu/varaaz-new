import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, currency = 'INR', courseId, email, name } = body

    if (!amount || !courseId || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `course_${courseId}_${Date.now()}`,
      notes: {
        courseId,
        email,
        name,
      },
    })

    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Razorpay order creation error:', error)

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
