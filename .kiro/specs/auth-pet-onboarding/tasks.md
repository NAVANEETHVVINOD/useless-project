# Implementation Plan: Authentication and Pet Profile Onboarding

## Overview

This implementation plan breaks down the authentication and pet profile onboarding feature into discrete, incremental coding tasks. Each task builds on previous work, with testing integrated throughout to catch errors early. The plan follows a bottom-up approach: core services → API routes → UI components → integration.

## Tasks

- [x] 1. Set up core infrastructure and validation schemas
  - Create Zod validation schemas for all forms (signup, login, pet profile steps)
  - Set up error types and error handling utilities
  - Configure Supabase client helpers for server and client components
  - Set up environment variables and type definitions
  - _Requirements: 1.3, 1.5, 4.1, 4.3, 4.6, 5.1, 5.2, 6.1, 6.2, 6.3, 7.1, 7.3, 7.4_

- [x] 1.1 Write property tests for validation schemas
  - **Property 3: Password security requirements**
  - **Property 5: Email format validation**
  - **Property 14: Required fields validation**
  - **Property 16: Birthday validation**
  - **Property 18: Pet name length validation**
  - **Property 19: Personality trait count validation**
  - **Property 20: Bio length and content validation**
  - **Property 22: Distance preference validation**
  - **Property 24: Age range validation**
  - **Validates: Requirements 1.3, 1.5, 4.1, 4.3, 4.6, 6.1, 6.2, 6.3, 7.1, 7.3, 7.4**

- [ ] 2. Implement authentication service layer
  - [ ] 2.1 Create AuthService class with signup, login, and email verification methods
    - Implement password hashing with Supabase Auth
    - Implement rate limiting logic for login attempts
    - Implement email verification token generation and validation
    - Create Prisma user record creation and updates
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.5, 3.1, 3.2, 3.5, 3.6_

  - [ ] 2.2 Write property tests for AuthService
    - **Property 1: Password hashing**
    - **Property 2: Duplicate email rejection**
    - **Property 4: JWT token generation**
    - **Property 6: Login authentication**
    - **Property 8: Rate limiting**
    - **Property 9: Email verification token uniqueness**
    - **Property 11: Verification token invalidation**
    - **Property 12: Verification email rate limiting**
    - **Validates: Requirements 1.1, 1.2, 1.4, 2.1, 2.2, 2.5, 3.1, 3.5, 3.6**

  - [ ] 2.3 Write unit tests for AuthService edge cases
    - Test expired token handling
    - Test invalid token formats
    - Test concurrent registration attempts
    - _Requirements: 3.4_

- [ ] 3. Implement session management and middleware
  - [ ] 3.1 Create SessionManager utility for cookie handling
    - Implement JWT token storage with HTTP-only, Secure, and SameSite flags
    - Implement token refresh logic before expiration
    - Implement session validation middleware
    - _Requirements: 2.3, 12.1, 12.2, 12.3, 12.5_

  - [ ] 3.2 Write property tests for session management
    - **Property 7: Session cookie security**
    - **Property 13: Token refresh**
    - **Validates: Requirements 2.3, 12.1, 12.2, 12.3, 12.5**

  - [ ] 3.3 Write unit tests for session edge cases
    - Test expired session redirect
    - Test invalid token handling
    - _Requirements: 2.4, 12.4_

- [ ] 4. Implement image processing service
  - [ ] 4.1 Create ImageService class with upload, compression, and validation
    - Implement file type and size validation
    - Implement image compression using browser-image-compression
    - Implement Supabase Storage upload with unique filename generation
    - Implement image deletion for cleanup
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.8, 5.9_

  - [ ] 4.2 Write property tests for ImageService
    - **Property 26: Image format validation**
    - **Property 27: Image size validation**
    - **Property 28: Image compression**
    - **Property 29: Square crop generation**
    - **Property 33: Filename uniqueness**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.9**

  - [ ] 4.3 Write unit tests for image upload error handling
    - Test upload failure retry logic
    - Test network timeout handling
    - _Requirements: 10.4_

