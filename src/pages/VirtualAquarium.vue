<template>
  <div class="w-screen h-screen aquarium">
    <fish-form />
    <Fish v-for="fish in fishes" :key="fish.id" :fish="fish" />
  </div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";
import Fish from "../components/Fish.vue"
import FishForm from "../components/FishForm.vue"
const fishes = ref([{
  id: 0,
  name: "Gold",
  phrases: ["Fuck you", "This life is shit"],
  image: "/goldfish.png"
}])
</script>
<style lang="">
  
</style>