<template>
  <div class="w-full">
    <div 
      @click="triggerFileInput"
      @dragover.prevent 
      @drop.prevent="handleDrop"
      class="flex justify-center items-center w-full h-32 px-6 border-2 border-brand-brown/50 border-dashed rounded-xl cursor-pointer hover:bg-white/50 transition"
    >
      <div class="text-center">
        <p class="text-brand-brown">Drag & drop photos here, or click to select</p>
        <p class="text-xs text-text-light">Up to 5 images (1MB max each)</p>
      </div>
    </div>
    <input 
      type="file" 
      ref="fileInput" 
      @change="handleFileSelect" 
      multiple 
      accept="image/jpeg, image/png"
      class="hidden"
    >
    
    <!-- Image Previews -->
    <div v-if="previews.length" class="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-4">
      <div v-for="(preview, index) in previews" :key="index" class="relative">
        <img :src="preview.url" class="w-full h-24 object-cover rounded-lg">
        <button @click="removeImage(index)" class="absolute -top-2 -right-2 bg-brand-brown text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const fileInput = ref(null);
const previews = ref([]);
const emit = defineEmits(['files-updated']);

const triggerFileInput = () => {
  fileInput.value.click();
};

const processFiles = (files) => {
  const newFiles = Array.from(files).slice(0, 5 - previews.value.length);
  const fileObjects = [];

  newFiles.forEach(file => {
    if (file.size < 1048576 && ['image/jpeg', 'image/png'].includes(file.type)) {
      previews.value.push({ file, url: URL.createObjectURL(file) });
      fileObjects.push(file);
    } else {
      alert(`File "${file.name}" is too large or not a valid image type.`);
    }
  });
  
  emit('files-updated', previews.value.map(p => p.file));
};

const handleFileSelect = (event) => {
  processFiles(event.target.files);
};

const handleDrop = (event) => {
  processFiles(event.dataTransfer.files);
};

const removeImage = (index) => {
  previews.value.splice(index, 1);
  emit('files-updated', previews.value.map(p => p.file));
};
</script>