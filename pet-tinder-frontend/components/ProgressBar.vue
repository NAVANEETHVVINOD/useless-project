<template>
  <div>
    <div class="flex justify-between mb-1">
      <span class="text-sm font-medium text-brand-brown">Step {{ currentStep }} of {{ totalSteps }}</span>
    </div>
    <div class="w-full bg-brand-pink-dark rounded-full h-2.5">
      <div 
        class="bg-brand-yellow h-2.5 rounded-full transition-all duration-500" 
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentStep: { type: Number, required: true },
  totalSteps: { type: Number, required: true },
});

const progressPercentage = computed(() => {
  return (props.currentStep / props.totalSteps) * 100;
});
</script>