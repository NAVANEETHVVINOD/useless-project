/**
 * Property-based tests for validation schemas
 * Using fast-check for property-based testing
 */

import * as fc from 'fast-check';
import {
  signupSchema,
  loginSchema,
} from '../auth';
import {
  basicInfoSchema,
  photosSchema,
  personalityBioSchema,
  preferencesSchema,
  SPECIES,
  GENDERS,
  SIZES,
  PERSONALITY_TRAITS,
} from '../pet';

describe('Validation Schema Property Tests', () => {
  /**
   * Property 3: Password security requirements
   * For any password string, it should be accepted if and only if it contains
   * at least 8 characters, at least one uppercase letter, at least one lowercase letter,
   * and at least one number.
   * Validates: Requirements 1.3
   */
  describe('Property 3: Password security requirements', () => {
    it('should accept passwords with 8+ chars, uppercase, lowercase, and number', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 8, maxLength: 50 })
            .filter(s => /[A-Z]/.test(s) && /[a-z]/.test(s) && /[0-9]/.test(s)),
          (password) => {
            const result = signupSchema.safeParse({
              email: 'test@example.com',
              password,
              confirmPassword: password
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject passwords without uppercase letter', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 8, maxLength: 50 })
            .filter(s => !/[A-Z]/.test(s) && /[a-z]/.test(s) && /[0-9]/.test(s)),
          (password) => {
            const result = signupSchema.safeParse({
              email: 'test@example.com',
              password,
              confirmPassword: password
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject passwords without lowercase letter', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 8, maxLength: 50 })
            .filter(s => /[A-Z]/.test(s) && !/[a-z]/.test(s) && /[0-9]/.test(s)),
          (password) => {
            const result = signupSchema.safeParse({
              email: 'test@example.com',
              password,
              confirmPassword: password
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject passwords without number', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 8, maxLength: 50 })
            .filter(s => /[A-Z]/.test(s) && /[a-z]/.test(s) && !/[0-9]/.test(s)),
          (password) => {
            const result = signupSchema.safeParse({
              email: 'test@example.com',
              password,
              confirmPassword: password
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject passwords shorter than 8 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 7 }),
          (password) => {
            const result = signupSchema.safeParse({
              email: 'test@example.com',
              password,
              confirmPassword: password
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 5: Email format validation
   * For any email string, it should be accepted if and only if it conforms
   * to RFC 5322 email format standard.
   * Validates: Requirements 1.5
   */
  describe('Property 5: Email format validation', () => {
    it('should accept valid email formats', () => {
      // Use a more restrictive email generator that Zod will accept
      // Local part: alphanumeric, dots, underscores, hyphens (but not starting/ending with special chars)
      const validEmailArb = fc.tuple(
        fc.stringMatching(/^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*$/),
        fc.stringMatching(/^[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*$/),
        fc.stringMatching(/^[a-zA-Z]{2,}$/)
      ).map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

      fc.assert(
        fc.property(
          validEmailArb,
          (email) => {
            const result = loginSchema.safeParse({
              email,
              password: 'Test1234'
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject strings without @ symbol', () => {
      fc.assert(
        fc.property(
          fc.string().filter(s => !s.includes('@')),
          (email) => {
            const result = loginSchema.safeParse({
              email,
              password: 'Test1234'
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 14: Required fields validation
   * For any pet profile form submission, all required fields must be present
   * and non-empty, otherwise submission should be rejected.
   * Validates: Requirements 4.1
   */
  describe('Property 14: Required fields validation', () => {
    it('should accept when all required fields are present', () => {
      const sevenMonthsAgo = new Date();
      sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7);
      
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          fc.constantFrom(...SPECIES),
          fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          fc.date({ min: new Date('2020-01-01'), max: sevenMonthsAgo }).filter(d => !isNaN(d.getTime())),
          fc.constantFrom(...GENDERS),
          fc.constantFrom(...SIZES),
          (name, species, breed, birthday, gender, size) => {
            const result = basicInfoSchema.safeParse({
              name,
              species,
              breed,
              birthday,
              gender,
              size
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject when name is empty', () => {
      const result = basicInfoSchema.safeParse({
        name: '',
        species: 'dog',
        breed: 'Labrador',
        birthday: new Date('2023-01-01'),
        gender: 'male',
        size: 'large'
      });
      expect(result.success).toBe(false);
    });
  });

  /**
   * Property 16: Birthday validation
   * For any birthday date, it should be accepted if and only if it is not in
   * the future and represents a pet at least 6 months old.
   * Validates: Requirements 4.3
   */
  describe('Property 16: Birthday validation', () => {
    it('should accept dates at least 6 months old', () => {
      // Calculate 7 months ago to ensure we're safely past the 6-month threshold
      const sevenMonthsAgo = new Date();
      sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 7);
      
      fc.assert(
        fc.property(
          fc.date({
            min: new Date('2020-01-01'),
            max: sevenMonthsAgo
          }).filter(d => !isNaN(d.getTime())), // Filter out invalid dates
          (birthday) => {
            const result = basicInfoSchema.safeParse({
              name: 'Test',
              species: 'dog',
              breed: 'Labrador',
              birthday,
              gender: 'male',
              size: 'large'
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject future dates', () => {
      fc.assert(
        fc.property(
          fc.date({ min: new Date(Date.now() + 24 * 60 * 60 * 1000) }),
          (birthday) => {
            const result = basicInfoSchema.safeParse({
              name: 'Test',
              species: 'dog',
              breed: 'Labrador',
              birthday,
              gender: 'male',
              size: 'large'
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject dates less than 6 months old', () => {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      const result = basicInfoSchema.safeParse({
        name: 'Test',
        species: 'dog',
        breed: 'Labrador',
        birthday: threeMonthsAgo,
        gender: 'male',
        size: 'large'
      });
      expect(result.success).toBe(false);
    });
  });

  /**
   * Property 18: Pet name length validation
   * For any pet name string, it should be accepted if and only if its length
   * is between 1 and 50 characters inclusive.
   * Validates: Requirements 4.6
   */
  describe('Property 18: Pet name length validation', () => {
    it('should accept names between 1 and 50 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }),
          (name) => {
            const result = basicInfoSchema.safeParse({
              name,
              species: 'dog',
              breed: 'Labrador',
              birthday: new Date('2023-01-01'),
              gender: 'male',
              size: 'large'
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject names longer than 50 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 51, maxLength: 100 }),
          (name) => {
            const result = basicInfoSchema.safeParse({
              name,
              species: 'dog',
              breed: 'Labrador',
              birthday: new Date('2023-01-01'),
              gender: 'male',
              size: 'large'
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 19: Personality trait count validation
   * For any personality trait selection, it should be accepted if and only if
   * the number of selected traits is between 3 and 8 inclusive.
   * Validates: Requirements 6.1
   */
  describe('Property 19: Personality trait count validation', () => {
    it('should accept 3-8 personality traits', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 3, max: 8 }).chain(count =>
            fc.shuffledSubarray(Array.from(PERSONALITY_TRAITS), { minLength: count, maxLength: count })
          ),
          fc.string({ minLength: 50, maxLength: 500 })
            .filter(s => !/(https?:\/\/|www\.)/.test(s))
            .filter(s => !/\d{3}[-.]?\d{3}[-.]?\d{4}/.test(s))
            .filter(s => !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(s)),
          (personality, bio) => {
            const result = personalityBioSchema.safeParse({
              personality,
              bio
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject fewer than 3 traits', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 2 }).chain(count =>
            fc.shuffledSubarray(Array.from(PERSONALITY_TRAITS), { minLength: count, maxLength: count })
          ),
          fc.string({ minLength: 50, maxLength: 500 }),
          (personality, bio) => {
            const result = personalityBioSchema.safeParse({
              personality,
              bio
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject more than 8 traits', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 9, max: 15 }).chain(count =>
            fc.shuffledSubarray(Array.from(PERSONALITY_TRAITS), { minLength: count, maxLength: count })
          ),
          fc.string({ minLength: 50, maxLength: 500 }),
          (personality, bio) => {
            const result = personalityBioSchema.safeParse({
              personality,
              bio
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 20: Bio length and content validation
   * For any bio string, it should be accepted if and only if its length is
   * between 50 and 500 characters and it does not contain URLs, phone numbers,
   * or email addresses.
   * Validates: Requirements 6.2, 6.3
   */
  describe('Property 20: Bio length and content validation', () => {
    it('should accept bios between 50-500 chars without prohibited content', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 50, maxLength: 500 })
            .filter(s => !/(https?:\/\/|www\.)/.test(s))
            .filter(s => !/\d{3}[-.]?\d{3}[-.]?\d{4}/.test(s))
            .filter(s => !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(s)),
          fc.array(fc.constantFrom(...PERSONALITY_TRAITS), { minLength: 3, maxLength: 8 }),
          (bio, personality) => {
            const result = personalityBioSchema.safeParse({
              personality,
              bio
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject bios shorter than 50 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 49 }),
          fc.array(fc.constantFrom(...PERSONALITY_TRAITS), { minLength: 3, maxLength: 8 }),
          (bio, personality) => {
            const result = personalityBioSchema.safeParse({
              personality,
              bio
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject bios longer than 500 characters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 501, maxLength: 1000 }),
          fc.array(fc.constantFrom(...PERSONALITY_TRAITS), { minLength: 3, maxLength: 8 }),
          (bio, personality) => {
            const result = personalityBioSchema.safeParse({
              personality,
              bio
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject bios containing URLs', () => {
      const biosWithUrls = [
        'This is a test bio with http://example.com in it. '.repeat(3),
        'Check out www.example.com for more info. '.repeat(3),
        'Visit https://test.com to learn more about my pet. '.repeat(2)
      ];

      biosWithUrls.forEach(bio => {
        const result = personalityBioSchema.safeParse({
          personality: ['Playful', 'Friendly', 'Energetic'],
          bio
        });
        expect(result.success).toBe(false);
      });
    });
  });

  /**
   * Property 22: Distance preference validation
   * For any distance value, it should be accepted if and only if it is
   * between 1 and 100 miles inclusive.
   * Validates: Requirements 7.1
   */
  describe('Property 22: Distance preference validation', () => {
    it('should accept distances between 1 and 100 miles', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 100 }),
          (maxDistance) => {
            const result = preferencesSchema.safeParse({
              maxDistance,
              speciesFilter: ['dog'],
              ageRange: { min: 0, max: 10 }
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject distances less than 1 mile', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: -100, max: 0 }),
          (maxDistance) => {
            const result = preferencesSchema.safeParse({
              maxDistance,
              speciesFilter: ['dog'],
              ageRange: { min: 0, max: 10 }
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject distances greater than 100 miles', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 101, max: 1000 }),
          (maxDistance) => {
            const result = preferencesSchema.safeParse({
              maxDistance,
              speciesFilter: ['dog'],
              ageRange: { min: 0, max: 10 }
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Property 24: Age range validation
   * For any age range with minimum and maximum values, it should be accepted
   * if and only if both values are between 0 and 25 years inclusive, and the
   * minimum is strictly less than the maximum.
   * Validates: Requirements 7.3, 7.4
   */
  describe('Property 24: Age range validation', () => {
    it('should accept valid age ranges where min < max', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 24 }),
          fc.integer({ min: 1, max: 25 }),
          (min, max) => {
            fc.pre(min < max);
            const result = preferencesSchema.safeParse({
              maxDistance: 50,
              speciesFilter: ['dog'],
              ageRange: { min, max }
            });
            expect(result.success).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject age ranges where min >= max', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 25 }),
          fc.integer({ min: 0, max: 25 }),
          (min, max) => {
            fc.pre(min >= max);
            const result = preferencesSchema.safeParse({
              maxDistance: 50,
              speciesFilter: ['dog'],
              ageRange: { min, max }
            });
            expect(result.success).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reject age ranges outside 0-25 bounds', () => {
      const result1 = preferencesSchema.safeParse({
        maxDistance: 50,
        speciesFilter: ['dog'],
        ageRange: { min: -1, max: 10 }
      });
      expect(result1.success).toBe(false);

      const result2 = preferencesSchema.safeParse({
        maxDistance: 50,
        speciesFilter: ['dog'],
        ageRange: { min: 0, max: 26 }
      });
      expect(result2.success).toBe(false);
    });
  });
});
