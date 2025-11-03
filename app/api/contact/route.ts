import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In production, send email here using a service like SendGrid, Mailgun, etc.
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with email service
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `New contact form submission: ${subject}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
