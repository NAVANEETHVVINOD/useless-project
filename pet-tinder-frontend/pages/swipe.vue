<template>
  <div 
    class="w-full bg-gradient-to-br from-green-100 via-green-200 to-green-300"
    :style="{ height: pageHeight > 0 ? pageHeight + 'px' : '100vh', overflowY: 'auto' }"
  >
    <!-- Top App Header -->
    <AppHeader />

    <div class="flex flex-col items-center justify-center min-h-full pt-24 pb-32">
      <div v-if="!pets || pets.length === 0" class="text-center text-brand-primary p-8">
        <h3 class="font-heading text-4xl">All Paws Accounted For!</h3>
        <p class="mt-2 text-text-secondary">Check back later for new friends!</p>
      </div>

      <!-- Pet Cards Stack -->
      <div v-else class="relative w-full max-w-sm flex items-center justify-center">
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

      <!-- Match Modal -->
      <MatchModal 
        :show="showMatchModal" 
        :my-pet="myPet" 
        :their-pet="lastSwipedPet"
        @close="showMatchModal = false"
        @start-chat="startChat"
      />
    </div>

    <!-- Bottom Navigation -->
    <TabBar />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUpdate, nextTick } from 'vue';
import PetCard from '~/components/PetCard.vue';
import MatchModal from '~/components/MatchModal.vue';
import AppHeader from '~/components/AppHeader.vue';
import TabBar from '~/components/TabBar.vue';

definePageMeta({ layout: false });

const petsData = [
  {
    id: 101,
    name: 'Sir Fluffy Wigglebutt',
    age: 2,
    species: 'Dog',
    breed: 'Poodle',
    image: '/images/p1.jpg',
    gender: 'Male',
    size: 'Small',
    energyLevel: 'Turbo',
    prompts: [
      { question: "My guilty pleasure:", answer: "Chewing socks and acting shocked when caught." },
      { question: "Favorite hangout:", answer: "Under the dining table during dinner." }
    ]
  },
  {
    id: 102,
    name: 'Princess Biscuit',
    age: 3,
    species: 'Cat',
    breed: 'Sphynx',
    image: '/images/p2.webp',
    gender: 'Female',
    size: 'Small',
    energyLevel: 'Chill',
    prompts: [
      { question: "A weird talent I have:", answer: "Teleporting from windowsills to your soul." },
      { question: "Looking for:", answer: "Someone who appreciates dramatic stares." }
    ]
  },
  {
    id: 103,
    name: 'Bark Zuckerberg',
    age: 5,
    species: 'Dog',
    breed: 'Husky',
    image: '/images/p3.webp',
    gender: 'Male',
    size: 'Large',
    energyLevel: 'High',
    prompts: [
      { question: "My job title:", answer: "Neighborhood CEO of Woof." },
      { question: "Fun fact:", answer: "I sing opera at 2am." }
    ]
  },
  {
    id: 104,
    name: 'Meowrie Curie',
    age: 1,
    species: 'Cat',
    breed: 'Maine Coon',
    image: '/images/p4.jpg',
    gender: 'Female',
    size: 'Medium',
    energyLevel: 'Mysterious',
    prompts: [
      { question: "Pet peeve:", answer: "When hoomans ignore my tail flicks." },
      { question: "Ambition:", answer: "To conquer the bookshelf, one level at a time." }
    ]
  }
].reverse();

const myPet = {
  id: 0,
  name: 'Your Pet',
  image: '/images/dog1.jpg'
};

const pets = ref(petsData);
const showMatchModal = ref(false);
const lastSwipedPet = ref(null);
const isDragging = ref(false);
const startPos = ref({ x: 0, y: 0 });
const dragPos = ref({ x: 0, y: 0 });

const pageHeight = ref(0);
onMounted(() => {
  pageHeight.value = window.innerHeight;
  updateScrollHeight();
});

const petCardRefs = ref([]);
const cardRefs = ref([]);

onBeforeUpdate(() => {
  petCardRefs.value = [];
  cardRefs.value = [];
});

const setPetCardRef = (el) => { if (el) petCardRefs.value.push(el); };
const setCardRef = (el) => { if (el) cardRefs.value.push(el); };

const updateScrollHeight = async () => {
  await nextTick();
  if (cardRefs.value.length === 0) {
    pageHeight.value = window.innerHeight;
    return;
  }
  let maxHeight = 0;
  cardRefs.value.forEach(card => {
    if (card && card.offsetHeight > maxHeight) {
      maxHeight = card.offsetHeight;
    }
  });
  pageHeight.value = Math.max(window.innerHeight, maxHeight + 250);
};

const handleCardExpansion = () => {
  updateScrollHeight();
};

const cardRotation = computed(() => dragPos.value.x * 0.08);
const cardStyle = (index) => {
  if (!pets.value || index >= pets.value.length) return {};
  const isTopCard = index === pets.value.length - 1;
  const offset = pets.value.length - 1 - index;
  if (!isTopCard) {
    return {
      transform: `scale(${1 - offset * 0.04}) translateY(${-10 * offset}px)`,
      zIndex: index,
      filter: 'blur(2px)',
    };
  }
  return {
    transform: `translate(${dragPos.value.x}px, ${dragPos.value.y}px) rotate(${cardRotation.value}deg)`,
    transition: isDragging.value ? 'none' : '',
    zIndex: index
  };
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
  if (Math.abs(dragPos.value.x) > swipeThreshold) {
    swipe(dragPos.value.x > 0 ? 'like' : 'nope');
  } else {
    dragPos.value = { x: 0, y: 0 };
  }
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
    if (decision === 'like' && swipedPet.id === 104) {
      showMatchModal.value = true;
    }
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
