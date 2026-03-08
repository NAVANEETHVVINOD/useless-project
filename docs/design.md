# 🐾 KANYA - Technical Design Document

## 🏗️ TECHNOLOGY STACK

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5.0+
- **Styling:** TailwindCSS 3.4+
- **UI Components:** Shadcn UI + Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand + React Query (TanStack Query)
- **Forms:** React Hook Form + Zod validation
- **Image Handling:** Sharp.js for compression

### Backend
- **API:** Next.js API Routes (REST + tRPC)
- **Database:** PostgreSQL 15+ (Supabase)
- **ORM:** Prisma 5.0+
- **File Storage:** Supabase Storage (S3-compatible)
- **CDN:** Cloudflare for images
- **Authentication:** Supabase Auth (JWT-based)
- **Real-time:** Supabase Realtime (WebSockets)

### External Services
- **Maps & Geolocation:** Google Maps API / Mapbox
- **Payments:** Stripe (Checkout + Webhooks)
- **Email:** Resend / SendGrid
- **SMS:** Twilio (optional)
- **Image Moderation:** AWS Rekognition
- **Push Notifications:** Firebase Cloud Messaging

### Deployment & DevOps
- **Hosting:** Vercel (Frontend + API)
- **Database:** Supabase Cloud
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry + Vercel Analytics
- **Testing:** Jest + Playwright

---

## 🗄️ DATABASE SCHEMA (Complete)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ============================================
// USER & AUTHENTICATION
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  phone         String?   @unique
  emailVerified Boolean   @default(false)
  phoneVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Profile
  firstName     String?
  lastName      String?
  location      Json?     // { lat, lng, city, state, country }
  
  // Settings
  preferences   Json?     // User preferences JSON
  isPremium     Boolean   @default(false)
  premiumTier   String?   // "plus" | "platinum"
  premiumExpiry DateTime?
  
  // Relations
  pets          Pet[]
  swipes        Swipe[]
  matches       Match[]   @relation("UserMatches")
  messages      Message[]
  reports       Report[]  @relation("Reporter")
  blockedUsers  Block[]   @relation("Blocker")
  
  // Metadata
  lastActiveAt  DateTime  @default(now())
  isDeleted     Boolean   @default(false)
  
  @@index([email])
  @@index([phone])
}

// ============================================
// PET PROFILES
// ============================================

model Pet {
  id            String    @id @default(cuid())
  ownerId       String
  owner         User      @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  
  // Basic Info
  name          String
  species       String    // "dog" | "cat" | "bird" | "rabbit" | "other"
  breed         String
  birthday      DateTime
  gender        String    // "male" | "female" | "neutered" | "spayed"
  size          String    // "small" | "medium" | "large" | "giant"
  
  // Profile
  bio           String?   @db.Text
  photos        Json      // Array of photo URLs
  personality   Json?     // Array of personality traits
  
  // Computed
  age           Int?      // Calculated from birthday
  zodiacSign    String?   // For horoscope feature
  
  // Status
  isActive      Boolean   @default(true)
  isVerified    Boolean   @default(false)
  
  // Stats
  swipeCount    Int       @default(0)
  matchCount    Int       @default(0)
  popularityScore Float   @default(0)
  
  // Relations
  swipes        Swipe[]
  matches       Match[]   @relation("PetMatches")
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([ownerId])
  @@index([species])
  @@index([isActive])
}

// ============================================
// SWIPING & MATCHING
// ============================================

model Swipe {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  petId       String
  pet         Pet       @relation(fields: [petId], references: [id], onDelete: Cascade)
  
  // Swipe data
  direction   String    // "left" | "right" | "super"
  targetPetId String    // The pet being swiped on
  
  // Location at time of swipe (for distance filtering)
  location    Json?
  
  createdAt   DateTime  @default(now())
  
  @@unique([petId, targetPetId]) // Prevent duplicate swipes
  @@index([userId])
  @@index([petId])
  @@index([targetPetId])
}

model Match {
  id          String    @id @default(cuid())
  pet1Id      String
  pet1        Pet       @relation("PetMatches", fields: [pet1Id], references: [id], onDelete: Cascade)
  pet2Id      String
  user1Id     String
  user1       User      @relation("UserMatches", fields: [user1Id], references: [id], onDelete: Cascade)
  user2Id     String
  
  // Match metadata
  matchedAt   DateTime  @default(now())
  expiresAt   DateTime? // For non-premium users
  isSuperLike Boolean   @default(false)
  
  // Status
  isActive    Boolean   @default(true)
  unmatched   Boolean   @default(false)
  unmatchedBy String?
  
  // Relations
  messages    Message[]
  
  @@unique([pet1Id, pet2Id])
  @@index([user1Id])
  @@index([user2Id])
  @@index([isActive])
}

