# Varaaz Project Structure

Complete file tree for the Next.js 14 artist platform.

```
varaaz-next/
│
├── 📁 app/                           # Next.js 14 App Router
│   ├── 📁 api/                       # API endpoints
│   │   ├── 📁 book/
│   │   │   └── route.ts              # POST /api/book - Save bookings
│   │   ├── 📁 contact/
│   │   │   └── route.ts              # POST /api/contact - Contact submissions
│   │   └── 📁 razorpay/
│   │       ├── 📁 create-order/
│   │       │   └── route.ts          # POST /api/razorpay/create-order
│   │       └── 📁 verify/
│   │           └── route.ts          # POST /api/razorpay/verify
│   │
│   ├── 📁 (pages)/                   # Route group for page organization
│   │   ├── 📁 about/
│   │   │   └── page.tsx              # /about route
│   │   ├── 📁 bookings/
│   │   │   └── page.tsx              # /bookings route
│   │   ├── 📁 contact/
│   │   │   └── page.tsx              # /contact route
│   │   └── 📁 courses/
│   │       └── page.tsx              # /courses route
│   │
│   ├── globals.css                   # Global Tailwind styles
│   ├── layout.tsx                    # Root layout wrapper
│   └── page.tsx                      # Home page (/ route)
│
├── 📁 components/                    # React components
│   ├── BookingWidget.tsx             # Calendly embed + fallback form
│   ├── CourseCard.tsx                # Course card component
│   ├── Footer.tsx                    # Footer navigation
│   └── Header.tsx                    # Header/navigation
│
├── 📁 content/                       # Markdown content (data)
│   ├── 📁 courses/
│   │   └── watercolor-basics.md      # Example course
│   ├── 📁 pages/
│   │   ├── about.md                  # About page content
│   │   └── home.md                   # Home page content
│   └── 📁 sessions/
│       └── 1-on-1-guidance.md        # Example session/booking
│
├── 📁 lib/                           # Utilities & helpers
│   ├── google-sheets.ts              # Google Sheets API integration
│   └── posts.ts                      # Markdown parsing (gray-matter)
│
├── 📄 .env.local.example             # Environment variables template
├── 📄 .gitignore                     # Git ignore rules
├── 📄 next.config.js                 # Next.js configuration
├── 📄 package.json                   # Dependencies & scripts
├── 📄 postcss.config.js              # PostCSS config (for Tailwind)
├── 📄 tailwind.config.ts             # Tailwind CSS configuration
├── 📄 tsconfig.json                  # TypeScript configuration
├── 📄 README.md                      # Setup & documentation
└── 📄 PROJECT_STRUCTURE.md           # This file
```

## Key Files Explained

### App Router Structure
- **page.tsx**: Route component (equivalent to pages/index.js)
- **layout.tsx**: Shared layout wrapper
- **route.ts**: API route handler
- **(pages)/**: Route group (optional, for organization)

### Content Files
All markdown files stored in `content/` directory:
- **Front Matter**: YAML between `---` markers (metadata)
- **Content**: Markdown below front matter
- Automatically parsed and converted to HTML

### Configuration Files
- **next.config.js**: Next.js settings
- **tailwind.config.ts**: Tailwind color/theme customization
- **tsconfig.json**: TypeScript compiler options
- **postcss.config.js**: CSS processing (Tailwind)

## Key Features by File

| Feature | Files |
|---------|-------|
| **Courses** | `app/courses/page.tsx`, `content/courses/*.md`, `components/CourseCard.tsx` |
| **Bookings** | `app/bookings/page.tsx`, `app/api/book/route.ts`, `components/BookingWidget.tsx` |
| **Payments** | `app/api/razorpay/*.ts`, `lib/google-sheets.ts` |
| **Markdown Content** | `content/**/*.md`, `lib/posts.ts` |
| **Styling** | `app/globals.css`, `tailwind.config.ts` |
| **Navigation** | `components/Header.tsx`, `components/Footer.tsx` |

## File Relationships

```
Home (/page.tsx)
├── Content from: content/pages/home.md
├── Uses: Header, Footer components
└── Links to: /courses, /bookings

Courses (/courses/page.tsx)
├── Reads: All files in content/courses/
├── Uses: CourseCard component
└── Shows: Parsed markdown courses

Bookings (/bookings/page.tsx)
├── Uses: BookingWidget component
├── Calls: /api/book (fallback form)
├── Embeds: Calendly iframe (if configured)
└── Writes to: Google Sheets

Payments
├── Frontend: Creates order with /api/razorpay/create-order
├── Razorpay: Processes payment
└── Backend: Verifies with /api/razorpay/verify
```

## API Endpoints

```
POST /api/book
├── Body: { name, email, date, time, topic, notes }
└── Action: Adds to Google Sheets

POST /api/razorpay/create-order
├── Body: { amount, courseId, email, name }
└── Returns: { orderId, amount, currency }

POST /api/razorpay/verify
├── Body: { orderId, paymentId, signature, ... }
└── Action: Verifies signature + logs to Google Sheets

POST /api/contact
├── Body: { name, email, subject, message }
└── Action: Logs submission (ready for email integration)
```

## Environment Variables

```
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=...
GOOGLE_SHEET_ID=...
NEXT_PUBLIC_CALENDLY_PATH=username/calendar-name (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL=your-email@example.com
```

## Development Flow

```
1. Add markdown file to content/
   └── File automatically parsed

2. Update page component
   └── Reads markdown via getPost() / getAllPosts()

3. Render with parsed HTML
   └── Browser displays styled content

4. API calls (booking, payment)
   └── route.ts handlers process request
   └── Google Sheets updated with data
```

## Build & Deploy

```
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run start    # Start production server
```

Deploy to Vercel:
```
vercel          # One-command deployment with env setup
```

---

Last Updated: November 2024
