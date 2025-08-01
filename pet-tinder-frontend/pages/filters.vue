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
              :class="['p-4 rounded-xl text-left transition-all', filters.friendshipType === friendship.id ? 'bg-brand-yellow text-brand-brown shadow-lg ring-2 ring-brand-brown' : 'bg-white/50 hover:bg-white/80']"
            >
              <span class="text-2xl">{{ friendship.emoji }}</span>
              <p class="font-bold mt-1">{{ friendship.name }}</p>
            </button>
          </div>
        </div>

        <!-- 2. Species Preference (Multi-select) -->
        <div>
          <label class="block text-lg font-bold text-brand-brown/80 mb-2">What species are you open to?</label>
          <div class="grid grid-cols-3 sm:grid-cols-4 gap-3">
            <button
              v-for="species in allSpecies" :key="species"
              @click="toggleSpecies(species)"
              :class="['py-2 px-4 rounded-xl font-semibold transition-all', filters.species.includes(species) ? 'bg-brand-brown text-white' : 'bg-white/50 hover:bg-white/80']"
            >
              {{ species }}
            </button>
          </div>
        </div>

        <!-- 3. Breed Preference (Conditional & Dynamic) -->
        <div v-if="filters.species.length > 0" class="space-y-4">
          <label class="block text-lg font-bold text-brand-brown/80">Any breed preferences?</label>
          <p class="text-sm text-text-light -mt-3">Looking for a fellow Beagle to share your love for howling? Or will anyone with four paws do?</p>
          <!-- Loop through each SELECTED species to show its breed dropdown -->
          <div v-for="speciesName in filters.species" :key="speciesName">
            <label :for="`breed-${speciesName}`" class="block font-bold text-brand-brown/90 mb-1">{{ speciesName }} Breeds</label>
            <select :id="`breed-${speciesName}`" v-model="filters.breeds[speciesName]" multiple class="w-full px-4 py-3 bg-white/50 border-2 border-brand-pink-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow h-24">
              <option v-for="breed in breedData[speciesName]" :key="breed" :value="breed">{{ breed }}</option>
            </select>
            <p class="text-xs text-text-light mt-1">Hold Ctrl/Cmd to select multiple breeds.</p>
          </div>
        </div>

        <!-- 4. Location Filter -->
        <FormInput 
          id="city" 
          label="In which city?" 
          v-model="filters.city" 
          placeholder="e.g., New York" 
        />

        <!-- 5. Distance Radius -->
        <div>
          <label for="distance" class="block text-lg font-bold text-brand-brown/80 mb-2">Distance Radius: <span class="text-brand-brown font-heading text-2xl">{{ filters.distance }} km</span></label>
          <input 
            id="distance"
            type="range"
            min="1"
            max="50"
            v-model="filters.distance"
            class="w-full h-2 bg-brand-pink-dark rounded-lg appearance-none cursor-pointer range-thumb:bg-brand-yellow"
          >
        </div>
      </div>

      <!-- Navigation Button -->
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
import FormInput from '~/components/form/FormInput.vue';
import FormButton from '~/components/form/FormButton.vue';

const router = useRouter();

// --- Filter Data & State ---
const filters = ref({
  friendshipType: 'playdate',
  species: [],
  breeds: {}, // e.g., { Dog: ['Beagle'], Cat: ['Any Cat Breed'] }
  city: '',
  distance: 25,
});

const friendshipTypes = [
  { id: 'playdate', name: 'Playdate', emoji: '🐾' },
  { id: 'dating', name: 'Dating', emoji: '💞' },
  { id: 'companion', name: 'Long-term', emoji: '🏠' },
];

const allSpecies = ['Dog', 'Cat', 'Bird', 'Fish', 'Hamster', 'Horse', 'Other'];

// This data powers the dynamic breed dropdowns
const breedData = {
  Dog: ['Any Dog Breed', 'Beagle', 'Golden Retriever', 'Poodle', 'Husky', 'German Shepherd'],
  Cat: ['Any Cat Breed', 'Siamese', 'Persian', 'Maine Coon', 'Sphynx'],
  Bird: ['Any Bird', 'Parakeet', 'Cockatiel', 'Macaw'],
  Horse: ['Any Horse Breed', 'Thoroughbred', 'Quarter Horse', 'Arabian'],
  // Add other species here if they have distinct breeds
};

// --- Component Logic ---
const toggleSpecies = (speciesName) => {
  const index = filters.value.species.indexOf(speciesName);
  if (index > -1) {
    // If it exists, remove it
    filters.value.species.splice(index, 1);
    // Also remove any breed selections for this species
    delete filters.value.breeds[speciesName];
  } else {
    // If it doesn't exist, add it (and check if it has breed data)
    filters.value.species.push(speciesName);
    if (breedData[speciesName]) {
      // Initialize its breed selection with 'Any Breed'
      filters.value.breeds[speciesName] = [breedData[speciesName][0]];
    }
  }
};

const startSwiping = () => {
  console.log("Applying filters:", JSON.parse(JSON.stringify(filters.value)));
  router.push('/swipe');
};
</script>