- [ ] 5. Implement profile and draft services
  - [ ] 5.1 Create ProfileService class for pet profile creation
    - Implement age calculation from birthday
    - Implement profile completeness score calculation
    - Implement Prisma pet record creation with all fields
    - Implement preference storage
    - _Requirements: 4.4, 8.3, 8.4, 8.6_

  - [ ] 5.2 Create DraftService class for auto-save functionality
    - Implement local storage save with encryption
    - Implement draft restoration on page load
    - Implement draft expiry logic (7 days)
    - Implement draft cleanup on successful submission
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 5.3 Write property tests for ProfileService and DraftService
    - **Property 17: Age calculation accuracy**
    - **Property 34: Auto-save on step completion**
    - **Property 35: Draft restoration**
    - **Property 36: Draft cleanup on submission**
    - **Property 37: Draft encryption**
    - **Property 42: Completeness score calculation**
    - **Validates: Requirements 4.4, 4.5, 6.4, 7.5, 8.6, 9.1, 9.2, 9.3, 9.5**

  - [ ] 5.4 Write unit tests for draft expiry
    - Test draft older than 7 days is discarded
    - _Requirements: 9.4_

- [ ] 6. Checkpoint - Ensure all service layer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement authentication API routes
  - [ ] 7.1 Create /api/auth/signup route
    - Validate request body with Zod schema
    - Call AuthService.signup()
    - Set session cookies
    - Return user ID and session
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 1.6_

  - [ ] 7.2 Create /api/auth/login route
    - Validate request body with Zod schema
    - Call AuthService.login()
    - Set session cookies
    - Return user ID and session
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [ ] 7.3 Create /api/auth/verify route
    - Extract token from query params
    - Call AuthService.verifyEmail()
    - Update user emailVerified status
    - _Requirements: 3.2_

  - [ ] 7.4 Create /api/auth/resend-verification route
    - Validate user ID
    - Call AuthService.resendVerificationEmail()
    - Handle rate limiting
    - _Requirements: 3.5, 3.6_

  - [ ] 7.5 Write integration tests for auth API routes
    - Test complete signup → verify → login flow
    - Test rate limiting enforcement
    - Test error responses
    - _Requirements: 1.1, 2.1, 2.5, 3.1, 3.2_

- [ ] 8. Implement profile and upload API routes
  - [ ] 8.1 Create /api/upload/image route
    - Validate file upload
    - Call ImageService.processAndUpload()
    - Return public URL
    - _Requirements: 5.1, 5.2, 5.3, 5.8_

  - [ ] 8.2 Create /api/profile/create route
    - Validate complete profile data with Zod
    - Call ProfileService.createPetProfile()
    - Return pet ID and completeness score
    - _Requirements: 8.3, 8.4, 8.6_

  - [ ] 8.3 Write integration tests for profile API routes
    - Test complete profile creation flow
    - Test image upload and storage
    - _Requirements: 5.8, 8.3_

- [ ] 9. Implement Zustand store for onboarding wizard state
  - Create onboarding store with step navigation
  - Implement form data updates with auto-save integration
  - Implement draft restoration on store initialization
  - Implement profile submission action
  - _Requirements: 4.5, 6.4, 7.5, 9.1, 9.2_

- [ ] 9.1 Write property tests for store state management
  - **Property 34: Auto-save on step completion** (integration with DraftService)
  - **Property 35: Draft restoration** (integration with DraftService)
  - **Validates: Requirements 4.5, 6.4, 7.5, 9.1, 9.2**

