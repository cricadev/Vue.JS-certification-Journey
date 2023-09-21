<template>
  <div class="w-screen h-screen" :class="[
    {
      'aquarium': fishes.length > 0
    }
  ]">
    <fish-form @add-fish="addToAquarium" />
    <Fish v-for="fish in fishes" :key="fish.id" :fish="fish" />
    <div
      class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-5xl text-center font-bold text-white flex items-center justify-center gap-8 animate-pulse"
      v-if="fishes.length < 1">
      <svg class="w-24 h-24 text-white animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
      </svg>
      THERE ARE NO FISHES, ADD SOMETHING TO THIS GRAVEYARD
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";
import Fish from "../components/Fish.vue"
import FishForm from "../components/FishForm.vue"
const fishes = ref([])
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
const addToAquarium = (fish) => {
  fishes.value.push({ ...fish, timeToStarve: Math.floor(Math.random() * 21) + 10, speed: getRandomArbitrary(10, 20) });
};
</script>
<style scoped>
.aquarium {
  background-image: url('../../public/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>