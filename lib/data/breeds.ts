/**
 * Breed options organized by species
 */

export const breedsBySpecies: Record<string, string[]> = {
  dog: [
    'Mixed Breed',
    'Labrador Retriever',
    'Golden Retriever',
    'German Shepherd',
    'Bulldog',
    'Beagle',
    'Poodle',
    'Rottweiler',
    'Yorkshire Terrier',
    'Boxer',
    'Dachshund',
    'Siberian Husky',
    'Great Dane',
    'Doberman Pinscher',
    'Shih Tzu',
    'Boston Terrier',
    'Pomeranian',
    'Havanese',
    'Shetland Sheepdog',
    'Brittany',
    'Pembroke Welsh Corgi',
    'Australian Shepherd',
    'Cavalier King Charles Spaniel',
    'Miniature Schnauzer',
    'Cocker Spaniel',
    'Border Collie',
    'Chihuahua',
    'French Bulldog',
    'Pug',
    'Other'
  ],
  cat: [
    'Mixed Breed',
    'Persian',
    'Maine Coon',
    'Siamese',
    'Ragdoll',
    'Bengal',
    'Abyssinian',
    'Birman',
    'Oriental Shorthair',
    'Sphynx',
    'Devon Rex',
    'American Shorthair',
    'British Shorthair',
    'Scottish Fold',
    'Russian Blue',
    'Norwegian Forest Cat',
    'Siberian',
    'Burmese',
    'Himalayan',
    'Exotic Shorthair',
    'Manx',
    'Cornish Rex',
    'Tonkinese',
    'Turkish Angora',
    'Balinese',
    'Other'
  ],
  bird: [
    'Parrot',
    'Cockatiel',
    'Budgerigar (Budgie)',
    'Canary',
    'Finch',
    'Lovebird',
    'Conure',
    'African Grey',
    'Macaw',
    'Cockatoo',
    'Parakeet',
    'Dove',
    'Pigeon',
    'Mynah',
    'Toucan',
    'Other'
  ],
  rabbit: [
    'Mixed Breed',
    'Holland Lop',
    'Netherland Dwarf',
    'Flemish Giant',
    'Mini Rex',
    'Lionhead',
    'Dutch',
    'English Lop',
    'French Lop',
    'Californian',
    'New Zealand',
    'Polish',
    'Angora',
    'Himalayan',
    'Rex',
    'Other'
  ],
  other: [
    'Other'
  ]
};

/**
 * Get breed options for a specific species
 */
export function getBreedsBySpecies(species: string): string[] {
  return breedsBySpecies[species] || ['Other'];
}
