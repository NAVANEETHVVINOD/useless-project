<template>
  <nav class="fixed bottom-0 w-full bg-pink-100 border-t border-pink-200 shadow-inner flex justify-around items-center py-2 z-50">
    <NuxtLink to="/" class="flex flex-col items-center text-brand-brown text-xs hover:text-pink-600">
      <i class="ph-house text-xl"></i>
      Home
    </NuxtLink>
    <NuxtLink to="/filters" class="flex flex-col items-center text-brand-brown text-xs hover:text-pink-600">
      <i class="ph-magnifying-glass text-xl"></i>
      Discover
    </NuxtLink>
    <NuxtLink to="/swipe" class="flex flex-col items-center text-brand-brown text-xs hover:text-pink-600">
      <i class="ph-paw-print text-xl"></i>
      Swipe
    </NuxtLink>
    <NuxtLink to="/likes" class="flex flex-col items-center text-brand-brown text-xs hover:text-pink-600">
      <i class="ph-heart text-xl"></i>
      Likes
    </NuxtLink>
    <NuxtLink to="/profile" class="flex flex-col items-center text-brand-brown text-xs hover:text-pink-600">
      <i class="ph-user text-xl"></i>
      Profile
    </NuxtLink>
  </nav>
</template>

<script setup>
</script>
