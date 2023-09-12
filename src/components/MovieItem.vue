<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import { StarIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  }
});

const emits = defineEmits(['edit', 'remove', 'update:rating']);

const notRated = computed(() => {
  // Logic for notRated here, e.g.
  return props.movie.rating === null;
});

const edit = () => {
  emits('edit', props.movie.id);
}

const remove = () => {
  emits('remove', props.movie.id);
}

const onRatingChange = (newRating) => {
  emits('update:rating', props.movie.id, newRating);
}
</script>
<template lang="">
    <div class="relative movie-item">
        <div class="absolute flex items-center gap-2 edit-or-delete-buttons bottom-4 right-4">
          <button class= "p-2 text-white bg-blue-500 rounded-full hover:bg-blue-300" @click="edit">

            <pencil-icon class="w-4 h-4"></pencil-icon>
          </button>
          <button class="p-2 text-white bg-blue-500 rounded-full hover:bg-red-500" @click="remove">
            <trash-icon class="w-4 h-4"></trash-icon>
          </button>
        </div>
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
          <div class="movie-item-star-icon-wrapper">
            <span class="movie-item-rating-text">
              Rating: ({{ movie.rating ?? 0 }}/5)
            </span>
            <button v-for="star in 5" :key="star" class="movie-item-star-icon-button" :class="[
              star <= movie.rating ? 'text-yellow-500' : 'text-gray-500',
            ]" :disabled="star === movie.rating" @click="onRatingChange(star)">
              <StarIcon class="movie-item-star-icon" />
            </button>
          </div>
        </div>
      </div>
</template>

<style lang="">
  
</style>