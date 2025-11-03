# Varaaz - Quick Start Guide

Get your artist platform running in 5 minutes!

## 1️⃣ Install Dependencies (2 min)

```bash
cd varaaz-next
npm install
```

## 2️⃣ Set Up Environment (2 min)

```bash
# Copy example to actual env file
cp .env.local.example .env.local
```

Edit `.env.local`:
- For **testing without payments**: Leave `RAZORPAY_*` keys as placeholders
- For **testing with Calendly**: Add your Calendly path from settings
- For **Google Sheets integration**: Follow full setup in README.md

## 3️⃣ Run Development Server (1 min)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✨

## What You Get

✅ **Home page** with featured courses
✅ **Courses page** showing all courses
✅ **About page** with your story
✅ **Booking page** with Calendly + fallback form
✅ **Contact page** with message form
✅ **API endpoints** ready for integration

## Add Your First Course (30 seconds)

1. Create `content/courses/your-course.md`:

```markdown
---
slug: your-course
title: Your Course Name
description: Brief description
price: 2999
duration: 4 weeks
level: Beginner
---

## Course Overview

Your content here...
```

2. Refresh browser - **it's live!** 🚀

## Test Booking Form

The booking page works immediately:
- Click "Request Session"
- Fill form and submit
- Data saves locally (to Google Sheets if configured)
- Try "Use booking form instead" to test fallback

## Test Razorpay (Optional)

To test payment flow:

1. Get test credentials:
   - Sign up at [razorpay.com](https://razorpay.com)
   - Go to Dashboard → Settings → API Keys
   - Copy Key ID and Secret from **Test Mode**

2. Add to `.env.local`:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
   ```

3. Test payment with card: **4111 1111 1111 1111**

## Edit Content

All content is in `content/` folder:

```
content/
├── courses/        # Add your courses here
├── pages/          # Edit home.md, about.md
└── sessions/       # Add session offerings
```

Edit any `.md` file → Browser auto-updates!

## Deploy to Vercel (1 minute)

```bash
npm install -g vercel
vercel
```

Follow prompts, add env vars, and you're live! 🎉

## Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Changes not showing?**
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check console for errors

**Markdown not rendering?**
- Check file is in correct folder: `content/courses/` or `content/pages/`
- Verify frontmatter (YAML between `---`)
- Restart dev server

## Next Steps

- [ ] Customize colors in `tailwind.config.ts`
- [ ] Add your brand name/logo in `components/Header.tsx`
- [ ] Update home content in `content/pages/home.md`
- [ ] Add your courses in `content/courses/`
- [ ] Set up Razorpay for real payments
- [ ] Configure Google Sheets for data storage
- [ ] Deploy to Vercel

## File Quick Links

| What | Where |
|------|-------|
| Change colors | `tailwind.config.ts` |
| Edit home page | `content/pages/home.md` |
| Add courses | `content/courses/` |
| Edit header/nav | `components/Header.tsx` |
| Update footer | `components/Footer.tsx` |
| Add API routes | `app/api/` |

## Key Docs

- **Full Setup**: Read `README.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`
- **API Details**: Check route files in `app/api/`

---

**Having issues?** Check README.md Troubleshooting section or review comments in code files.

**Ready to customize?** Edit the files in the "File Quick Links" table above.

**Want to deploy?** Run `vercel` (requires Vercel account - it's free!)

Happy creating! 🎨
