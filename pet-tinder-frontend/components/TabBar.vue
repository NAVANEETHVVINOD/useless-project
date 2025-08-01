<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm border-t border-gray-200 z-30">
    <div class="flex justify-around items-center max-w-lg mx-auto h-20">
      
      <!-- Left Side Links -->
      <NuxtLink to="/" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-7 4h6" /></svg>
        <span class="text-xs font-bold mt-1">Home</span>
      </NuxtLink>
      <NuxtLink to="/swipe" :class="['nav-item', isActive('/swipe') ? 'text-brand-brown' : 'text-gray-400']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span class="text-xs font-bold mt-1">Discover</span>
      </NuxtLink>

      <!-- Central Logo -->
      <div class="text-brand-brown text-4xl">🐾</div>

      <!-- Right Side Links -->
      <NuxtLink to="/matches" :class="['nav-item', isActive('/matches') ? 'text-brand-brown' : 'text-gray-400']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        <span class="text-xs font-bold mt-1">Likes</span>
      </NuxtLink>
      <NuxtLink to="/profile" :class="['nav-item', isActive('/profile') ? 'text-brand-brown' : 'text-gray-400']">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        <span class="text-xs font-bold mt-1">Profile</span>
      </NuxtLink>
      
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const isActive = (path) => route.path === path;
</script>

<style scoped>
.nav-item {
  @apply flex flex-col items-center justify-center text-center p-3 w-1/5 transition-colors text-gray-400 hover:text-brand-brown;
}
</style>