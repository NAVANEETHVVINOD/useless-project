<template>
  <!-- This content will be placed inside the default layout automatically -->
  <div class="relative w-full" style="height: calc(100vh - 88px);"> <!-- 88px is approx header height -->

    <!-- The Scattered Pet Blobs -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-24 -right-10 w-48 h-48 hidden md:block">
        <div class="absolute inset-0 bg-white rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] shadow-lg overflow-hidden"><img src="/images/dog2.avif" alt="Happy dog photo" class="w-full h-full object-cover"></div>
      </div>
      <div class="absolute -bottom-10 -left-10 w-40 h-40">
        <div class="absolute inset-0 bg-white rounded-[60%_40%_30%_70%_/_50%_40%_60%_50%] shadow-lg overflow-hidden"><img src="/images/cat1.webp" alt="Cute cat photo" class="w-full h-full object-cover"></div>
      </div>
      <div class="absolute top-20 -left-16 w-32 h-32 opacity-70 hidden lg:block">
         <div class="absolute inset-0 bg-white rounded-[50%_50%_30%_70%_/_50%_30%_70%_50%] shadow-md overflow-hidden"><img src="/images/dog1.jpg" alt="Friendly dog photo" class="w-full h-full object-cover"></div>
      </div>
    </div>

    <!-- Centered Text Content -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <h1 class="font-heading text-5xl md:text-7xl text-brand-primary leading-tight max-w-3xl">
        Because Your Pet’s Social Life Should Be Better Than Yours.
      </h1>
      <p class="mt-6 text-lg text-text-secondary max-w-xl">
        Is your pet's social life just you and the mailman? Oof. Time for an upgrade.
      </p>
    </div>

    <!-- "Get Started" Button -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
      <NuxtLink to="/signup" class="inline-block bg-brand-primary text-white font-bold text-lg tracking-wide px-12 py-4 rounded-full shadow-lg transition-all hover:bg-brand-accent hover:text-brand-primary hover:shadow-2xl hover:scale-105" aria-label="Get Started">Get Started</NuxtLink>
    </div>

  </div>
</template>

<script setup>
// We do not need definePageMeta here, so it uses the default layout automatically.

useHead({
  title: 'KANYA - Better Social Lives for Pets',
  meta: [
    // --- THIS IS THE FIX ---
    // Changed the closing ' to a "
    { name: 'description', content: "Because your pet's social life should be better than yours. Find playdates and friends on Kanya." }
  ]
})
</script>