<script setup lang="ts">
import { items } from "./movies.json";
import { reactive } from "vue";
/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
import { StarIcon } from "@heroicons/vue/24/solid";

const movies = reactive(items);

const handleClick = (event: Event, number) => {
  (event.target as HTMLButtonElement).disabled = true;
  console.log(number);

};


</script>

<template>
  <div class="flex flex-row justify-between w-full h-screen gap-4 p-16">
    <div class="bg-slate-50" v-for="movie in movies" :key="movie.id">
      <div class="bg-center bg-cover h-3/5" :style="{ backgroundImage: 'url(' + movie.image + ')' }">
      </div>
      <div class="flex flex-col justify-between gap-2 p-4">

        <div class="text-2xl font-bold">{{ movie.name }}</div>
        <div class="flex flex-wrap gap-2">
          <span v-for="genre in movie.genres" :key="genre" class="px-2 py-1 text-white bg-blue-500 rounded">{{ genre
          }}</span>
        </div>
        <div class="text-lg">{{ movie.description }}</div>
        <div class="flex items-center gap-2 text-sm font-bold">Rating ({{ movie.rating }}/5)
          <span class="flex">
            <button @click="handleClick($event, 1)" class="flex disabled:cursor-not-allowed disabled:text-gray-400">
              <StarIcon class="w-6 h-6 text-yellow-500 cursor-pointer" />
            </button>
            <button @click="handleClick($event, 2)" class="disabled:cursor-not-allowed disabled:text-gray-400">
              <StarIcon class="w-6 h-6 text-yellow-500" />
            </button>
            <button @click="handleClick($event, 3)" class="disabled:cursor-not-allowed disabled:text-gray-400">
              <StarIcon class="w-6 h-6 text-yellow-500" />
            </button>
            <button @click="handleClick($event, 4)" class="disabled:cursor-not-allowed disabled:text-gray-400">
              <StarIcon class="w-6 h-6 text-yellow-500" />
            </button>
            <button @click="handleClick($event, 5)" class="disabled:cursor-not-allowed disabled:text-gray-400">
              <StarIcon class="w-6 h-6 text-yellow-500" />
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.movie-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60% 40%;
  height: 100%;
}

.movie-image {
  grid-row: 1 / 2;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.movie-details {
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #007bff;
  color: #fff;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.movie-title {
  margin: 0;
  font-size: 2rem;
}

.movie-description {
  margin: 0;
  font-size: 1.25rem;
}

.movie-rating {
  font-size: 2rem;
  font-weight: 500;
}
</style>
