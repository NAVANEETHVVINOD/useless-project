<template>
  <div class="w-full bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Image Section -->
    <div class="relative w-full aspect-[4/5]">
      <img :src="pet.image" class="absolute inset-0 w-full h-full object-cover" :alt="pet.name">
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-6 text-white w-full">
        <h2 class="font-heading text-4xl">{{ pet.name }}, {{ pet.age }}</h2>
        <p class="font-sans font-bold text-lg">{{ pet.breed }}</p>
      </div>
    </div>

    <!-- "See More Details" Button -->
    <div
      @click.stop="toggleExpansion"
      class="w-full bg-white py-3 text-center font-bold text-brand-brown/70 cursor-pointer hover:bg-gray-50 border-y border-gray-200"
    >
      <span class="transition-transform duration-300 inline-block" :class="{'rotate-180': isExpanded}">▼</span>
      {{ isExpanded ? 'See Less' : 'See More Details' }}
    </div>
    
    <!-- Details Section (Revealed on expand with a smooth transition) -->
    <div 
      class="transition-all duration-500 ease-in-out"
      :class="isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="p-6 space-y-6">
        <div class="flex flex-wrap gap-2">
          <span class="detail-chip">{{ pet.gender }}</span>
          <span class="detail-chip">{{ pet.size }}</span>
          <span class="detail-chip">{{ pet.energyLevel }} Energy</span>
        </div>
        <div>
          <h3 class="font-heading text-2xl mb-3">About Me</h3>
          <div class="space-y-4">
            <div v-for="prompt in pet.prompts" :key="prompt.question">
              <p class="font-bold text-text-dark">{{ prompt.question }}</p>
              <p class="text-text-light pl-4">{{ prompt.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-chip {
  @apply bg-brand-brown/10 text-brand-brown font-semibold px-3 py-1 rounded-full text-sm;
}
</style>

<script setup>
import { ref } from 'vue';

defineProps({
  pet: { type: Object, required: true },
});

const emit = defineEmits(['expanded']);

const isExpanded = ref(false);

const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
  emit('expanded', isExpanded.value);
};

const collapse = () => {
  if (isExpanded.value) {
    isExpanded.value = false;
    emit('expanded', false);
  }
};

defineExpose({ collapse });
</script>