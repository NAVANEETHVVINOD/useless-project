# 🚀 KANYA - QUICK START GUIDE
## Start Building in 30 Minutes

---

## 📋 PREREQUISITES CHECKLIST

Before you start, make sure you have:

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **Git** installed ([Download](https://git-scm.com/))
- [ ] **VS Code** or your preferred code editor ([Download](https://code.visualstudio.com/))
- [ ] **GitHub account** ([Sign up](https://github.com/))
- [ ] **Supabase account** ([Sign up](https://supabase.com/)) - Free tier
- [ ] **Stripe account** ([Sign up](https://stripe.com/)) - Test mode
- [ ] **Google Cloud account** (for Maps API) - Optional for MVP

---

## ⚡ 30-MINUTE SETUP

### Step 1: Create Next.js Project (5 minutes)

```bash
# Create new Next.js app
npx create-next-app@latest kanya

# Follow prompts:
✓ Would you like to use TypeScript? Yes
✓ Would you like to use ESLint? Yes
✓ Would you like to use Tailwind CSS? Yes
✓ Would you like to use `src/` directory? No
✓ Would you like to use App Router? Yes
✓ Would you like to customize the default import alias? No

# Navigate to project
cd kanya

# Open in VS Code
code .
```

---

### Step 2: Install Core Dependencies (3 minutes)

```bash
# Core dependencies
npm install @prisma/client @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zustand react-query framer-motion
npm install react-hook-form zod @hookform/resolvers
npm install stripe @stripe/stripe-js
npm install sharp

# UI components (Shadcn)
npx shadcn-ui@latest init

# Add essential components
npx shadcn-ui@latest add button input card dialog toast avatar dropdown-menu tabs slider

# Dev dependencies
npm install -D prisma @types/node
```

---

### Step 3: Set Up Supabase (10 minutes)

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Name: `kanya-production`
   - Database Password: Generate strong password (save it!)
   - Region: Choose closest to your users
   - Click "Create new project" (takes ~2 minutes)

2. **Get API Keys:**
   - Project Settings → API
   - Copy `Project URL` and `anon public` key

3. **Create `.env.local` file in project root:**

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# NextAuth
NEXTAUTH_SECRET=generate_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Stripe (test mode)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

---

### Step 4: Initialize Prisma (5 minutes)

```bash
# Initialize Prisma
npx prisma init
```

Create `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  firstName     String?
  lastName      String?
  isPremium     Boolean   @default(false)
  
  pets          Pet[]
  
  @@index([email])
}

model Pet {
  id            String    @id @default(cuid())
  ownerId       String
  owner         User      @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  
  name          String
  species       String
  breed         String
  birthday      DateTime
  gender        String
  size          String
  bio           String?
  photos        Json
  
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([ownerId])
  @@index([species])
}
```

Run migration:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### Step 5: Create Folder Structure (2 minutes)

```bash
# Create necessary folders
mkdir -p app/(app) app/(auth) app/api
mkdir -p components/ui components/layout components/discover components/onboarding
mkdir -p lib/supabase lib/prisma lib/validations lib/matching
mkdir -p hooks public/images
```

---

### Step 6: Set Up Supabase Client (5 minutes)

Create `lib/supabase/client.ts`:

```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => {
  return createClientComponentClient()
}
```

Create `lib/supabase/server.ts`:

```typescript
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}
```

Create `lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 🎨 CUSTOMIZE THEME

Update `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFE8E0',
          500: '#FF5004',
        },
        secondary: {
          DEFAULT: '#00B4D8',
          500: '#00B4D8',
        },
        accent: '#FFD60A',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## 🚀 RUN YOUR APP

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

---

## 📦 WHAT'S NEXT?

Follow the **Implementation Roadmap** to build:

### Week 1-2 (Sprint 1):
1. ✅ Project setup (Done!)
2. Build authentication UI
3. Create onboarding flow
4. Set up file uploads

### Week 3-4 (Sprint 2):
5. Pet profile creation
6. Photo management
7. Complete onboarding

### Week 5-6 (Sprint 3):
8. Discovery feed
9. Swiping mechanics
10. Matching algorithm

---

## 🎯 DEVELOPMENT TIPS

### Use Prisma Studio
```bash
npx prisma studio
# Opens at http://localhost:5555
```

### Git Best Practices
```bash
git init
git add .
git commit -m "Initial commit: Kanya MVP setup"
git remote add origin https://github.com/yourusername/kanya.git
git branch -M main
git push -u origin main
```

---

## 📚 USEFUL COMMANDS

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Create and apply migration
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema without migration

# Shadcn UI
npx shadcn-ui@latest add [component]  # Add new component
```

---

## 🐛 TROUBLESHOOTING

### Issue: Database connection error
**Solution:** Check your DATABASE_URL in .env.local matches Supabase settings

### Issue: Prisma Client not found
**Solution:** Run `npx prisma generate`

### Issue: Port 3000 already in use
**Solution:** Change port in package.json or kill the process

### Issue: Supabase auth not working
**Solution:** Ensure NEXT_PUBLIC_SUPABASE_URL and ANON_KEY are set correctly

---

## 📖 DOCUMENTATION LINKS

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Stripe Docs](https://stripe.com/docs)

---

## 🎉 YOU'RE READY TO BUILD!

You now have:
- ✅ Next.js 14 app with TypeScript
- ✅ Supabase authentication ready
- ✅ Database with Prisma
- ✅ UI components (Shadcn)
- ✅ TailwindCSS styling
- ✅ Project structure

**Next Step:** Open the **implementation-roadmap.md** and start with Sprint 1!

---

**Happy Coding! 🐾**

*Last Updated: January 2026*
