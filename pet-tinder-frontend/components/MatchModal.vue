<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="bg-white/50 backdrop-blur-lg rounded-3xl p-8 text-center max-w-sm w-full space-y-4">
      <h2 class="font-heading text-5xl text-brand-brown">Woof-hoo!</h2>
      <p class="text-xl font-bold text-brand-brown">It's a Match!</p>
      
      <!-- Matched Pet Images -->
      <div class="flex justify-center items-center -space-x-8">
        <img :src="myPet.image" class="w-32 h-32 rounded-full object-cover border-4 border-brand-yellow shadow-lg">
        <img :src="theirPet.images[0]" class="w-32 h-32 rounded-full object-cover border-4 border-brand-yellow shadow-lg">
      </div>
      
      <p class="text-text-light">{{ myPet.name }} and {{ theirPet.name }} can now chat!</p>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <FormButton @click="$emit('start-chat')" type="button">Start Chatting</FormButton>
        <button @click="$emit('close')" class="font-bold text-brand-brown/80 hover:text-brand-brown">
          Continue Swiping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  myPet: Object,
  theirPet: Object,
});
defineEmits(['close', 'start-chat']);
</script>