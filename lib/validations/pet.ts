import { z } from 'zod';

/**
 * Validation schemas for pet profile forms
 */

// Species and breed data
export const SPECIES = ['dog', 'cat', 'bird', 'rabbit', 'other'] as const;
export const GENDERS = ['male', 'female', 'neutered', 'spayed'] as const;
export const SIZES = ['small', 'medium', 'large', 'giant'] as const;

// Personality traits
export const PERSONALITY_TRAITS = [
  'Playful', 'Energetic', 'Calm', 'Friendly', 'Shy',
  'Adventurous', 'Cuddly', 'Independent', 'Social', 'Loyal',
  'Curious', 'Gentle', 'Protective', 'Goofy', 'Smart'
] as const;

// Step 1: Basic Info
export const basicInfoSchema = z.object({
  name: z.string()
    .min(1, 'Pet name is required')
    .max(50, 'Pet name must be under 50 characters'),
  species: z.enum(SPECIES, {
    error: 'Please select a species'
  }),
  breed: z.string()
    .min(1, 'Breed is required'),
  birthday: z.date({
    error: 'Birthday is required and must be a valid date'
  })
    .max(new Date(), 'Birthday cannot be in the future')
    .refine((date) => {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return date <= sixMonthsAgo;
    }, 'Pet must be at least 6 months old'),
  gender: z.enum(GENDERS, {
    error: 'Please select a gender'
  }),
  size: z.enum(SIZES, {
    error: 'Please select a size'
  })
});

// Step 2: Photos
export const photoSchema = z.object({
  id: z.string(),
  file: z.instanceof(File).optional(),
  preview: z.string(),
  uploadUrl: z.string().optional(),
  order: z.number()
});

export const photosSchema = z.object({
  photos: z.array(photoSchema)
    .min(4, 'At least 4 photos are required')
    .max(9, 'Maximum 9 photos allowed')
});

// Step 3: Personality & Bio
const containsProhibitedContent = (text: string): boolean => {
  const urlPattern = /https?:\/\/|www\./i;
  const phonePattern = /\d{3}[-.]?\d{3}[-.]?\d{4}/;
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  
  return urlPattern.test(text) || 
         phonePattern.test(text) || 
         emailPattern.test(text);
};

export const personalityBioSchema = z.object({
  personality: z.array(z.string())
    .min(3, 'Select at least 3 personality traits')
    .max(8, 'Select up to 8 personality traits'),
  bio: z.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must be under 500 characters')
    .refine((bio) => !containsProhibitedContent(bio), {
      message: 'Bio cannot contain URLs, phone numbers, or email addresses'
    })
});

// Step 4: Discovery Preferences
export const preferencesSchema = z.object({
  maxDistance: z.number()
    .min(1, 'Distance must be at least 1 mile')
    .max(100, 'Distance cannot exceed 100 miles'),
  speciesFilter: z.array(z.string())
    .min(1, 'Select at least one species'),
  ageRange: z.object({
    min: z.number().min(0).max(25),
    max: z.number().min(0).max(25)
  }).refine((range) => range.min < range.max, {
    message: 'Minimum age must be less than maximum age'
  })
});

// Complete profile schema
export const petProfileSchema = z.object({
  name: z.string().min(1).max(50),
  species: z.enum(SPECIES),
  breed: z.string().min(1),
  birthday: z.date(),
  gender: z.enum(GENDERS),
  size: z.enum(SIZES),
  photos: z.array(photoSchema).min(4).max(9),
  personality: z.array(z.string()).min(3).max(8),
  bio: z.string().min(50).max(500),
  preferences: preferencesSchema
});

// Type exports
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type PhotoData = z.infer<typeof photoSchema>;
export type PhotosFormData = z.infer<typeof photosSchema>;
export type PersonalityBioFormData = z.infer<typeof personalityBioSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
export type PetProfileFormData = z.infer<typeof petProfileSchema>;
