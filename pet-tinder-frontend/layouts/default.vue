<template>
  <div class="dotted-bg min-h-screen font-sans text-text-dark overflow-x-hidden">
    <div class="container mx-auto px-6">
      <header class="sticky top-0 z-20 py-4 bg-white/30 backdrop-blur-sm">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer">
            <span class="text-4xl text-brand-brown">🐾</span>
            <span class="font-heading text-4xl text-brand-brown tracking-wide">Kanya</span>
          </NuxtLink>
          <!-- Navigation -->
          <nav class="flex items-center space-x-4 sm:space-x-6">
            <NuxtLink to="/login" class="font-bold text-brand-brown/80 hover:text-brand-brown transition-colors">
              Login
            </NuxtLink>
            <NuxtLink to="/signup" class="bg-brand-yellow text-brand-brown font-bold px-4 sm:px-6 py-2.5 rounded-xl hover:opacity-90 transition-all hover:shadow-lg">
              Get Started
            </NuxtLink>
          </nav>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style>
.dotted-bg {
  background-color: #F7CAD0; /* Fallback */
  background-image: 
    linear-gradient(to bottom right, #FADADD, #F7CAD0),
    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0);
  background-size: 1rem 1rem, 0.75rem 0.75rem;
}
</style>