<template>
  <div class="relative w-full" style="height: calc(100vh - 100px);">

    <!-- 1. The Scattered Pet Blobs (Background Layer) -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      
      <!-- Blob 1: Top Right Dog (uses dog2.avif) -->
      <div class="absolute top-24 -right-10 w-48 h-48 hidden md:block">
        <div class="absolute inset-0 bg-white rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] shadow-lg overflow-hidden">
          <img src="/images/dog2.avif" alt="Happy dog photo" class="w-full h-full object-cover">
        </div>
      </div>
      
      <!-- Blob 2: Bottom Left Cat (uses cat1.webp) -->
      <div class="absolute -bottom-10 -left-10 w-40 h-40">
        <div class="absolute inset-0 bg-white rounded-[60%_40%_30%_70%_/_50%_40%_60%_50%] shadow-lg overflow-hidden">
          <img src="/images/cat1.webp" alt="Cute cat photo" class="w-full h-full object-cover">
        </div>
      </div>

      <!-- Blob 3: Top Left Dogs (uses dog1.jpg) -->
      <div class="absolute top-20 -left-16 w-32 h-32 opacity-70 hidden lg:block">
         <div class="absolute inset-0 bg-white rounded-[50%_50%_30%_70%_/_50%_30%_70%_50%] shadow-md overflow-hidden">
            <img src="/images/dog1.jpg" alt="Friendly dog photo" class="w-full h-full object-cover">
         </div>
      </div>

    </div>

    <!-- 2. Centered Text Content (Foreground Layer) -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      
      <h1 class="font-heading text-6xl md:text-7xl text-brand-brown leading-tight max-w-2xl">
        Because Your Pet’s Social Life Should Be Better Than Yours.
      </h1>

      <p class="mt-4 text-xl text-text-light max-w-lg">
        Is your pet's social life just you and the mailman? Oof. Time for an upgrade. Find playdates, partners-in-crime, and that one fish who just *gets* it.
      </p>

      <!-- UPDATED: Button is now round and on the right -->
      <div class="w-full max-w-lg mt-8 flex justify-center md:justify-end">
        <NuxtLink to="/signup" class="inline-flex items-center justify-center bg-brand-yellow text-brand-brown font-bold h-24 w-24 rounded-full text-lg transition-all hover:shadow-xl hover:-translate-y-1">
          Start
        </NuxtLink>
      </div>

    </div>

  </div>
</template>

<script setup>
useHead({
  title: 'KANYA - Better Social Lives for Pets',
  meta: [
    { name: 'description', content: "Because your pet's social life should be better than yours. Find playdates and friends on Kanya." }
  ]
})
</script>