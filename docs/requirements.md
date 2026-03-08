# 🐾 KANYA - Project Requirements

## 📋 EXECUTIVE SUMMARY
**Project:** Kanya - Tinder for Pets  
**Platform:** Next.js 14+ PWA (Progressive Web App) → React Native (Phase 2)  
**Target:** Production-grade, scalable pet social networking application  
**Timeline:** 12-16 weeks MVP → 6 months Full Launch

---

## 🎯 PROJECT GOALS

### Primary Objectives
1. Create a fun, engaging platform for pet owners to connect their pets
2. Build production-grade architecture with scalability
3. Implement Tinder/Bumble-level features for pets
4. Monetize through freemium model
5. Ensure safety and community guidelines

### Success Metrics
- 10,000+ active pet profiles in first 6 months
- 50,000+ swipes per day
- 1,000+ matches per week
- 10% conversion to premium subscriptions
- <5% monthly churn rate
- 4.5+ star rating

---

## 📱 CORE FEATURES (MVP - Phase 1)

### 1. Authentication & Onboarding
#### User Stories
- As a new user, I want to sign up with email/password so I can create an account
- As a user, I want to sign in with Google/Apple/Facebook for quick access
- As a user, I want to verify my email to ensure account security
- As a user, I want to reset my password if I forget it

#### Acceptance Criteria
- Email/password registration with validation
- Social login integration (Google, Apple, Facebook)
- Email verification with resend option
- Password reset flow
- Secure authentication with JWT tokens
- Session management

---

### 2. Pet Profile Creation
#### User Stories
- As a pet owner, I want to create a profile for my pet with basic information
- As a pet owner, I want to upload 4-9 photos of my pet
- As a pet owner, I want to add personality traits to my pet's profile
- As a pet owner, I want to set my discovery preferences

#### Mandatory Fields
- Pet name (text, 2-50 characters)
- Species (Dog, Cat, Bird, Rabbit, Other)
- Breed (searchable dropdown, 500+ breeds)
- Age/Birthday (date picker)
- Gender (Male, Female, Neutered, Spayed)
- Size (Small, Medium, Large, Giant)
- Photos (minimum 4, maximum 9, max 5MB each)

#### Optional Fields
- Bio (max 500 characters)
- Personality traits (multi-select: Playful, Calm, Energetic, Shy, Social, Friendly, Independent)
- Vaccination status (Yes/No/Unknown)
- Favorite activities (text)
- Fun facts (text)
- Horoscope compatibility (auto-calculated from birthday)

#### Acceptance Criteria
- Multi-step form with progress indicator (4 steps)
- Drag-and-drop photo upload
- Photo cropping and reordering
- Image compression before upload
- Form validation with error messages
- Save draft functionality
- Profile completeness score (0-100%)
- Mobile-responsive design

---

### 3. Discovery & Swiping
#### User Stories
- As a user, I want to see pet profiles in a card stack format
- As a user, I want to swipe right to like a pet
- As a user, I want to swipe left to pass on a pet
- As a user, I want to swipe up to super like a pet
- As a user, I want to filter pets by distance, species, age, and size
- As a user, I want to see how many swipes I have remaining

#### Card Stack Interface
- Swipe right (Like) - Standard like
- Swipe left (Pass) - Skip profile
- Swipe up (Super Like) - Premium like with notification
- Tap card - View full profile
- Photo carousel - Swipe through photos

#### Smart Filters
- Distance radius (1-100 miles, default 25)
- Species filter (same species / cross-species toggle)
- Age range (0-15+ years)
- Size preference (Small, Medium, Large, Giant)
- Personality compatibility (premium)
- Verified owners only (premium)

#### Discovery Algorithm
- Primary: Distance-based sorting
- Secondary: Activity level (online users prioritized)
- Tertiary: Profile quality score (completeness, photo quality)
- Quaternary: Compatibility based on filters
- ELO-style ranking system

#### Acceptance Criteria
- Smooth swipe animations (300ms)
- Pre-load next 3 cards for performance
- Daily swipe limit: 100 for free users, unlimited for premium
- Super likes: 3/day for free, 5/day for premium
- Empty state when no more pets available
- Swipe counter display
- Touch gestures on mobile, button controls on desktop

---

### 4. Matching System
#### User Stories
- As a user, I want to be notified when I match with another pet
- As a user, I want to see a celebration animation when matching
- As a user, I want to start chatting immediately after matching
- As a user, I want my matches to be organized by recency

#### Match Requirements
- Both users must swipe right (mutual like)
- Super likes increase match priority
- Match created immediately upon mutual like