// ============================================
// MESSAGING
// ============================================

model Message {
  id          String    @id @default(cuid())
  matchId     String
  match       Match     @relation(fields: [matchId], references: [id], onDelete: Cascade)
  senderId    String
  sender      User      @relation(fields: [senderId], references: [id], onDelete: Cascade)
  
  // Content
  content     String    @db.Text
  type        String    @default("text") // "text" | "image" | "video"
  mediaUrl    String?
  
  // Status
  isRead      Boolean   @default(false)
  readAt      DateTime?
  isDeleted   Boolean   @default(false)
  
  createdAt   DateTime  @default(now())
  
  @@index([matchId])
  @@index([senderId])
  @@index([createdAt])
}

// ============================================
// SAFETY & MODERATION
// ============================================

model Report {
  id          String    @id @default(cuid())
  reporterId  String
  reporter    User      @relation("Reporter", fields: [reporterId], references: [id])
  
  // What's being reported
  reportType  String    // "user" | "pet" | "message" | "photo"
  targetId    String    // ID of reported entity
  
  // Report details
  reason      String    // Category
  description String?   @db.Text
  
  // Status
  status      String    @default("pending") // "pending" | "reviewed" | "resolved" | "dismissed"
  reviewedBy  String?
  reviewedAt  DateTime?
  
  createdAt   DateTime  @default(now())
  
  @@index([reporterId])
  @@index([targetId])
  @@index([status])
}

model Block {
  id          String    @id @default(cuid())
  blockerId   String
  blocker     User      @relation("Blocker", fields: [blockerId], references: [id])
  blockedId   String
  
  reason      String?
  createdAt   DateTime  @default(now())
  
  @@unique([blockerId, blockedId])
  @@index([blockerId])
  @@index([blockedId])
}

// ============================================
// PREMIUM & PAYMENTS
// ============================================

model Subscription {
  id          String    @id @default(cuid())
  userId      String
  
  // Stripe data
  stripeCustomerId      String  @unique
  stripeSubscriptionId  String  @unique
  stripePriceId         String
  
  // Subscription details
  tier        String    // "plus" | "platinum"
  status      String    // "active" | "canceled" | "past_due"
  
  // Dates
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean  @default(false)
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([userId])
  @@index([stripeCustomerId])
}

model DailyLimits {
  id          String    @id @default(cuid())
  userId      String    @unique
  date        DateTime  @default(now())
  
  // Counters
  swipesUsed      Int @default(0)
  superLikesUsed  Int @default(0)
  boostsUsed      Int @default(0)
  
  @@index([userId, date])
}
```

---

## 🎨 ARCHITECTURE PATTERNS

### Frontend Architecture

```
app/
├── (public)/           # Public routes (no auth)
│   ├── page.tsx       # Landing page
│   └── about/
├── (auth)/            # Auth routes
│   ├── login/
│   ├── signup/
│   └── verify-email/
├── (app)/             # Protected routes
│   ├── discover/      # Main feed
│   ├── matches/       # Matches list
│   ├── chat/[id]/     # Individual chat
│   ├── profile/       # User profile
│   └── settings/
└── api/               # API routes
    ├── auth/
    ├── pets/
    ├── swipes/
    ├── matches/
    ├── messages/
    └── stripe/
```

### State Management Strategy

**Zustand** for global state:
- User authentication state
- Current pet profile
- UI state (modals, toasts)

**React Query** for server state:
- Pet profiles (discovery feed)
- Matches list
- Messages
- User preferences

**Local State** for:
- Form inputs
- UI interactions
- Temporary data

---

## 🔄 KEY USER FLOWS (Technical)

### 1. Authentication Flow

```typescript
// Sign Up Flow
POST /api/auth/signup
  → Validate input (Zod)
  → Hash password (bcrypt)
  → Create user in DB (Prisma)
  → Send verification email (Resend)
  → Return JWT token
  → Redirect to onboarding

// Login Flow
POST /api/auth/login
  → Validate credentials
  → Check email verification
  → Generate JWT token
  → Set httpOnly cookie
  → Return user data
  → Redirect to discover feed
```

### 2. Swiping Flow

```typescript
// Swipe Action
POST /api/swipes
  → Check daily limit (DailyLimits table)
  → Validate pet exists
  → Create swipe record
  → Check for mutual match
  → If match:
    → Create Match record
    → Send notifications (both users)
    → Return match data
  → Else:
    → Return next pet
