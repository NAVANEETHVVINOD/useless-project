import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { PetProfileSchema } from '@/lib/validations/pet';
import { calculateAge } from '@/lib/utils/age';

export class ProfileService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPetProfile(
    userId: string,
    petData: z.infer<typeof PetProfileSchema>
  ) {
    try {
      const validatedPetData = PetProfileSchema.parse(petData);
      const age = calculateAge(validatedPetData.birthday);

      const { preferences, ...restOfPetData } = validatedPetData;

      const pet = await this.prisma.pet.create({
        data: {
          ...restOfPetData,
          ownerId: userId,
          age,
          // TODO: Implement zodiac sign calculation
          zodiacSign: '',
          // TODO: Implement completeness score calculation
          popularityScore: 0,
        },
      });

      if (preferences) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { preferences: preferences as any },
        });
      }
      
      return pet;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error('Invalid pet data');
      }
      throw error;
    }
  }

  calculateProfileCompleteness(pet: any): number {
    // TODO: Implement this
    return 0;
  }
}
