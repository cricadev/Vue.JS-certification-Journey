<template lang="">
 <div class="relative movie-item">
     
        <span class="absolute z-10 grid w-12 h-2 top-4 right-4">
          <StarIcon class="w-12 h-12" :class="[
            movie.rating > 0 ? 'text-yellow-500' : 'text-gray-500',
          ]" />
          <span class="absolute font-bold text-2xl top-1/2 right-1/2 translate-x-[50%] ">
            {{ movie.rating === 0 || movie.rating === null ? '-' : movie.rating }}
          </span>
        </span>
        <div class="movie-item-image-wrapper">
          <img :src="movie.image" class="movie-item-image" alt="">
        </div>
        <div class="flex flex-col justify-between gap-2 p-4">
          <div class="text-2xl font-bold">{{ movie.name }}</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="genre in movie.genres" :key="genre" class="px-2 py-1 text-white bg-blue-500 rounded">{{ genre
            }}</span>
          </div>
          <div class="text-lg">{{ movie.description }}</div>
        </div>
      </div>
</template>
<script setup>
import { StarIcon } from "@heroicons/vue/24/solid";
import { ref, computed } from 'vue'
import { items } from "../movies.json";
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: null,
  }
})
console.log(typeof props.id)


const movies = ref(items);
const movie = computed(() => {
  return movies.value.find((movie) => movie.id == props.id)
})
</script>
<style lang="">
  
</style>