#### Match Notification
- Pop-up modal with celebration animation
- Show both pet photos
- "Send Message" button
- "Keep Swiping" button
- Match sound effect (optional, user can disable)

#### Match Expiry
- Free users: Matches expire after 30 days of no interaction
- Premium users: Matches never expire
- Warning notification 3 days before expiry

#### Acceptance Criteria
- Real-time match detection
- Celebration animation with confetti
- Match notification delivered to both users
- Match stored in database with timestamp
- Expired matches moved to separate section

---

### 5. In-App Chat
#### User Stories
- As a user, I want to send text messages to my matches
- As a user, I want to share photos in chat
- As a user, I want to see when the other user is typing
- As a user, I want to see read receipts
- As a user, I want to react to messages with emojis
- As a user, I want to unmatch if needed

#### Features
- Text messaging (max 1000 characters per message)
- Photo/video sharing (max 10MB)
- "Paw reactions" (emoji reactions on messages)
- Typing indicators
- Read receipts (can be disabled in premium)
- Message timestamps
- Online/offline status
- Unmatch option
- Report/Block functionality

#### Safety Features
- Auto-moderation for inappropriate content
- Profanity filter
- Report feature in every chat
- Block user permanently
- First message restrictions (prevent spam)
- Image moderation before sending

#### Acceptance Criteria
- Real-time message delivery (<1s latency)
- Message history pagination (20 messages per page)
- Scroll to bottom on new message
- Typing indicator appears within 500ms
- Read receipts update in real-time
- Media uploads with progress indicator
- Moderation flags inappropriate content

---

### 6. Profile Management
#### User Stories
- As a user, I want to edit my pet's profile information
- As a user, I want to add or remove photos
- As a user, I want to update my discovery preferences
- As a user, I want to manage my privacy settings
- As a user, I want to delete my account

#### Editable Fields
- All pet information (name, breed, bio, etc.)
- Photos (add, remove, reorder)
- Personality traits
- Discovery preferences (filters)
- Privacy settings
- Notification preferences

#### Acceptance Criteria
- Edit mode with save/cancel buttons
- Changes saved to database immediately
- Photo changes reflected in discovery feed
- Profile preview before saving
- Confirmation dialog for account deletion
- Data export option (GDPR compliance)

---

### 7. Safety & Moderation
#### User Stories
- As a user, I want to report inappropriate profiles or messages
- As a user, I want to block users who harass me
- As a platform, I want to automatically detect inappropriate content
- As a moderator, I want to review reported content

#### Content Moderation
- AI-powered image scanning (AWS Rekognition)
- Detect inappropriate, violent, or explicit content
- Profanity filter in text (bio, messages)
- Flagged content review queue for admins
- Automated blocking for severe violations
- Three-strike system for minor violations

#### User Safety
- Report user/photo/chat with categories:
  - Spam
  - Fake profile
  - Inappropriate content
  - Harassment
  - Other (with description)
- Block user permanently (cannot re-match)
- Safety tips section in app
- Community guidelines page
- Verification badges for verified owners

#### Verification System
- Photo verification (selfie with pet)
- Email verification (required)
- Phone verification (optional)
- "Verified Owner" badge on profile

#### Acceptance Criteria
- Report button accessible in all contexts
- Report submitted to admin queue within 1 minute
- Blocked users cannot see or contact blocker
- AI moderation scans all uploaded images
- Flagged content reviewed within 24 hours
- User notified of action taken on their report

---

## 💎 PREMIUM FEATURES (Monetization)

### Kanya Plus ($9.99/month)
1. **Unlimited Swipes** (Free: 100/day)
2. **5 Super Likes per day** (Free: 3/day)
3. **Rewind** - Undo last swipe
4. **See Who Liked You** - View all pets who swiped right
5. **Passport Mode** - Swipe in any location
6. **No Ads** - Remove banner advertisements
7. **Priority Support** - Faster response times
8. **Advanced Filters:**
   - Vaccination status filter
   - Activity level filter
   - Verified owners only
9. **Extended Match Time** - Matches never expire
10. **Read Receipts Off** - Privacy option

### Kanya Platinum ($19.99/month)
- All Plus features +
- **Profile Boost** (2x per month) - Top profile for 30 minutes
- **Priority Likes** - Your likes shown first to others
- **Message Before Matching** - Send 1 intro message before match
- **See When Messages Are Read** - Advanced read receipts
- **Exclusive Platinum Badge** - Special badge on profile