- [ ] 10. Implement authentication UI components
  - [ ] 10.1 Create SignupForm component
    - Implement form with React Hook Form and Zod validation
    - Display field-level validation errors
    - Call /api/auth/signup on submit
    - Handle success and error states
    - _Requirements: 1.1, 1.3, 1.5, 1.6, 10.1, 10.2_

  - [ ] 10.2 Create LoginForm component
    - Implement form with React Hook Form and Zod validation
    - Display validation errors
    - Call /api/auth/login on submit
    - Handle rate limiting errors
    - _Requirements: 2.1, 2.2, 10.1, 10.2_

  - [ ] 10.3 Create EmailVerification component
    - Display verification status
    - Implement resend verification with cooldown timer
    - Handle verification link clicks
    - _Requirements: 3.1, 3.2, 3.5, 3.6_

  - [ ] 10.4 Write unit tests for auth components
    - Test form validation display
    - Test error message rendering
    - Test navigation flows
    - _Requirements: 10.1, 10.2_

- [ ] 11. Implement onboarding wizard container and navigation
  - [ ] 11.1 Create OnboardingWizard container component
    - Implement step navigation (next, previous, jump to step)
    - Integrate with Zustand store
    - Implement progress indicator
    - Block access if email not verified
    - _Requirements: 3.3, 8.2_

  - [ ] 11.2 Create wizard layout with step indicator
    - Display current step and total steps
    - Show progress bar
    - Implement mobile-responsive layout
    - _Requirements: 11.1_

  - [ ] 11.3 Write property tests for wizard navigation
    - **Property 39: Edit navigation**
    - **Validates: Requirements 8.2**

- [ ] 12. Implement Step 1: Basic Info form
  - [ ] 12.1 Create BasicInfoForm component
    - Implement form fields for name, species, breed, birthday, gender, size
    - Implement species-dependent breed dropdown
    - Display calculated age from birthday
    - Integrate with Zustand store
    - Call auto-save on completion
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6_

  - [ ] 12.2 Write property tests for Step 1
    - **Property 14: Required fields validation**
    - **Property 15: Species-breed relationship**
    - **Property 16: Birthday validation**
    - **Property 17: Age calculation accuracy**
    - **Property 18: Pet name length validation**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.6**

- [ ] 13. Implement Step 2: Photo Upload form
  - [ ] 13.1 Create PhotoUploadForm component
    - Implement drag-drop file upload
    - Implement photo preview with reordering
    - Implement photo count validation (4-9 photos)
    - Call /api/upload/image for each photo
    - Display upload progress
    - Integrate with Zustand store
    - _Requirements: 5.1, 5.2, 5.5, 5.6, 5.7, 5.8_

  - [ ] 13.2 Implement photo cropping interface
    - Display crop preview with 1:1 aspect ratio
    - Allow user to adjust crop area
    - _Requirements: 5.4_

  - [ ] 13.3 Write property tests for Step 2
    - **Property 26: Image format validation**
    - **Property 27: Image size validation**
    - **Property 30: Photo count validation**
    - **Property 31: Photo reordering**
    - **Property 32: Photo upload completion**
    - **Validates: Requirements 5.1, 5.2, 5.5, 5.6, 5.7, 5.8**

  - [ ] 13.4 Write unit tests for photo upload error handling
    - Test upload failure with retry
    - Test network error handling
    - _Requirements: 10.3, 10.4_

- [ ] 14. Implement Step 3: Personality and Bio form
  - [ ] 14.1 Create PersonalityBioForm component
    - Implement personality trait multi-select (3-8 traits)
    - Implement bio textarea with character counter
    - Validate prohibited content (URLs, phone, email)
    - Integrate with Zustand store
    - Call auto-save on completion
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ] 14.2 Write property tests for Step 3
    - **Property 19: Personality trait count validation**
    - **Property 20: Bio length and content validation**
    - **Property 21: Bio character counter accuracy**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.5**

- [ ] 15. Implement Step 4: Discovery Preferences form
  - [ ] 15.1 Create DiscoveryPreferencesForm component
    - Implement distance slider (1-100 miles)
    - Implement species filter multi-select
    - Implement age range inputs with validation
    - Integrate with Zustand store
    - Call auto-save on completion
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ] 15.2 Write property tests for Step 4
    - **Property 22: Distance preference validation**
    - **Property 23: Species filter validation**
    - **Property 24: Age range validation**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**

