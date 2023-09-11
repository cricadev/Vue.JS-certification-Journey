<script setup lang="ts">
import { items } from "./movies.json";
import { reactive, ref } from "vue";
/*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
import { StarIcon } from "@heroicons/vue/24/solid";
const movies = reactive(items);

function updateRating(movieIndex, rating) {
  movies[movieIndex].rating = rating;
}


const errors = reactive({
  name: null,
  description: null,
  image: null,
  inTheaters: null,
  genres: null,
});
const form = reactive({
  name: null,
  description: null,
  image: null,
  inTheaters: false,
  genres: [],
});
const validations = reactive({
  name: "required",
  genres: "required",
});

const genres = reactive([
  { text: "Drama", value: "Drama" },
  { text: "Crime", value: "Crime" },
  { text: "Action", value: "Action" },
  { text: "Comedy", value: "Comedy" },
]);

const validationRules = (rule) => {
  if (rule === "required") return /^ *$/;

  return null;
};

function validate() {
  let valid = true;
  clearErrors();
  for (const [field, rule] of Object.entries(validations)) {
    const validation = validationRules(rule);
    if (validation) {
      if (validation.test(form[field] || "")) {
        errors[field] = `${field} is ${rule}`;
        valid = false;
      }
    }
  }

  return valid;
}



const submitForm = () => {
  if (validate()) {
    const movie = {
      id: Number(Date.now()),
      name: form.name,
      description: form.description,
      image: form.image,
      genres: form.genres,
      inTheaters: form.inTheaters,
      rating: null,
    };
    movies.push(movie);
    hideForm();
  }
}

function cleanUpForm() {
  form.name = null;
  form.description = null;
  form.image = null;
  form.genres = null;
  form.inTheaters = false;
  clearErrors();
}

function clearErrors() {
  errors.name = null;
  errors.description = null;
  errors.image = null;
  errors.genres = [];
  errors.inTheaters = null;
}

const showMovieForm = ref(false);

function hideForm() {
  showMovieForm.value = false;
  cleanUpForm();
}

function showForm() {
  showMovieForm.value = true;
}
</script>

<template>
  <div class="">
    <!-- movie list-->
    <div class="pt-40 movie-list">
      <!--movie item-->
      <div class="relative movie-item" v-for="(movie, movieIndex) in movies" :key="movie.id">
        <span class="absolute z-10 grid w-12 h-2 top-4 right-4">
          <StarIcon class="" :class="[
            movie.rating > 0 ? 'text-yellow-500' : 'text-gray-500',
          ]" />
          <span class="absolute font-bold text-2xl top-1/2 right-1/2 translate-x-[50%] ">
            {{ movie.rating ?? '-' }}
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
            ]" :disabled="star === movie.rating" @click="updateRating(movieIndex, star)">
              <StarIcon class="movie-item-star-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- add movie button-->
    <div class="fixed top-4 right-4">
      <button class="p-4 text-2xl text-white bg-blue-500 rounded-full" @click="showForm">Add movie</button>
      <div class=" form-modal" v-if="showMovieForm">
        <form class="relative" @submit.prevent="submitForm">
          <div class="cancel">
            <button class="absolute px-2 text-2xl text-white bg-blue-500 rounded-full top-4 right-4"
              @click="hideForm">X</button>
          </div>
          <div class="mt-10">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required v-model="form.name">
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea id="description" name="description" v-model="form.description"></textarea>
            </div>
            <div class="form-group">
              <label for="image">Image:</label>
              <input type="text" id="image" name="image" v-model="form.image">
            </div>
            <div class="form-group">
              <label for="genre">Genre:</label>
              <select id="genre" name="genre" v-model="form.genres" multiple required>
                <option value="action">Action</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="horror">Horror</option>
                <option value="sci-fi">Sci-Fi</option>
              </select>
            </div>
            <div class="form-group">
              <label for="theaters">Is in theathers:</label>
              <input type="checkbox" id="featured" v-model="form.inTheaters" />
            </div>
            <div class="form-group">
              <button type="submit" class="px-8 m-4 text-red-500 bg-white rounded-md">Submit</button>
            </div>
          </div>
        </form>

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
