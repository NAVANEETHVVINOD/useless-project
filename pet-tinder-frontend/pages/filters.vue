<template>
  <div class="flex items-center justify-center py-12">
    <div class="w-full max-w-2xl p-8 space-y-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg">
      
      <div class="text-center">
        <h1 class="font-heading text-5xl text-brand-brown">Set Your Preferences</h1>
        <p class="mt-2 text-text-light">Who are you looking for? Let's find the perfect friends for your pet.</p>
      </div>
      <hr class="border-brand-brown/10 my-6">

      <div class="space-y-8">
        <!-- 1. Friendship Type Selection -->
        <div>
          <label class="block text-lg font-bold text-brand-brown/80 mb-2">What kind of friendship?</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <button
              v-for="friendship in friendshipTypes" :key="friendship.id"
              @click="filters.friendshipType = friendship.id"
              :class="[
                'p-4 rounded-xl text-left transition-all',
                filters.friendshipType === friendship.id 
                  ? 'bg-brand-yellow text-brand-brown shadow-lg ring-2 ring-brand-brown' 
                  : 'bg-white/50 hover:bg-white/80'
              ]"
            >
              <span class="text-2xl">{{ friendship.emoji }}</span>
              <p class="font-bold mt-1">{{ friendship.name }}</p>
            </button>
          </div>
        </div>

        <!-- 2. Species Preference -->
        <div>
          <label class="block text-lg font-bold text-brand-brown/80 mb-2">What species are you open to?</label>
          <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
            <button
              v-for="species in allSpecies" :key="species"
              @click="toggleSpecies(species)"
              :class="[
                'py-2 px-4 rounded-xl font-semibold transition-all',
                filters.species.includes(species)
                  ? 'bg-brand-brown text-white'
                  : 'bg-white/50 hover:bg-white/80 text-brand-brown'
              ]"
            >
              {{ species }}
            </button>
          </div>
        </div>

        <!-- 3. Breed Preferences as Buttons -->
        <div v-if="filters.species.length > 0" class="space-y-6">
          <label class="block text-lg font-bold text-brand-brown/80">Any breed preferences?</label>
          <p class="text-sm text-text-light -mt-3">Choose preferred breeds. Or skip if your pet isn't picky.</p>

          <div v-for="speciesName in filters.species" :key="speciesName">
            <label class="block font-bold text-brand-brown/90 mb-2">{{ speciesName }} Breeds</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="breed in breedData[speciesName] || []"
                :key="breed"
                @click="toggleBreed(speciesName, breed)"
                :class="[
                  'px-4 py-2 rounded-full transition-all text-sm font-medium',
                  isBreedSelected(speciesName, breed)
                    ? 'bg-brand-yellow text-brand-brown ring-2 ring-brand-brown'
                    : 'bg-white/50 hover:bg-white/80 text-brand-brown'
                ]"
              >
                {{ breed }}
              </button>
            </div>
          </div>
        </div>

        <!-- 4. Location -->
        <FormInput 
          id="city" 
          label="In which city?" 
          v-model="filters.city" 
          placeholder="e.g., New York" 
        />

        <!-- 5. Distance Radius -->
        <div>
          <label for="distance" class="block text-lg font-bold text-brand-brown/80 mb-2">
            Distance Radius: 
            <span class="text-brand-brown font-heading text-2xl">{{ filters.distance }} km</span>
          </label>
          <input 
            id="distance"
            type="range"
            min="1"
            max="50"
            v-model="filters.distance"
            class="w-full h-2 bg-brand-pink-dark rounded-lg appearance-none cursor-pointer"
          >
        </div>
      </div>

      <!-- Final Button -->
      <div class="flex justify-end mt-8">
        <FormButton @click="startSwiping" type="button" class="!w-auto !px-8">
          Start Swiping →
        </FormButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '~/components/form/FormInput.vue';
import FormButton from '~/components/form/FormButton.vue';

const router = useRouter();

// --- State ---
const filters = ref({
  friendshipType: 'playdate',
  species: [],
  breeds: {}, // e.g., { Dog: ['Beagle'], Cat: ['Any'] }
  city: '',
  distance: 25,
});

const friendshipTypes = [
  { id: 'playdate', name: 'Playdate', emoji: '🐾' },
  { id: 'dating', name: 'Dating', emoji: '💞' },
  { id: 'companion', name: 'Long-term', emoji: '🏠' },
];

const allSpecies = ['Dog', 'Cat', 'Bird', 'Fish', 'Hamster', 'Horse', 'Other'];

const breedData = {
  Dog: ['Beagle', 'Golden Retriever', 'Poodle', 'Husky', 'German Shepherd'],
  Cat: ['Siamese', 'Persian', 'Maine Coon', 'Sphynx'],
  Bird: ['Parakeet', 'Cockatiel', 'Macaw'],
  Fish: ['Goldfish', 'Betta', 'Guppy'],
  Hamster: ['Syrian', 'Dwarf', 'Roborovski'],
  Horse: ['Thoroughbred', 'Quarter Horse', 'Arabian'],
  Other: ['Any']
};

// --- Logic ---
const toggleSpecies = (species) => {
  const index = filters.value.species.indexOf(species);
  if (index > -1) {
    filters.value.species.splice(index, 1);
    delete filters.value.breeds[species];
  } else {
    filters.value.species.push(species);
    filters.value.breeds[species] = [];
  }
};

const toggleBreed = (species, breed) => {
  const selectedBreeds = filters.value.breeds[species] || [];
  const index = selectedBreeds.indexOf(breed);
  if (index > -1) {
    selectedBreeds.splice(index, 1);
  } else {
    selectedBreeds.push(breed);
  }
  filters.value.breeds[species] = selectedBreeds;
};

const isBreedSelected = (species, breed) => {
  return filters.value.breeds[species]?.includes(breed);
};

const startSwiping = () => {
  console.log("Applying filters:", filters.value);
  router.push('/swipe');
};
</script>
