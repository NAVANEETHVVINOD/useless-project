# 🗺️ KANYA - USER FLOWS & WIREFRAMES
## Complete User Journey Maps & Screen Specifications

---

## 📱 SCREEN INVENTORY

### Public Screens (No Auth Required)
1. Landing Page
2. About/How It Works
3. Login
4. Sign Up
5. Forgot Password
6. Email Verification

### Protected Screens (Auth Required)
7. Onboarding (Multi-step)
8. Discovery/Home Feed
9. Matches List
10. Chat (Individual)
11. Profile (Own Pet)
12. Profile (Other Pet - View Only)
13. Settings
14. Premium/Upgrade
15. Filters
16. Likes You (Premium)
17. Notifications

### Administrative
18. Admin Dashboard
19. Reports Queue
20. User Management

---

## 🔄 COMPLETE USER FLOWS

### FLOW 1: NEW USER ONBOARDING
**Goal:** Get user from landing page to first swipe

```
┌─────────────────┐
│  Landing Page   │
│  - Hero         │
│  - Features     │
│  - CTA          │
└────────┬────────┘
         │ Click "Get Started"
         ▼
┌─────────────────┐
│   Sign Up       │
│  - Email        │
│  - Password     │
│  - Social Login │
└────────┬────────┘
         │ Submit
         ▼
┌─────────────────┐
│Email Verification│
│  - Check inbox  │
│  - Click link   │
└────────┬────────┘
         │ Verified
         ▼
┌─────────────────┐
│  Onboarding     │
│  Step 1/4       │
│  Basic Info     │
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│  Onboarding     │
│  Step 2/4       │
│  Photos         │
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│  Onboarding     │
│  Step 3/4       │
│  Personality    │
└────────┬────────┘
         │ Next
         ▼
┌─────────────────┐
│  Onboarding     │
│  Step 4/4       │
│  Preferences    │
└────────┬────────┘
         │ Submit
         ▼
┌─────────────────┐
│   Success! 🎉   │
│  Ready to swipe │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Discovery Feed  │
└─────────────────┘
```

**Key Metrics:**
- Time to complete: Target <5 minutes
- Drop-off points: Monitor each step
- Completion rate goal: >80%

---

### FLOW 2: DAILY SWIPING SESSION
**Goal:** User discovers pets, makes matches

```
┌─────────────────┐
│ Discovery Feed  │
│  - Card Stack   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│ Swipe  │ │ Swipe  │
│ Left   │ │ Right  │
│ (Pass) │ │ (Like) │
└───┬────┘ └───┬────┘
    │          │
    │          ▼
    │     ┌────────────┐
    │     │Check Match?│
    │     └─────┬──────┘
    │       No  │  Yes
    │           │
    │           ▼
    │     ┌──────────────┐
    │     │ IT'S A MATCH!│
    │     │  🎊 🐾 🎊   │
    │     └──────┬───────┘
    │            │
    └────────────┼───────┐
                 │       │
                 ▼       ▼
          ┌──────────┐ ┌──────────┐
          │Next Card │ │ Go to    │
          │          │ │ Chat     │
          └──────────┘ └──────────┘
```

---

### FLOW 3: MATCHING & CONVERSATION
**Goal:** From match to real conversation

```
┌──────────────────┐
│  Match Created   │
│  Both users get  │
│  notification    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Match Notification│
│  "It's a Match!" │
│  [Send Message]  │
│  [Keep Swiping]  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Chat Screen     │
│  - Messages      │
│  - Input box     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Conversation    │
│  Continues       │
└──────────────────┘
```

---

### FLOW 4: PREMIUM UPGRADE
**Goal:** Convert free user to paid subscriber

```
┌──────────────────┐
│  Trigger Point   │
│  - Hit limit     │
│  - Want feature  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Upgrade Prompt  │
│  [View Plans]    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Pricing Page    │
│  Plus/Platinum   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Stripe Checkout  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Success! 🎉     │
│  Premium Active  │
└──────────────────┘
```

---

## 🎨 DETAILED WIREFRAMES

### 1. LANDING PAGE

```
┌────────────────────────────────────────┐
│ [Logo] Kanya          [Login] [Sign Up]│
├────────────────────────────────────────┤
│                                        │
│         🐾 HERO SECTION 🐾             │
│                                        │
│     "Where Pets Find Their             │
│      Paw-fect Match"                   │
│                                        │
│     [Get Started - Free]               │
│                                        │
│     [Image: Happy dogs playing]        │
│                                        │
├────────────────────────────────────────┤
│     HOW IT WORKS                       │
│                                        │
│  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │  1   │  │  2   │  │  3   │        │
│  │Create│→ │Swipe │→ │Match!│        │
│  │Profile│  │Right │  │ Chat │        │
│  └──────┘  └──────┘  └──────┘        │
│                                        │
├────────────────────────────────────────┤
│     FEATURES                           │
│  • Smart Matching                      │
│  • Safe & Secure                       │
│  • Real-time Chat                      │
│                                        │
└────────────────────────────────────────┘
```

---

### 2. DISCOVERY FEED (MAIN APP)