```

### 3. Matching Algorithm

```typescript
// Discovery Feed Algorithm
GET /api/discover/pets
  → Get user location
  → Get user preferences (filters)
  → Query pets:
    1. Within distance radius
    2. Match species filter
    3. Match age range
    4. Match size preference
    5. Not already swiped
    6. Not blocked
  → Sort by:
    1. Distance (closest first)
    2. Activity (online first)
    3. Profile quality score
    4. ELO ranking
  → Return 10 pets (pre-load)
```

### 4. Real-time Chat

```typescript
// Supabase Realtime Setup
const channel = supabase
  .channel(`match:${matchId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'Message',
    filter: `matchId=eq.${matchId}`
  }, (payload) => {
    // Add new message to UI
    addMessage(payload.new)
  })
  .subscribe()

// Send Message
POST /api/messages
  → Validate match exists
  → Check not blocked
  → Moderate content (profanity filter)
  → If image: scan with AWS Rekognition
  → Create message record
  → Supabase broadcasts to channel
  → Send push notification
```

---

## 🔒 SECURITY & PRIVACY

### Authentication Security
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 7-day expiry
- httpOnly cookies (prevent XSS)
- CSRF tokens on all mutations
- Rate limiting: 100 requests/minute per user

### Data Protection
- HTTPS only (TLS 1.3)
- Encrypted data at rest (Supabase)
- Encrypted data in transit
- Row Level Security (RLS) in Supabase
- Input validation with Zod
- SQL injection prevention (Prisma)

### Privacy Features
- Location fuzzing (show approximate distance, not exact coords)
- Option to hide profile from non-matches
- Block users permanently
- Data export (GDPR compliance)
- Account deletion with data purge

### Content Moderation
- AWS Rekognition for image scanning
- Profanity filter for text
- Manual review queue for reports
- Automated bans for severe violations
- Three-strike system

---

## 📊 PERFORMANCE OPTIMIZATION

### Frontend Optimization
- Code splitting (dynamic imports)
- Image optimization (Next.js Image component)
- Lazy loading (React.lazy)
- Memoization (React.memo, useMemo)
- Virtual scrolling for long lists
- Service Worker for offline support

### Backend Optimization
- Database indexing (see schema)
- Query optimization (Prisma)
- API response caching (Redis)
- CDN for static assets
- Image compression (Sharp.js)
- Pagination (20 items per page)

### Caching Strategy
- Static pages: ISR (Incremental Static Regeneration)
- API responses: 5-minute cache
- Images: CDN cache (1 year)
- User data: React Query cache (5 minutes)

---

## 🧪 TESTING STRATEGY

### Unit Tests (Jest)
- Utility functions
- Validation schemas (Zod)
- Business logic
- Target: 80% coverage

### Integration Tests
- API endpoints
- Database operations
- Authentication flows
- Payment processing

### E2E Tests (Playwright)
- Sign up → Profile creation → Swiping → Matching → Chat
- Premium upgrade flow
- Mobile responsiveness
- Cross-browser testing

---

## 📈 MONITORING & ANALYTICS

### Error Tracking (Sentry)
- Frontend errors
- API errors
- Performance issues
- User feedback

### Analytics (Google Analytics 4 + Mixpanel)
- User acquisition
- Engagement metrics
- Conversion funnels
- Retention cohorts

### Performance Monitoring (Vercel Analytics)
- Page load times
- API response times
- Core Web Vitals
- Real User Monitoring (RUM)

---

## 🚀 DEPLOYMENT STRATEGY

### Environments
1. **Development** - Local (localhost:3000)
2. **Staging** - Vercel Preview (preview-*.vercel.app)
3. **Production** - Vercel Production (kanya.app)

### CI/CD Pipeline
```
Git Push → GitHub
  ↓
GitHub Actions
  ↓
Run Tests (Jest + Playwright)
  ↓
Build Next.js App
  ↓
Deploy to Vercel
  ↓
Run DB Migrations (Prisma)
  ↓
Notify Team (Slack)
```

### Database Migrations
```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

---

## 🎨 DESIGN SYSTEM

### Color Palette
```typescript
const colors = {
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
  success: '#52B788',
  danger: '#E63946',
  neutral: '#6C757D',
}
```

### Typography
```typescript
const typography = {
  fontFamily: 'Inter, sans-serif',
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
}
```

### Spacing
```typescript
const spacing = {
  base: 8, // 8px base unit
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
}
```

---

**End of Technical Design Document**

*Last Updated: January 2026*
*Version: 1.0*