### À La Carte Features
- **Boost** - $4.99 (one-time, 30-min visibility boost)
- **Super Likes Pack** - 5 for $4.99
- **Spotlight** - $9.99 (Featured profile for 1 hour)

---

## 🚀 FUTURE FEATURES (Phase 2 & 3)

### Phase 2 (Months 4-6)
1. **Events & Meetups**
   - Create/join playdates
   - Dog park check-ins
   - Group walks
   - Pet-friendly venue directory

2. **Community Features**
   - Pet owner forums
   - Breed-specific groups
   - Photo sharing feed (Instagram-style)
   - Pet of the month contests

3. **Enhanced Matching**
   - Group matches (multiple pets)
   - Pet sitting/walking requests
   - Breeder connections (ethical only)

### Phase 3 (Months 7-12)
1. **Pet Services Integration**
   - Vet finder with reviews
   - Grooming appointment booking
   - Pet store partnerships
   - Insurance recommendations

2. **Advanced AI Features**
   - AI matchmaking recommendations
   - Personality analysis from photos
   - Breed recognition
   - Compatibility predictions

3. **Gamification**
   - Achievement badges
   - Pet of the month
   - Leaderboards (most liked profiles)
   - Referral rewards

---

## 🎯 SUCCESS CRITERIA

### Technical Requirements
- [ ] 99.9% uptime (max 8.76 hours downtime/year)
- [ ] <2s page load time (First Contentful Paint)
- [ ] <100ms API response time (95th percentile)
- [ ] Mobile-responsive (100% of screens)
- [ ] Lighthouse score >90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Zero critical security vulnerabilities
- [ ] WCAG 2.1 AA accessibility compliance

### Business Requirements
- [ ] 1,000 beta users in first month
- [ ] 10,000 users in 6 months
- [ ] 10% premium conversion rate
- [ ] <5% monthly churn rate
- [ ] 4.5+ star rating (app stores)
- [ ] 30+ swipes per active user daily
- [ ] 40%+ match rate
- [ ] 60%+ message response rate

### User Experience Requirements
- [ ] <2 minutes onboarding time
- [ ] >80% profile completion rate
- [ ] <3 clicks to any major feature
- [ ] Intuitive navigation (no tutorial needed)
- [ ] Smooth animations (60fps)
- [ ] Offline support for viewing matches

---

## 📝 LEGAL & COMPLIANCE

### Terms of Service
- User agreement and responsibilities
- Pet owner verification requirements
- Content guidelines and restrictions
- Premium subscription terms and cancellation policy
- Liability disclaimers

### Privacy Policy
- Data collection disclosure (GDPR/CCPA compliant)
- Cookie policy
- Third-party services disclosure
- User rights (access, deletion, export)
- Data retention policy
- Children's privacy (COPPA compliance)

### Community Guidelines
- Respectful behavior requirements
- No harassment or bullying
- Authentic profiles only (no fake pets)
- Appropriate content standards
- Safety-first approach
- Consequences for violations

### Liability Disclaimers
- Meetup safety is user responsibility
- Pet safety during interactions
- No guarantee of compatibility
- User-generated content disclaimer
- Third-party service disclaimers

---

## 🔐 SECURITY REQUIREMENTS

### Authentication & Authorization
- Secure password hashing (bcrypt)
- JWT token-based authentication
- Session management with expiry
- Role-based access control (user, admin, moderator)
- Two-factor authentication (optional)

### Data Protection
- HTTPS only (TLS 1.3)
- Encrypted data at rest
- Encrypted data in transit
- Regular security audits
- Penetration testing
- OWASP Top 10 compliance

### API Security
- Rate limiting (100 requests/minute per user)
- Input validation and sanitization
- SQL injection prevention (Prisma ORM)
- XSS prevention
- CSRF protection
- API key rotation

---

## 📊 ANALYTICS & TRACKING

### Key Metrics to Track
1. **User Acquisition**
   - Daily/Monthly Active Users (DAU/MAU)
   - Sign-up conversion rate
   - Onboarding completion rate
   - Traffic sources

2. **Engagement**
   - Daily swipes per user
   - Match rate
   - Message response rate
   - Session duration
   - Feature usage frequency

3. **Monetization**
   - Free to Premium conversion rate
   - Average Revenue Per User (ARPU)
   - Churn rate
   - Lifetime Value (LTV)
   - Payment success rate

4. **Retention**
   - Day 1, 7, 30 retention rates
   - Cohort analysis
   - Feature adoption rates
   - User satisfaction scores

---

**End of Requirements Document**

*Last Updated: January 2026*
*Version: 1.0*
