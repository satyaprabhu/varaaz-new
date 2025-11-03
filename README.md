# Varaaz - Artist Course & Booking Platform

A modern, markdown-driven artist website built with **Next.js 14 (App Router)**, featuring integrated course management, secure Razorpay payments, and booking functionality with Calendly + fallback form.

## Features

✨ **Content Management**
- Markdown-based courses and pages
- Easy content updates without code changes
- Flexible metadata (frontmatter) for course details

🎨 **Modern Design**
- Built with Tailwind CSS
- Fully responsive (mobile, tablet, desktop)
- Custom color scheme for artist branding

💳 **Payment Integration**
- Razorpay payment gateway (test mode ready)
- Order creation and signature verification
- Payment logging to Google Sheets

📅 **Booking System**
- Embedded Calendly widget (primary)
- Fallback booking form (if Calendly unavailable)
- Google Sheets integration for booking records

🔧 **API Routes**
- `/api/book` - Save booking requests
- `/api/razorpay/create-order` - Create payment orders
- `/api/razorpay/verify` - Verify payment signatures
- `/api/contact` - Handle contact form submissions

## Project Structure

```
varaaz-next/
├── app/
│   ├── api/
│   │   ├── book/route.ts              # Booking submissions
│   │   ├── contact/route.ts           # Contact form
│   │   └── razorpay/
│   │       ├── create-order/route.ts  # Create Razorpay order
│   │       └── verify/route.ts        # Verify payment
│   ├── (pages)/
│   │   ├── about/page.tsx             # About page
│   │   ├── bookings/page.tsx          # Booking page
│   │   ├── contact/page.tsx           # Contact page
│   │   └── courses/page.tsx           # Courses list
│   ├── globals.css
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
├── components/
│   ├── BookingWidget.tsx              # Calendly + fallback form
│   ├── CourseCard.tsx                 # Course display card
│   ├── Footer.tsx                     # Footer component
│   └── Header.tsx                     # Navigation header
├── content/
│   ├── courses/
│   │   └── watercolor-basics.md       # Example course
│   ├── pages/
│   │   ├── about.md                   # About page content
│   │   └── home.md                    # Home page content
│   └── sessions/
│       └── 1-on-1-guidance.md         # Example session
├── lib/
│   ├── google-sheets.ts               # Google Sheets helper
│   └── posts.ts                       # Markdown file parsing
├── .env.local.example
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:

#### Razorpay Setup
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Switch to **Test Mode** (toggle top-right)
3. Copy your **Key ID** and **Key Secret** from Settings
4. Paste into `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`

#### Google Sheets Setup
1. Create a new Google Sheet for storing bookings/payments
2. Create a service account:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Go to "Service Accounts" (under "IAM & Admin")
   - Create new service account
   - Generate JSON key and extract:
     - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
     - `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (preserve newlines as `\n`)
3. Share your Google Sheet with the service account email
4. Get the sheet ID from the URL: `docs.google.com/spreadsheets/d/{SHEET_ID}/`
5. Paste into `GOOGLE_SHEET_ID`

#### Calendly Setup (Optional)
1. Create account at [calendly.com](https://calendly.com)
2. Get your calendar path from Embed settings
3. Paste into `NEXT_PUBLIC_CALENDLY_PATH` (format: `username/calendar-name`)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Content

### Add a New Course

Create a file in `content/courses/your-course.md`:

```markdown
---
slug: your-course
title: Course Title
description: Short description
price: 4999
duration: 4 weeks
level: Beginner
---

## Course Overview

Your course content here...
```

### Add a New Page

Create a file in `content/pages/your-page.md`:

```markdown
---
title: Page Title
description: Optional description
---

Your page content here...
```

### Update Home/About

Edit existing files:
- Home: `content/pages/home.md`
- About: `content/pages/about.md`

## API Integration

### Creating a Course Purchase

```javascript
// 1. Create order
const orderRes = await fetch('/api/razorpay/create-order', {
  method: 'POST',
  body: JSON.stringify({
    amount: 4999,
    courseId: 'watercolor-basics',
    courseName: 'Watercolor Basics',
    email: 'user@example.com',
    name: 'John Doe',
  }),
})

const { orderId } = await orderRes.json()

// 2. Show Razorpay checkout (use Razorpay.js library)
// 3. Verify payment on success with /api/razorpay/verify
```

### Creating a Booking

```javascript
const res = await fetch('/api/book', {
  method: 'POST',
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    date: '2024-12-15',
    time: '14:00',
    topic: 'fundamentals',
    notes: 'Looking to learn basics',
  }),
})
```

## Customization

### Change Brand Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'varaaz-primary': '#YOUR_COLOR',
      'varaaz-dark': '#YOUR_COLOR',
    },
  },
}
```

### Update Site Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
}
```

### Add Navigation Links

Edit `components/Header.tsx` to add/remove menu items.

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard matching `.env.local`.

## Testing Razorpay Payments

Use these test credentials (Razorpay provides in test mode):

- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date (12/25)
- **CVV**: Any 3 digits

## Troubleshooting

### Markdown not rendering
- Check file location: `content/{category}/{slug}.md`
- Verify frontmatter syntax (YAML between `---`)
- Restart dev server

### Google Sheets not working
- Verify service account email is sheet collaborator
- Check newlines in private key are escaped as `\n`
- Test credentials with: `npm run test:sheets` (if implemented)

### Razorpay errors
- Ensure you're in **Test Mode**
- Verify Key ID and Key Secret are correct
- Check signature verification logic

### Calendly embed not showing
- Set `NEXT_PUBLIC_CALENDLY_PATH` in `.env.local`
- Verify path format: `username/calendar-name`
- Check browser console for CORS errors

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: Markdown + gray-matter
- **Payments**: Razorpay
- **Bookings**: Calendly + Custom form
- **Data**: Google Sheets
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Next Steps

- [ ] Add email notifications (SendGrid/Mailgun)
- [ ] Implement user authentication (NextAuth.js)
- [ ] Add course video hosting (Vimeo/YouTube)
- [ ] Set up email templates
- [ ] Add analytics (Plausible/Fathom)
- [ ] Create admin dashboard for content management
- [ ] Add blog section
- [ ] Implement course progress tracking

## Support

For issues or questions:
1. Check troubleshooting section
2. Review environment variables setup
3. Consult API documentation above
4. Check console for error messages

## License

MIT - Feel free to use for personal or commercial projects.

---

Built with ❤️ for artists
