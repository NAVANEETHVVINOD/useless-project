<template>
  <div class="flex items-center justify-center py-12">
    <div class="w-full max-w-2xl p-8 space-y-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg">
      
      <!-- Progress Bar -->
      <ProgressBar :currentStep="currentStep" :totalSteps="3" />
      <hr class="border-brand-primary/10 my-6">

      <!-- Step 1: The Basics -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h2 class="font-heading text-4xl text-brand-primary text-center">Let's Meet Your Pet</h2>
        <FormInput id="name" label="Pet's Name 🐾" v-model="petData.name" placeholder="e.g., Captain Fluffbutt" />

        <!-- Species Button Selector -->
        <div>
          <label class="form-label">Species</label>
          <div class="flex flex-wrap gap-3">
            <button v-for="s in commonSpecies" :key="s" @click="selectSpecies(s)" type="button"
              :class="['choice-btn', { 'active': petData.species === s && !showOtherSpeciesInput }]">
              {{ s }}
            </button>
            <button @click="selectSpecies('Other')" type="button" 
              :class="['choice-btn', { 'active': showOtherSpeciesInput }]">
              Other
            </button>
          </div>
          <FormInput v-if="showOtherSpeciesInput" id="otherSpecies" label="Custom Species" v-model="petData.species" class="mt-4" placeholder="e.g., Dragon" />
        </div>

        <!-- Breed Selector -->
        <div v-if="petData.species && breedOptions.length > 0">
          <label class="form-label">Breed</label>
          <div class="flex flex-wrap gap-3">
            <button v-for="breed in breedOptions" :key="breed" @click="selectBreed(breed)" type="button"
              :class="['choice-btn', { 'active': petData.breed === breed && !showOtherBreedInput }]">
              {{ breed }}
            </button>
            <button @click="selectBreed('Mixed')" type="button" 
              :class="['choice-btn', { 'active': petData.breed === 'Mixed' }]">
              Mixed
            </button>
            <button @click="selectBreed('Other')" type="button"
              :class="['choice-btn', { 'active': showOtherBreedInput }]">
              Other
            </button>
          </div>
          <FormInput v-if="showOtherBreedInput" id="otherBreed" label="Custom Breed" v-model="petData.breed" class="mt-4" placeholder="e.g., Majestic Mutt" />
        </div>

        <div>
          <FormInput id="dob" label="Date of Birth" type="date" v-model="petData.dob" />
          <div v-if="petData.starSignDetails" class="mt-2 space-y-1">
            <p class="text-sm text-brand-primary">
              Sarcastic Star Sign: <span class="font-bold">{{ petData.starSign }}</span> — "{{ petData.starSignDetails.title }}"
            </p>
            <p class="text-xs text-brand-primary/80 italic">{{ petData.starSignDetails.description }}</p>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div v-if="currentStep === 2" class="space-y-6">
        <h2 class="font-heading text-4xl text-brand-primary text-center">What's Their Vibe?</h2>
        <FormInput id="favCrime" label="Favorite Crime" v-model="petData.favCrime" placeholder="e.g., Grand Theft Sofa Cushion" />
        <FormInput id="anthem" label="My Anthem Would Be..." v-model="petData.anthem" placeholder="e.g., 'Who Let the Dogs Out'" />
        <div>
          <label class="form-label">AI-Generated Bio</label>
          <textarea v-model="petData.bio" rows="3" class="form-textarea" :placeholder="isGeneratingBio ? 'Generating brilliance...' : 'Click the button for a spicy bio...'"></textarea>
          <button @click="generateBio" type="button" class="mt-2 text-sm font-bold text-brand-primary hover:underline" :disabled="isGeneratingBio">
            {{ isGeneratingBio ? 'Thinking...' : '✨ Generate with AI' }}
          </button>
        </div>
      </div>

      <!-- Step 3 -->
      <div v-if="currentStep === 3" class="space-y-6">
        <h2 class="font-heading text-4xl text-brand-primary text-center">Show Them Off!</h2>
        <p class="text-center text-text-secondary -mt-4">You need at least one photo to continue.</p>
        <ImageUploader @files-updated="updateFiles" />
      </div>

      <!-- Error message -->
      <div v-if="errorMessage" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">
        {{ errorMessage }}
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center mt-8">
        <button v-if="currentStep > 1" @click="prevStep" class="font-bold text-brand-primary/80 hover:text-brand-primary transition-colors">← Back</button>
        <div v-else></div>
        <FormButton v-if="currentStep < 3" @click="nextStep" type="button" class="!w-auto !px-8">Next →</FormButton>
        <FormButton v-else @click="saveProfile" type="button" class="!w-auto !px-8">Save Profile</FormButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from '~/components/ProgressBar.vue';
import FormInput from '~/components/form/FormInput.vue';
import FormButton from '~/components/form/FormButton.vue';
import ImageUploader from '~/components/ImageUploader.vue';

