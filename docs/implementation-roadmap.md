# 🛠️ KANYA - IMPLEMENTATION ROADMAP
## Detailed Task Breakdown & Development Guide

---

## 📋 TASK ORGANIZATION

### Sprint Structure
- **2-week sprints**
- **12 weeks total for MVP**
- **Daily standups** (if team)
- **Sprint retrospectives**

---

## 🎯 SPRINT 1: PROJECT SETUP (Weeks 1-2)

### Task 1.1: Initialize Project
**Priority:** Critical | **Time:** 4 hours

**Subtasks:**
- [ ] Create Next.js 14 project with TypeScript
  ```bash
  npx create-next-app@latest kanya --typescript --tailwind --app
  cd kanya
  ```
- [ ] Set up Git repository
- [ ] Create GitHub repository
- [ ] Set up branch protection rules (main, develop)
- [ ] Create initial README.md

**Dependencies:** None

---

### Task 1.2: Development Environment
**Priority:** Critical | **Time:** 6 hours

**Subtasks:**
- [ ] Install and configure ESLint
- [ ] Install and configure Prettier
- [ ] Set up Husky for pre-commit hooks
- [ ] Configure VS Code settings (shared)
- [ ] Install core dependencies:
  ```bash
  npm install @prisma/client zustand react-query framer-motion
  npm install -D prisma
  ```
- [ ] Set up environment variables template (.env.example)

**Files to Create:**
- `.eslintrc.json`
- `.prettierrc`
- `.husky/pre-commit`
- `.vscode/settings.json`
- `.env.example`

---

### Task 1.3: Database Setup
**Priority:** Critical | **Time:** 8 hours

**Subtasks:**
- [ ] Create Supabase project
- [ ] Initialize Prisma
  ```bash
  npx prisma init
  ```
- [ ] Create complete Prisma schema (from project plan)
- [ ] Set up DATABASE_URL in .env
- [ ] Create initial migration
  ```bash
  npx prisma migrate dev --name init
  ```
- [ ] Generate Prisma Client
- [ ] Test database connection

**Files to Create:**
- `prisma/schema.prisma`
- `lib/prisma.ts` (Prisma client singleton)

---

### Task 1.4: Authentication Setup
**Priority:** Critical | **Time:** 10 hours