```
┌─────────────────────────────────────┐
│ [Logo]  [Filters] [👤] [💬] [⚙️]   │
├─────────────────────────────────────┤
│                                     │
│    ┌─────────────────────────┐     │
│    │                         │     │
│    │    [Pet Photo 1/5]      │     │
│    │                         │     │
│    │  ┌───────────────────┐  │     │
│    │  │ Max, 3            │  │     │
│    │  │ Golden Retriever  │  │     │
│    │  │ 2.3 miles away    │  │     │
│    │  │                   │  │     │
│    │  │ "Loves tennis     │  │     │
│    │  │  balls & cuddles" │  │     │
│    │  │                   │  │     │
│    │  │ Playful • Social  │  │     │
│    │  │ 🔮 85% Compatible │  │     │
│    │  └───────────────────┘  │     │
│    └─────────────────────────┘     │
│                                     │
│     Swipes remaining: 85/100       │
│                                     │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐       │
│  │ ↶ │  │ ✗ │  │ ⭐ │  │ ♥ │       │
│  │RDO│  │PSS│  │SPR│  │LKE│       │
│  └───┘  └───┘  └───┘  └───┘       │
│                                     │
├─────────────────────────────────────┤
│ [🏠 Home] [⭐ Likes] [💬 Chat] [👤]│
└─────────────────────────────────────┘
```

---

### 3. MATCH NOTIFICATION

```
┌─────────────────────────────────────┐
│                                     │
│    🎊  IT'S A MATCH!  🎊           │
│                                     │
│         ┌─────┐   ┌─────┐          │
│         │ 📷  │ ♥ │ 📷  │          │
│         │ You │   │ Max │          │
│         └─────┘   └─────┘          │
│                                     │
│    You and Max liked each other!    │
│                                     │
│    ┌─────────────────────────┐     │
│    │   Send Message          │     │
│    └─────────────────────────┘     │
│                                     │
│    ┌─────────────────────────┐     │
│    │   Keep Swiping          │     │
│    └─────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

---

### 4. CHAT SCREEN

```
┌─────────────────────────────────────┐
│ [← Back]  Max 🟢  [⚙️ Options]      │
│ Golden Retriever • 2.3 mi           │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Max (Yesterday)             │   │
│  │ Hey! Wanna meet at the      │   │
│  │ dog park? 🐕                │   │
│  └─────────────────────────────┘   │
│                                     │
│         ┌──────────────────┐        │
│         │ Yes! When? 🎾   │        │
│         │ (Today, 2:30 PM)│        │
│         └──────────────────┘        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ How about 3 PM today?       │   │
│  │ At Sunny Hills Park?        │   │
│  └─────────────────────────────┘   │
│                                     │
│  Max is typing...                   │
│                                     │
├─────────────────────────────────────┤
│ [📷] [😊] [Type a message...] [➤]  │
└─────────────────────────────────────┘
```

---

### 5. PREMIUM UPGRADE PAGE

```
┌─────────────────────────────────────┐
│ [X] Close                           │
│                                     │
│      Upgrade to Kanya Plus          │
│                                     │
│  ┌─────────────────────────────┐   │
│  │         KANYA PLUS          │   │
│  │       $9.99/month           │   │
│  │                             │   │
│  │  ✓ Unlimited Swipes         │   │
│  │  ✓ 5 Super Likes/day        │   │
│  │  ✓ Rewind                   │   │
│  │  ✓ See Who Liked You        │   │
│  │  ✓ No Ads                   │   │
│  │                             │   │
│  │  [Select Plan]              │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │       KANYA PLATINUM        │   │
│  │         🌟 POPULAR          │   │
│  │      $19.99/month           │   │
│  │                             │   │
│  │  ✓ All Plus features        │   │
│  │  ✓ Profile Boost            │   │
│  │  ✓ Priority Likes           │   │
│  │                             │   │
│  │  [Select Plan]              │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 DESIGN SYSTEM

### Colors
```
Primary: #FF6B35 (Orange)
Secondary: #00B4D8 (Teal)
Accent: #FFD60A (Yellow)
Success: #52B788 (Green)
Danger: #E63946 (Red)
Neutral: #6C757D (Gray)
Background: #F8F9FA (Light Gray)
Text: #212529 (Dark Gray)
```

### Typography
```
Font Family: 'Inter', sans-serif
Headings: Bold, sizes 24px - 40px
Body: Regular, 16px
Small: 14px
Tiny: 12px
```

### Spacing
```
Base unit: 8px
Padding: 16px, 24px, 32px
Margins: 8px, 16px, 24px
Border Radius: 8px, 16px (cards)
```

---

## 📐 RESPONSIVE DESIGN NOTES

### Mobile (< 768px)
- Full-screen card stack
- Bottom navigation bar
- Swipe gestures optimized for thumb
- Hamburger menu for settings

### Tablet (768px - 1024px)
- Larger cards with more info
- Side navigation
- Multi-column layout for matches

### Desktop (> 1024px)
- Fixed-width card stack (max 500px)
- Sidebar navigation
- Chat in split view (matches + conversation)

---

## ✅ ACCESSIBILITY CHECKLIST

- [ ] All images have alt text
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader tested
- [ ] Form labels present
- [ ] Error messages clear
- [ ] Touch targets 44x44px minimum

---

**End of User Flows & Wireframes Document**

*These wireframes are ASCII representations. For actual design, use Figma or similar tools.*

*Last Updated: January 2026*
*Version: 1.0*