const router = useRouter();
const currentStep = ref(1);
const errorMessage = ref('');
const isGeneratingBio = ref(false);

const petData = ref({
  name: '', species: '', breed: '', dob: '', starSign: '', starSignDetails: null,
  favCrime: '', anthem: '', bio: '', images: []
});

const commonSpecies = ['Dog', 'Cat', 'Bird', 'Fish', 'Horse'];
const breedData = {
  'Dog': ['Golden Retriever', 'Labrador', 'German Shepherd', 'Poodle', 'Beagle'],
  'Cat': ['Domestic Shorthair', 'Siamese', 'Persian', 'Maine Coon', 'Ragdoll'],
  'Bird': ['Parakeet', 'Cockatiel', 'Macaw'],
  'Fish': [], 'Horse': [],
};

const showOtherSpeciesInput = ref(false);
const showOtherBreedInput = ref(false);
const breedOptions = computed(() => breedData[petData.value.species] || []);

const selectSpecies = (species) => {
  if (species === 'Other') {
    showOtherSpeciesInput.value = true;
    petData.value.species = '';
  } else {
    showOtherSpeciesInput.value = false;
    petData.value.species = species;
  }
};

const selectBreed = (breed) => {
  if (breed === 'Other') {
    showOtherBreedInput.value = true;
    petData.value.breed = '';
  } else {
    showOtherBreedInput.value = false;
    petData.value.breed = breed;
  }
};

watch(() => petData.value.species, () => {
  petData.value.breed = '';
  showOtherBreedInput.value = false;
});

watch(() => petData.value.dob, (dob) => {
  if (!dob) return;
  const sign = getZodiacSign(dob);
  petData.value.starSign = sign;
  petData.value.starSignDetails = sarcasticHoroscopes[sign];
});

const sarcasticHoroscopes = {
  Aries: { title: "I bark first, think later.", description: "Expect spontaneous zoomies at 3am..." },
  Taurus: { title: "I was born to nap and snack.", description: "You’ll finally find that sunbeam..." },
  Gemini: { title: "I meow at doors until they're opened.", description: "Indecision rules your soul..." },
  Cancer: { title: "My emotional support human needs support.", description: "You're clingy, adorable..." },
  Leo: { title: "The entire world is my audience.", description: "Every squeaky toy is your stage..." },
  Virgo: { title: "I lick everything. For cleanliness.", description: "Hyper-obsessed with judging..." },
  Libra: { title: "I can’t decide which corner to pee in.", description: "Balance and 3 meals a day..." },
  Scorpio: { title: "I bite out of love.", description: "Intense. Mysterious. Sock hoarder." },
  Sagittarius: { title: "I once escaped through a cat flap into an Uber.", description: "You bark at trees." },
  Capricorn: { title: "Building my kibble empire.", description: "CEO of Sit. Strategic chewer." },
  Aquarius: { title: "I only drink from the tap.", description: "Building secret tunnels since birth." },
  Pisces: { title: "I cry at sad songs and trucks.", description: "Probably reincarnated soap star." },
};

function getZodiacSign(dateStr) {
  const d = new Date(dateStr);
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return "Aries";
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return "Taurus";
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return "Gemini";
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return "Cancer";
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return "Leo";
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return "Virgo";
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return "Libra";
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return "Scorpio";
  if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return "Sagittarius";
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return "Capricorn";
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return "Aquarius";
  if ((m === 2 && day >= 19) || (m === 3 && day <= 20)) return "Pisces";
  return '';
}

const validateStep1 = () => {
  if (!petData.value.name) return "Pet's name is required.";
  if (!petData.value.species) return "Please select a species.";
  if (!petData.value.breed) return "Please select a breed.";
  if (!petData.value.dob) return "Please enter a date of birth.";
  return '';
};

const nextStep = () => {
  errorMessage.value = '';
  if (currentStep.value === 1) {
    const err = validateStep1();
    if (err) {
      errorMessage.value = err;
      return;
    }
  }
  if (currentStep.value < 3) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--;
};

const saveProfile = () => {
  console.log("Submitting profile:", petData.value);
  router.push('/filters'); // 👈 Navigate to filter.vue page
};

const updateFiles = (files) => {
  petData.value.images = files;
};

const generateBio = async () => {
  isGeneratingBio.value = true;
  setTimeout(() => {
    petData.value.bio = "I chase squirrels, judge humans silently, and sing to the moon.";
    isGeneratingBio.value = false;
  }, 1500);
};
</script>

<style scoped>
.choice-btn {
  @apply px-5 py-2 rounded-full border-2 border-brand-primary/30 bg-white/50 text-brand-primary font-semibold transition-all hover:bg-brand-primary/10;
}
.choice-btn.active {
  @apply bg-brand-primary text-white border-brand-primary;
}
.form-label {
  @apply block text-sm font-bold text-brand-primary/90 mb-2;
}
.form-textarea {
  @apply w-full p-4 bg-white/50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent;
}
</style>
