<template>
  <!-- 
    CHANGE: The background class is now dynamic. 
    It will be 'landing-bg' on the homepage, and 'halftone-bg' everywhere else.
  -->
  <div 
    :class="[isIndexPage ? 'landing-bg' : 'halftone-bg', 'h-screen w-screen overflow-x-hidden font-sans text-text-primary']"
  >
    <AppHeader />
    <main class="h-full w-full">
      <slot />
    </main>
    <TabBar v-if="!isIndexPage" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import AppHeader from '~/components/AppHeader.vue';
import TabBar from '~/components/TabBar.vue';

const route = useRoute();
const isIndexPage = computed(() => route.path === '/');
</script>

<style>
/* Subtle background for all pages EXCEPT the landing page */
.halftone-bg {
  background-image: linear-gradient(to bottom right, #FFFFFF, #EDF7ED);
  position: relative;
}
.halftone-bg::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(10, 58, 27, 0.04) 1px, transparent 0),
    radial-gradient(circle at 8px 8px, rgba(10, 58, 27, 0.04) 1px, transparent 0);
  background-size: 15px 15px;
  z-index: 0;
}

/* 
  NEW: Special, full-page light green background ONLY for the landing page.
*/
.landing-bg {
  background-image: linear-gradient(to bottom, #EDF7ED, #A8DBA8);
}

main {
  position: relative;
  z-index: 1;
}
</style>