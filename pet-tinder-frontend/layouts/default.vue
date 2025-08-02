<template>
  <!-- 
    THIS IS THE FIX: The root div of the layout now has the background class.
    This will apply the green gradient to every page that uses this layout.
  -->
  <div class="app-background min-h-screen font-sans text-text-primary overflow-x-hidden">
    
    <!-- The shared header for ALL pages -->
    <div class="container mx-auto px-6">
      <header class="sticky top-0 z-20 py-4 bg-transparent">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="flex items-center gap-3 cursor-pointer">
            <span class="text-4xl text-brand-primary">🐾</span>
            <span class="font-heading text-4xl text-brand-primary tracking-wide">Kanya</span>
          </NuxtLink>
          <nav class="flex items-center space-x-4 sm:space-x-6">
            <NuxtLink to="/login" class="font-bold text-brand-primary/80 hover:text-brand-primary transition-colors">Login</NuxtLink>
            <NuxtLink to="/signup" class="bg-brand-accent text-brand-primary font-bold px-4 sm:px-6 py-2.5 rounded-xl hover:opacity-90 transition-all hover:shadow-lg">Get Started</NuxtLink>
          </nav>
        </div>
      </header>
    </div>
    
    <!-- The content of each page (index, login, etc.) will be injected here -->
    <main>
      <slot />
    </main>

  </div>
</template>

<style>
/* 
  THIS IS THE GLOBAL BACKGROUND STYLE
  It lives here now to ensure it's applied correctly with the layout.
*/
.app-background {
  background-image: linear-gradient(to bottom, #EDF7ED, #A8DBA8);
}
</style>