**Subtasks:**
- [ ] Install Supabase Auth
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
  ```
- [ ] Configure Supabase client
- [ ] Create auth middleware
- [ ] Set up protected routes
- [ ] Implement sign up API route
- [ ] Implement login API route
- [ ] Implement logout API route
- [ ] Create email verification flow
- [ ] Test authentication flows

**Files to Create:**
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `middleware.ts` (route protection)
- `app/api/auth/signup/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/logout/route.ts`
- `app/api/auth/verify-email/route.ts`

---

### Task 1.5: UI Component Library
**Priority:** High | **Time:** 8 hours

**Subtasks:**
- [ ] Install Shadcn UI
  ```bash
  npx shadcn-ui@latest init
  ```
- [ ] Add essential components:
  - Button
  - Input
  - Card
  - Dialog/Modal
  - Toast/Notification
  - Avatar
  - Dropdown
  - Tabs
- [ ] Create custom theme (brand colors)
- [ ] Set up TailwindCSS config
- [ ] Create reusable layout components

**Files to Create:**
- `components/ui/*` (Shadcn components)
- `tailwind.config.ts` (custom theme)
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `components/layout/Navigation.tsx`

---

### Task 1.6: File Upload Setup
**Priority:** High | **Time:** 6 hours

**Subtasks:**
- [ ] Configure Supabase Storage bucket (pet-photos)
- [ ] Create upload utility functions
- [ ] Implement image compression (Sharp.js)
- [ ] Set up CDN (Cloudflare)
- [ ] Create file upload component with drag-drop
- [ ] Add image cropping functionality
- [ ] Test file uploads

**Files to Create:**
- `lib/storage/upload.ts`
- `lib/storage/image-processing.ts`
- `components/ui/ImageUpload.tsx`
- `components/ui/ImageCrop.tsx`

---

### Task 1.7: Landing Page
**Priority:** Medium | **Time:** 10 hours

**Subtasks:**
- [ ] Design landing page wireframe
- [ ] Create hero section
- [ ] Add feature highlights
- [ ] Create CTA buttons
- [ ] Add sample pet profiles carousel
- [ ] Implement animations (Framer Motion)
- [ ] Mobile responsive design
- [ ] SEO optimization (metadata)

**Files to Create:**
- `app/page.tsx` (landing page)
- `components/landing/Hero.tsx`
- `components/landing/Features.tsx`
- `components/landing/CTASection.tsx`
- `components/landing/SampleProfiles.tsx`

---

### Task 1.8: Testing Infrastructure
**Priority:** Medium | **Time:** 6 hours

**Subtasks:**
- [ ] Install Jest and React Testing Library
  ```bash
  npm install -D jest @testing-library/react @testing-library/jest-dom
  ```
- [ ] Configure Jest
- [ ] Create test utilities
- [ ] Write sample tests
- [ ] Set up GitHub Actions for CI
- [ ] Configure test coverage

**Files to Create:**
- `jest.config.js`
- `jest.setup.js`
- `__tests__/utils.test.ts`
- `.github/workflows/test.yml`

---

## 🎯 SPRINT 2: AUTHENTICATION & ONBOARDING (Weeks 3-4)

### Task 2.1: Authentication UI
**Priority:** Critical | **Time:** 12 hours

**Subtasks:**
- [ ] Create login modal/page
- [ ] Create signup form with validation
- [ ] Add social login buttons (Google, Apple, Facebook)
- [ ] Implement form validation (React Hook Form + Zod)
- [ ] Add loading states
- [ ] Create error handling UI
- [ ] Add "Forgot Password" flow
- [ ] Mobile responsive

**Files to Create:**
- `app/(auth)/login/page.tsx`
- `app/(auth)/signup/page.tsx`
- `components/auth/LoginForm.tsx`
- `components/auth/SignupForm.tsx`
- `components/auth/SocialLoginButtons.tsx`
- `lib/validations/auth.ts` (Zod schemas)

**Tests to Write:**
- Login form validation
- Signup form validation
- Social login integration

---

### Task 2.2: Email Verification
**Priority:** High | **Time:** 6 hours

**Subtasks:**
- [ ] Create email templates (Resend)
- [ ] Implement verification email sending
- [ ] Create verification page
- [ ] Handle verification token
- [ ] Add resend verification option
- [ ] Test email delivery

**Files to Create:**
- `lib/email/templates.ts`
- `lib/email/send.ts`
- `app/(auth)/verify-email/page.tsx`
- `app/api/auth/resend-verification/route.ts`

---

### Task 2.3: Pet Profile Creation - Step 1 (Basic Info)
**Priority:** Critical | **Time:** 10 hours

**Subtasks:**
- [ ] Create multi-step form component
- [ ] Design Step 1: Basic Info form
- [ ] Add form fields:
  - Pet name (text)
  - Species (dropdown with search)
  - Breed (dropdown with search)
  - Birthday (date picker)
  - Gender (radio buttons)
  - Size (radio buttons)
- [ ] Form validation (Zod)
- [ ] Progress indicator
- [ ] Save draft functionality
- [ ] Mobile responsive

**Files to Create:**
- `app/(app)/onboarding/page.tsx`
- `components/onboarding/MultiStepForm.tsx`
- `components/onboarding/BasicInfoStep.tsx`
- `lib/validations/pet.ts`
- `app/api/pets/draft/route.ts`

**Data Files:**
- `lib/data/species.ts` (list of species)
- `lib/data/breeds.ts` (breeds by species)

---

### Task 2.4: Pet Profile Creation - Step 2 (Photos)
**Priority:** Critical | **Time:** 12 hours

**Subtasks:**
- [ ] Create photo upload interface
- [ ] Implement drag-and-drop
- [ ] Add photo preview
- [ ] Image cropping modal
- [ ] Reorder photos (drag to reorder)
- [ ] Delete photos
- [ ] Validate minimum 4 photos
- [ ] Compress images before upload
- [ ] Show upload progress
- [ ] Handle upload errors

**Files to Create:**
- `components/onboarding/PhotoUploadStep.tsx`
- `components/ui/PhotoGrid.tsx`
- `components/ui/PhotoReorder.tsx`

---

### Task 2.5: Pet Profile Creation - Step 3 (Personality)
**Priority:** High | **Time:** 8 hours

**Subtasks:**
- [ ] Create personality trait selector
- [ ] Design interactive UI (checkboxes/pills)
- [ ] Add bio text area (max 500 chars)
- [ ] Character counter
- [ ] Add fun facts field
- [ ] Optional: favorite activities
- [ ] Form validation

**Files to Create:**
- `components/onboarding/PersonalityStep.tsx`
- `components/ui/TraitSelector.tsx`
- `lib/data/personality-traits.ts`

---

### Task 2.6: Pet Profile Creation - Step 4 (Preferences)
**Priority:** High | **Time:** 8 hours

**Subtasks:**
- [ ] Create preferences form
- [ ] Distance radius slider
- [ ] Species preference (same/cross-species toggle)
- [ ] Age range slider
- [ ] Size preference checkboxes
- [ ] Save preferences
- [ ] Form validation

**Files to Create:**
- `components/onboarding/PreferencesStep.tsx`
- `components/ui/RangeSlider.tsx`
- `app/api/users/preferences/route.ts`

---

### Task 2.7: Profile Review & Completion
**Priority:** High | **Time:** 6 hours

**Subtasks:**
- [ ] Create profile preview component
- [ ] Show all entered information
- [ ] Edit buttons for each section
- [ ] Final submit button
- [ ] Success animation/confetti
- [ ] Redirect to discovery feed
- [ ] Calculate profile completeness score

**Files to Create:**
- `components/onboarding/ProfileReview.tsx`
- `components/ui/Confetti.tsx`
- `app/api/pets/create/route.ts`

---

## 🎯 SPRINT 3: DISCOVERY & SWIPING (Weeks 5-6)

### Task 3.1: Discovery Feed - Card Stack
**Priority:** Critical | **Time:** 14 hours

**Subtasks:**
- [ ] Create card stack component
- [ ] Implement swipe gestures (Framer Motion)
- [ ] Add swipe animations (left/right/up)
- [ ] Load pets from database
- [ ] Apply user filters
- [ ] Distance calculation
- [ ] Implement card stack logic (pre-load next cards)
- [ ] Handle empty state (no more pets)
- [ ] Mobile touch gestures
- [ ] Desktop mouse/button controls

**Files to Create:**
- `app/(app)/discover/page.tsx`
- `components/discover/CardStack.tsx`
- `components/discover/PetCard.tsx`
- `lib/matching/discovery.ts`
- `app/api/discover/pets/route.ts`

**Algorithm Logic:**
- Distance-based sorting
- Profile quality score
- Activity (online users first)
- Elo-style ranking

---

### Task 3.2: Pet Profile Display
**Priority:** Critical | **Time:** 8 hours

**Subtasks:**
- [ ] Design pet card UI
- [ ] Photo carousel
- [ ] Display name, age, breed, distance
- [ ] Show bio preview (expandable)
- [ ] Personality traits display
- [ ] Horoscope compatibility badge
- [ ] Tap card to view full profile
- [ ] Full profile modal/page
- [ ] Report button
- [ ] Smooth animations

**Files to Create:**
- `components/discover/PetCard.tsx`
- `components/discover/PetProfileModal.tsx`
- `components/ui/PhotoCarousel.tsx`

---

### Task 3.3: Swipe Actions
**Priority:** Critical | **Time:** 10 hours

**Subtasks:**
- [ ] Implement swipe left (Pass)
- [ ] Implement swipe right (Like)
- [ ] Implement swipe up (Super Like)
- [ ] Create swipe API endpoints
- [ ] Check for mutual match
- [ ] Show match animation if matched
- [ ] Daily limit enforcement (free users)
- [ ] Update daily limits in database
- [ ] Swipe history tracking
- [ ] Undo last swipe (premium feature)

**Files to Create:**
- `app/api/swipes/route.ts`
- `app/api/swipes/check-match/route.ts`
- `components/discover/SwipeButtons.tsx`
- `lib/matching/swipe-handler.ts`

---

### Task 3.4: Filters & Settings
**Priority:** High | **Time:** 10 hours

**Subtasks:**
- [ ] Create filter modal
- [ ] Distance radius slider (1-100 miles)
- [ ] Species filter (multi-select)
- [ ] Age range filter
- [ ] Size preference filter
- [ ] Cross-species toggle
- [ ] Save filter preferences
- [ ] Reset filters option
- [ ] Apply filters to discovery feed
- [ ] Premium filters (gated)

**Files to Create:**
- `components/discover/FilterModal.tsx`
- `app/api/users/filters/route.ts`
- `lib/matching/apply-filters.ts`

---

### Task 3.5: Match Notification System
**Priority:** High | **Time:** 8 hours

**Subtasks:**
- [ ] Create match detection logic
- [ ] Design match notification modal
- [ ] Celebration animation (confetti, hearts)
- [ ] Show matched pet profile
- [ ] "Send Message" button
- [ ] "Keep Swiping" button
- [ ] Super Like indicator (if applicable)
- [ ] Match sound effect (optional)

**Files to Create:**
- `components/matches/MatchNotification.tsx`
- `lib/matching/match-detector.ts`
- `hooks/useMatchNotification.ts`

---

## 🎯 SPRINT 4: MATCHING & CHAT (Weeks 7-8)

### Task 4.1: Matches List Page
**Priority:** Critical | **Time:** 10 hours

**Subtasks:**
- [ ] Create matches page layout
- [ ] Display all matches (grid/list)
- [ ] Recently matched section (highlighted)
- [ ] Search matches
- [ ] Filter matches (active, expired)
- [ ] Load more pagination
- [ ] Empty state (no matches yet)
- [ ] Match expiry indicator (non-premium)
- [ ] Tap match to open chat

**Files to Create:**
- `app/(app)/matches/page.tsx`
- `components/matches/MatchesList.tsx`
- `components/matches/MatchCard.tsx`
- `app/api/matches/route.ts`

---

### Task 4.2: Real-time Chat System
**Priority:** Critical | **Time:** 16 hours

**Subtasks:**
- [ ] Set up Supabase Realtime
- [ ] Create chat room for each match
- [ ] Build chat UI (message list, input)
- [ ] Send text messages
- [ ] Receive messages in real-time
- [ ] Message timestamps
- [ ] Read receipts
- [ ] Typing indicators
- [ ] Online status indicators
- [ ] Load message history (pagination)
- [ ] Scroll to bottom on new message
- [ ] Message delivery status

**Files to Create:**
- `app/(app)/chat/[matchId]/page.tsx`
- `components/chat/ChatRoom.tsx`
- `components/chat/MessageList.tsx`
- `components/chat/MessageInput.tsx`
- `components/chat/Message.tsx`
- `lib/chat/realtime.ts`
- `app/api/messages/route.ts`
- `app/api/messages/[matchId]/route.ts`

---

### Task 4.3: Media Sharing in Chat
**Priority:** High | **Time:** 8 hours

**Subtasks:**
- [ ] Image upload in chat
- [ ] Video upload (optional for MVP)
- [ ] Image preview before sending
- [ ] Image compression
- [ ] Display media in chat
- [ ] Full-screen image viewer
- [ ] Download media option
- [ ] Media content moderation

**Files to Create:**
- `components/chat/MediaUpload.tsx`
- `components/chat/MediaMessage.tsx`
- `components/ui/ImageViewer.tsx`
- `lib/chat/media-handler.ts`

---

## 🎯 SPRINT 5: PREMIUM FEATURES (Weeks 9-10)

### Task 5.1: Stripe Integration
**Priority:** Critical | **Time:** 12 hours

**Subtasks:**
- [ ] Create Stripe account
- [ ] Install Stripe SDK
  ```bash
  npm install stripe @stripe/stripe-js
  ```
- [ ] Set up webhook endpoint
- [ ] Create products in Stripe (Plus, Platinum)
- [ ] Implement checkout session
- [ ] Handle successful payment
- [ ] Update user premium status
- [ ] Handle subscription cancellation
- [ ] Test in Stripe test mode

**Files to Create:**
- `lib/stripe/client.ts`
- `lib/stripe/config.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `app/api/stripe/portal/route.ts` (customer portal)

---

### Task 5.2: Subscription Management
**Priority:** Critical | **Time:** 8 hours

**Subtasks:**
- [ ] Create subscription page/modal
- [ ] Display plan features comparison
- [ ] Pricing cards (Plus vs Platinum)
- [ ] "Upgrade" buttons
- [ ] Show current plan status
- [ ] Manage subscription (cancel, change plan)
- [ ] Billing history
- [ ] Customer portal link

**Files to Create:**
- `app/(app)/premium/page.tsx`
- `components/premium/PricingCards.tsx`
- `components/premium/SubscriptionStatus.tsx`
- `app/api/subscriptions/route.ts`

---

### Task 5.3: Premium Feature Gates
**Priority:** High | **Time:** 8 hours

**Subtasks:**
- [ ] Create middleware for premium checks
- [ ] Gate unlimited swipes
- [ ] Gate rewind feature
- [ ] Gate "See Who Liked You"
- [ ] Gate advanced filters
- [ ] Gate passport mode
- [ ] Gate boost feature
- [ ] Show "Upgrade" prompt when hitting gates
- [ ] Premium badge on profile

**Files to Create:**
- `lib/premium/check-access.ts`
- `hooks/usePremiumFeature.ts`
- `components/premium/UpgradePrompt.tsx`

---

## 🎯 SPRINT 6: TESTING & POLISH (Weeks 11-12)

### Task 6.1: Comprehensive Testing
**Priority:** Critical | **Time:** 20 hours

**Subtasks:**
- [ ] Write unit tests for utils
- [ ] Write component tests
- [ ] Write API integration tests
- [ ] E2E tests (Playwright):
  - Sign up flow
  - Profile creation
  - Swiping flow
  - Matching and chat
  - Premium upgrade
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Fix all critical bugs

**Test Coverage Goal:** 80%+

---

### Task 6.2: Performance Optimization
**Priority:** High | **Time:** 12 hours

**Subtasks:**
- [ ] Run Lighthouse audits
- [ ] Optimize images (lazy loading, WebP)
- [ ] Code splitting (dynamic imports)
- [ ] Database query optimization
- [ ] API response caching
- [ ] CDN setup for static assets
- [ ] Minify CSS/JS
- [ ] Bundle size analysis
- [ ] Reduce Time to Interactive (TTI)

**Performance Goals:**
- Lighthouse score: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s

---

### Task 6.3: Security Audit
**Priority:** Critical | **Time:** 8 hours

**Subtasks:**
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Prisma does this)
- [ ] XSS prevention
- [ ] CSRF protection
- [ ] Rate limiting on API routes
- [ ] Secure headers (helmet)
- [ ] Environment variable security
- [ ] Third-party package audit
- [ ] Penetration testing (basic)

---

### Task 6.4: Beta Launch Preparation
**Priority:** Critical | **Time:** 10 hours

**Subtasks:**
- [ ] Deploy to production (Vercel)
- [ ] Set up custom domain
- [ ] SSL certificate
- [ ] Configure production environment variables
- [ ] Database backup strategy
- [ ] Monitoring dashboards
- [ ] Support email setup
- [ ] Create feedback form
- [ ] Recruit beta testers (50-100)
- [ ] Prepare launch announcement

---

## 📊 PROGRESS TRACKING

### Sprint Velocity
- Target: 60-80 hours per 2-week sprint
- Actual: _____ hours

### Metrics Dashboard
- Total tasks: 150+
- Completed: ___
- In Progress: ___
- Blocked: ___
- Remaining: ___

---

## 🎯 DEFINITION OF DONE

A task is "Done" when:
- [ ] Code is written and committed
- [ ] Unit tests written (if applicable)
- [ ] Code reviewed (if team)
- [ ] Tested on multiple browsers
- [ ] Tested on mobile
- [ ] No console errors
- [ ] Documentation updated
- [ ] Merged to develop branch

---

**Ready to build Kanya? Let's start coding! 🐾**

*Last Updated: January 2026*
*Version: 1.0*
