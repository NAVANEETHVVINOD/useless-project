<template>
  <div 
    class="w-full"
    :style="{ height: pageHeight + 'px', overflowY: 'auto' }"
  >
    <div class="flex flex-col items-center justify-center min-h-full pt-20 pb-28">
      
      <div v-if="pets.length === 0" class="text-center text-brand-brown p-8">
        <h3 class="font-heading text-4xl">All Paws Accounted For!</h3>
        <p class="mt-2">Check back later for new friends!</p>
      </div>

      <!-- Card Stack Container -->
      <div class="relative w-full max-w-sm flex items-center justify-center">
        <div
          v-for="(pet, index) in pets"
          :key="pet.id"
          class="absolute w-full h-auto"
          :style="cardStyle(index)"
          @mousedown="startDrag($event, index)"
          @touchstart="startDrag($event, index)"
          ref="setCardRef"
        >
          <PetCard 
            :pet="pet" 
            ref="setPetCardRef" 
            @expanded="handleCardExpansion" 
            @decide="decide" 
          />
        </div>
      </div>

      <MatchModal 
        :show="showMatchModal" 
        :my-pet="myPet" 
        :their-pet="lastSwipedPet"
        @close="showMatchModal = false"
        @start-chat="startChat"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUpdate, nextTick } from 'vue';
import PetCard from '~/components/PetCard.vue';

definePageMeta({ layout: 'app' });

// --- Dummy Data ---
const petsData = [
  { id: 1, name: 'Max', age: 4, species: 'Dog', breed: 'German Shepherd', image: '/images/dog1.jpg', gender: 'Male', size: 'Large', energyLevel: 'High', prompts: [{ question: "A fun fact about me:", answer: "I can hear a cheese wrapper open from three towns away." }, { question: "Favorite Crime:", answer: "Impersonating a good boy to get extra treats." }] },
  { id: 2, name: 'Mochi', age: 1, species: 'Cat', breed: 'Domestic Shorthair', image: '/images/cat1.webp', gender: 'Female', size: 'Small', energyLevel: 'Low', prompts: [{ question: "My love language is...", answer: "Ignoring you until I want food, then aggressively demanding cuddles." }] },
  { id: 3, name: 'Buddy', age: 7, species: 'Dog', breed: 'Beagle', image: '/images/dog2.avif', gender: 'Male', size: 'Medium', energyLevel: 'Moderate', prompts: [{ question: "I'm looking for...", answer: "Someone to co-author my manifesto on the tyranny of squirrels." }] },
  { id: 4, name: 'Cleo', age: 5, species: 'Cat', breed: 'Tabby', image: '/images/cat2.jpg', gender: 'Female', size: 'Medium', energyLevel: 'Low', prompts: [{ question: "Biggest pet peeve:", answer: "When the sunbeam moves and I have to relocate my entire nap." }] },
].reverse(); 

const myPet = { id: 0, name: 'Your Pet', image: '/images/dog1.jpg' };
// --- End Dummy Data ---

const pets = ref(petsData);
const showMatchModal = ref(false);
const lastSwipedPet = ref(null);
const isDragging = ref(false);
const startPos = ref({ x: 0, y: 0 });
const dragPos = ref({ x: 0, y: 0 });

const petCardRefs = ref([]);
const cardRefs = ref([]);
const pageHeight = ref(window.innerHeight); 

onBeforeUpdate(() => { 
  petCardRefs.value = []; 
  cardRefs.value = []; 
});

const setPetCardRef = (el) => { if (el) petCardRefs.value.push(el); };
const setCardRef = (el) => { if (el) cardRefs.value.push(el); };

// ✅ Dynamically adjusts scroll height
const updateScrollHeight = async () => {
  await nextTick();
  let maxHeight = 0;
  cardRefs.value.forEach(card => {
    if (card && card.offsetHeight > maxHeight) {
      maxHeight = card.offsetHeight;
    }
  });
  pageHeight.value = maxHeight + 600; // ✅ Doubled scrollable length
};

const handleCardExpansion = () => {
  updateScrollHeight();
};

const cardRotation = computed(() => dragPos.value.x * 0.08);
const cardStyle = (index) => {
  const isTopCard = index === pets.value.length - 1;
  const offset = isTopCard ? 0 : pets.value.length - 1 - index;
  
  if (!isTopCard) return { transform: `scale(${1 - offset * 0.04}) translateY(${-10 * offset}px)`, zIndex: index, filter: 'blur(2px)' };
  
  return { transform: `translate(${dragPos.value.x}px, ${dragPos.value.y}px) rotate(${cardRotation.value}deg)`, transition: isDragging.value ? 'none' : '', zIndex: index };
};

const startDrag = (e, index) => {
  if (index !== pets.value.length - 1) return;

  const topCardComponent = petCardRefs.value[petCardRefs.value.length - 1];
  if (topCardComponent) topCardComponent.collapse();

  if (e.target.closest('.cursor-pointer')) return;

  isDragging.value = true;
  const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  startPos.value = { x: clientX, y: 0 };
  
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('touchmove', onDrag, { passive: false });
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchend', endDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  dragPos.value = { x: clientX - startPos.value.x, y: 0 };
};

const endDrag = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  const swipeThreshold = 100;
  if (Math.abs(dragPos.value.x) > swipeThreshold) { swipe(dragPos.value.x > 0 ? 'like' : 'nope'); } 
  else { dragPos.value = { x: 0, y: 0 }; }

  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchend', endDrag);
};

const swipe = (decision) => {
  if (pets.value.length === 0) return;
  const swipedPet = pets.value.pop();
  lastSwipedPet.value = swipedPet;
  const flyOutX = (decision === 'like' ? 1 : -1) * window.innerWidth;
  dragPos.value = { x: flyOutX, y: 0 };
  setTimeout(() => {
    dragPos.value = { x: 0, y: 0 };
    updateScrollHeight();
    if (decision === 'like' && swipedPet.id === 4) { showMatchModal.value = true; }
  }, 300);
};

const decide = (choice) => {
  if (pets.value.length > 0) {
    const topCardComponent = petCardRefs.value[petCardRefs.value.length - 1];
    if (topCardComponent) topCardComponent.collapse();
    swipe(choice);
  }
};

const startChat = () => {
  console.log("Starting chat with", lastSwipedPet.value.name);
  showMatchModal.value = false;
};
</script>
