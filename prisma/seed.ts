import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Dummy data sets
const SPECIES = ['dog', 'cat', 'rabbit']
const SIZES = ['small', 'medium', 'large']
const GENDERS = ['male', 'female']
const PERSONALITIES = ['Playful', 'Energetic', 'Calm', 'Friendly', 'Cuddly', 'Independent', 'Goofy']
const BREEDS = {
  dog: ['Golden Retriever', 'French Bulldog', 'Poodle', 'German Shepherd', 'Mixed', 'Corgi'],
  cat: ['Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'Mixed'],
  rabbit: ['Holland Lop', 'Mini Rex', 'Lionhead', 'Mixed'],
}

const DOG_PHOTOS = [
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
  'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
  'https://images.unsplash.com/photo-1537151608804-ea2d14c36e86'
]

const CAT_PHOTOS = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d',
  'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5'
]

const RABBIT_PHOTOS = [
  'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5088',
  'https://images.unsplash.com/photo-1518796745738-41048802f99a'
]

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomPhoto(species: string) {
  let arr = DOG_PHOTOS;
  if(species === 'cat') arr = CAT_PHOTOS;
  if(species === 'rabbit') arr = RABBIT_PHOTOS;
  return arr[getRandomInt(0, arr.length - 1)] + '?q=80&w=600&auto=format&fit=crop';
}

async function main() {
  console.log('Seeding database...')

  // Create a dummy user to own these pets
  const dummyUser = await prisma.user.upsert({
    where: { email: 'dummy@kanya.dev' },
    update: {},
    create: {
      email: 'dummy@kanya.dev',
      firstName: 'System',
      lastName: 'Robot',
      preferences: {
        maxDistance: 50,
        speciesFilter: ['dog', 'cat'],
        ageRange: { min: 0, max: 20 }
      }
    },
  })

  // Generate 50 dummy pets
  for (let i = 1; i <= 50; i++) {
    const species = SPECIES[getRandomInt(0, SPECIES.length - 1)]
    const speciesBreeds = BREEDS[species as keyof typeof BREEDS] || ['Mixed']
    
    // Random Birthday between 6 months and 10 years ago
    const birthday = new Date()
    birthday.setMonth(birthday.getMonth() - getRandomInt(6, 120))
    
    const photoUrl = getRandomPhoto(species)

    await prisma.pet.create({
      data: {
        ownerId: dummyUser.id,
        name: `Pet Buddy ${i}`,
        species: species,
        breed: speciesBreeds[getRandomInt(0, speciesBreeds.length - 1)],
        birthday: birthday,
        gender: GENDERS[getRandomInt(0, GENDERS.length - 1)],
        size: SIZES[getRandomInt(0, SIZES.length - 1)],
        bio: `Hi! I'm a very good ${species}. Please swipe right if you want to be friends and go to the park!`,
        photos: [photoUrl, photoUrl], // Two photos for the array
        personality: getRandomItems(PERSONALITIES, 3),
        isActive: true,
      }
    })
  }

  console.log('Database seeded with 50 pets!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