- [ ] 16. Implement Step 5: Profile Review and submission
  - [ ] 16.1 Create ProfileReview component
    - Display all entered data in organized sections
    - Implement edit buttons for each section
    - Implement final submit button
    - Call /api/profile/create on submit
    - Handle submission errors with retry
    - Redirect to main app on success
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 10.3_

  - [ ] 16.2 Write property tests for Step 5
    - **Property 38: Profile review display**
    - **Property 39: Edit navigation**
    - **Property 40: Profile persistence**
    - **Property 41: Profile activation**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**

  - [ ] 16.3 Write unit tests for submission error handling
    - Test network error with retry
    - Test redirect on success
    - _Requirements: 8.5, 10.3_

- [ ] 17. Checkpoint - Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 18. Implement mobile-specific features
  - [ ] 18.1 Add mobile camera access for photo upload
    - Configure file input to accept camera on mobile
    - Test camera access permissions
    - _Requirements: 11.2_

  - [ ] 18.2 Optimize touch interactions
    - Ensure all buttons meet 44px minimum tap target
    - Test touch-based drag-drop for photo reordering
    - _Requirements: 11.4_

  - [ ] 18.3 Write unit tests for mobile features
    - Test camera input configuration
    - _Requirements: 11.2_

- [ ] 19. Implement error boundary and global error handling
  - Create error boundary component for wizard
  - Implement global error toast notifications
  - Add error logging integration
  - _Requirements: 10.3, 10.4_

- [ ] 20. Create authentication pages and routing
  - [ ] 20.1 Create /signup page
    - Render SignupForm component
    - Redirect to email verification on success
    - _Requirements: 1.1_

  - [ ] 20.2 Create /login page
    - Render LoginForm component
    - Redirect to onboarding or main app based on profile status
    - _Requirements: 2.1_

  - [ ] 20.3 Create /auth/verify page
    - Render EmailVerification component
    - Handle token from URL query params
    - Redirect to onboarding on success
    - _Requirements: 3.2_

  - [ ] 20.4 Create /onboarding page
    - Render OnboardingWizard component
    - Protect route with email verification check
    - _Requirements: 3.3_

- [ ] 21. Implement protected route middleware
  - Create middleware to check authentication status
  - Redirect unauthenticated users to login
  - Redirect unverified users to verification page
  - Redirect users without profiles to onboarding
  - _Requirements: 2.4, 3.3, 12.4_

- [ ] 22. Add loading states and optimistic UI
  - Implement loading spinners for async operations
  - Add skeleton loaders for form fields
  - Implement optimistic updates for photo uploads
  - Add progress indicators for multi-step form
  - _Requirements: 5.8_

- [ ] 23. Implement accessibility features
  - Add ARIA labels to all form fields
  - Implement keyboard navigation for wizard steps
  - Add screen reader announcements for validation errors
  - Ensure proper focus management
  - Test with screen reader

- [ ] 24. Final integration testing and polish
  - [ ] 24.1 Write end-to-end integration tests
    - Test complete signup → verify → onboarding → profile creation flow
    - Test draft save and restore across page reloads
    - Test error recovery scenarios
    - _Requirements: 1.1, 2.1, 3.2, 4.5, 8.3, 9.2, 9.3_

  - [ ] 24.2 Performance optimization
    - Optimize image compression settings
    - Add lazy loading for wizard steps
    - Minimize bundle size
    - _Requirements: 5.3_

  - [ ] 24.3 Cross-browser testing
    - Test on Chrome, Firefox, Safari, Edge
    - Test on iOS and Android mobile browsers
    - Fix any browser-specific issues
    - _Requirements: 11.1_

- [ ] 25. Final checkpoint - Complete feature verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Integration tests verify end-to-end flows
- The implementation follows a bottom-up approach: services → API → UI → integration
- Auto-save functionality is integrated throughout the wizard steps
- Mobile responsiveness is built into each component
- Security measures (rate limiting, validation, encryption) are implemented at each layer
