import { NextRequest, NextResponse } from 'next/server'
import { addBooking } from '@/lib/google-sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { name, email, date, time, topic, notes } = body

    // Validate required fields
    if (!name || !email || !date || !time || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add to Google Sheets
    await addBooking({
      name,
      email,
      date,
      time,
      topic,
      notes,
    })

    // In production, send confirmation email here
    console.log(`Booking request from ${name} (${email}) for ${date} at ${time}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Booking request submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking error:', error)

    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}
