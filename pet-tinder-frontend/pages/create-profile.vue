<template>
  <div class="flex items-center justify-center py-12">
    <div class="w-full max-w-2xl p-8 space-y-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg">
      
      <!-- Progress Bar -->
      <ProgressBar :currentStep="currentStep" :totalSteps="3" />
      <hr class="border-brand-brown/10 my-6">

      <!-- Step 1: The Basics -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h2 class="font-heading text-4xl text-brand-brown text-center">Let's Meet Your Pet</h2>
        <FormInput id="name" label="Pet's Name 🐾" v-model="petData.name" placeholder="e.g., Captain Fluffbutt" />
        <div>
          <label for="species" class="block text-sm font-bold text-brand-brown/80 mb-1">Species</label>
          <select id="species" v-model="petData.species" class="w-full px-4 py-3 bg-white/50 border-2 border-brand-pink-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow">
            <option disabled value="">Please select one</option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Hamster</option>
            <option>Bird</option>
            <option>Fish</option>
            <option>Horse</option>
            <option>Other</option>
          </select>
        </div>
        <FormInput id="breed" label="Breed" v-model="petData.breed" placeholder="e.g., Majestic Mutt / Mixed" />
        <div>
          <FormInput id="dob" label="Date of Birth" type="date" v-model="petData.dob" />
          <!-- NEW: Sarcastic Star Sign Display -->
          <p v-if="sarcasticStarSign" class="text-sm text-brand-brown mt-1">Sarcastic Star Sign: <span class="font-bold">{{ sarcasticStarSign }}</span></p>
        </div>
      </div>

      <!-- Step 2: Personality (Optional Fields) -->
      <div v-if="currentStep === 2" class="space-y-6">
        <h2 class="font-heading text-4xl text-brand-brown text-center">What's Their Vibe?</h2>
        <FormInput id="favCrime" label="Favorite Crime" v-model="petData.favCrime" placeholder="e.g., Grand Theft Sofa Cushion" />
        <FormInput id="anthem" label="My Anthem Would Be..." v-model="petData.anthem" placeholder="e.g., 'Who Let the Dogs Out'" />
        <div>
          <label class="block text-sm font-bold text-brand-brown/80 mb-1">AI-Generated Bio</label>
          <textarea v-model="petData.bio" rows="3" class="w-full p-4 bg-white/50 border-2 border-brand-pink-dark rounded-xl" placeholder="Click 'Generate' for a spicy bio..."></textarea>
          <button @click="generateBio" type="button" class="mt-2 text-sm font-bold text-brand-brown hover:underline">
            ✨ Generate with AI
          </button>
        </div>
      </div>
      
      <!-- Step 3: Photos -->
      <div v-if="currentStep === 3" class="space-y-6">
        <h2 class="font-heading text-4xl text-brand-brown text-center">Show Them Off!</h2>
        <p class="text-center text-text-light -mt-4">You need at least one photo to continue.</p>
        <ImageUploader @files-updated="updateFiles" />
      </div>

      <!-- NEW: Validation Error Display -->
      <div v-if="errorMessage" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center">
        {{ errorMessage }}
      </div>

      <!-- UPDATED: Navigation Buttons -->
      <div class="flex justify-between items-center mt-8">
        <button v-if="currentStep > 1" @click="prevStep" class="font-bold text-brand-brown/80 hover:text-brand-brown transition-colors">
          ← Back
        </button>
        <div v-else></div> <!-- Placeholder to keep 'Next' on the right -->
        
        <FormButton v-if="currentStep < 3" @click="nextStep" type="button" class="!w-auto !px-8">Next →</FormButton>
        <FormButton v-else @click="saveProfile" type="button" class="!w-auto !px-8">Save Profile</FormButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProgressBar from '~/components/ProgressBar.vue';
import FormInput from '~/components/form/FormInput.vue';
import FormButton from '~/components/form/FormButton.vue';
import ImageUploader from '~/components/ImageUploader.vue';

const router = useRouter();
const currentStep = ref(1);
const errorMessage = ref(''); // For validation feedback

const petData = ref({
  name: '',
  species: '',
  breed: 'Mixed/Unknown', // Default value
  dob: '',
  favCrime: '',
  anthem: '',
  bio: '',
  images: [],
});

// --- Validation Logic ---
const validateStep1 = () => {
  if (petData.value.name.length < 2) return "Pet's name must be at least 2 characters long.";
  if (/[^a-zA-Z0-9\s.-]/.test(petData.value.name)) return "Pet's name contains invalid characters.";
  if (!petData.value.species) return "Please select a species.";
  if (!petData.value.dob) return "Please enter a date of birth.";
  const dobDate = new Date(petData.value.dob);
  if (dobDate > new Date()) return "Date of birth cannot be in the future.";
  return ''; // No error
};

const validateStep3 = () => {
  if (petData.value.images.length === 0) return "Please upload at least one image of your pet.";
  return '';
};

const nextStep = () => {
  errorMessage.value = ''; // Clear old errors
  let error = '';
  if (currentStep.value === 1) {
    error = validateStep1();
  }
  
  if (error) {
    errorMessage.value = error;
  } else if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const prevStep = () => {
  errorMessage.value = '';
  if (currentStep.value > 1) currentStep.value--;
};

const saveProfile = () => {
  errorMessage.value = '';
  const error = validateStep3();
  if (error) {
    errorMessage.value = error;
    return;
  }
  
  console.log("Saving Pet Profile:", petData.value);
  router.push('/filters');
};

// --- Fun Features ---
const sarcasticStarSign = computed(() => {
  if (!petData.value.dob) return '';
  const month = new Date(petData.value.dob).getMonth() + 1;
  const signs = [
    'Capricouch (Ambitious Napper)', 
    'Aquafurius (Independent & Aloof)', 
    'Pisces of Food (Dreamy Beggar)',
    'Airies (Energetic Zoomie Enthusiast)', 
    'Tauruff (Stubborn Snuggler)', 
    'Gemlemlem (Curious & Chatty)',
    'Cancerb (Loyal & Crabby)', 
    'Leown (Dramatic Center of Attention)', 
    'Purrgo (Picky & Meticulous)',
    'Libark (Social & Indecisive)', 
    'Scorpaw (Mysterious & Intense)', 
    'Sagittailius (Adventurous Escape Artist)'
  ];
  return signs[month - 1];
});

const generateBio = () => {
  // This is where you would call the Gemini API from your backend
  petData.value.bio = `Just a ${petData.value.species.toLowerCase()} looking for a friend who appreciates the fine art of staring at nothing and sleeping for 18 hours a day. My favorite crime is definitely ${petData.value.favCrime || 'unspecified chaos'}.`;
};

const updateFiles = (files) => {
  petData.value.images = files;
};
</script>