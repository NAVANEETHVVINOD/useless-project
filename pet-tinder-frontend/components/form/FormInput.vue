<template>
  <div class="w-full">
    <label :for="id" class="block text-sm font-bold text-brand-brown/80 mb-1">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-3 bg-white/50 border-2 border-brand-pink-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition"
    >
  </div>
</template>

<script setup>
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>