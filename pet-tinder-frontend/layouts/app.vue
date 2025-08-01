<template>
  <!-- Main app layout with the new halftone background -->
  <div class="halftone-bg h-screen w-screen overflow-hidden font-sans text-text-dark">
    <AppHeader />
    <main class="h-full w-full">
      <slot />
    </main>
    <TabBar />
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue';
import TabBar from '~/components/TabBar.vue';
</script>

<style>
/* UPDATED: Halftone dot gradient background */
.halftone-bg {
  /* A vibrant pink gradient */
  background-image: linear-gradient(to bottom right, #FFA7B4, #E897A4);
  position: relative;
}

/* This ::before pseudo-element creates the dot pattern on top of the gradient */
.halftone-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Two radial gradients create a denser, more authentic halftone effect */
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0),
    radial-gradient(circle at 8px 8px, rgba(0,0,0,0.1) 1px, transparent 0);
  background-size: 15px 15px;
  z-index: 0;
}

/* Ensure main content is above the background pattern */
main {
  position: relative;
  z-index: 1;
}
</style>