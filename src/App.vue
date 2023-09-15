
<template>
  <div class="">
    <div class="text-2xl font-bold">Movie App</div>
    <!-- header movie app -->
    <!-- total and average rating -->
    <div class="flex justify-between w-full p-4">

      <div class="flex gap-2 text-white">
        <div class="text-2xl font-bold">Total: {{ totalMovies }}</div> /
        <div class="text-2xl font-bold">Average rating: {{ averageRating }}</div>
      </div>
      <div class="flex gap-2">
        <button class="movie-actions-list-action-button" :class="{
          'button-primary': !showMovieForm,
          'button-disabled': showMovieForm,
        }" @click="removeRatings" :disabled="showMovieForm">Restart ratings</button>
        <button class="movie-actions-list-action-button" :class="{
          'button-primary': !showMovieForm,
          'button-disabled': showMovieForm,
        }" @click="showForm" :disabled="showMovieForm">Add movie</button>
      </div>
    </div>
    <!-- add movie button-->



    <app-modal @close="hideForm" :title="currentMovie?.id ? 'Edit Movie' : 'Add Movie'" :show="showMovieForm">
      <movie-form @update:modelValue="saveMovie" @cancel="hideForm" :modelValue="currentMovie"></movie-form>
    </app-modal>

    <!-- movie list-->
    <div class="pt-40 movie-list">
      <!--movie item-->
      <movie-item @update:rating="updateRating" @remove="removeMovie" @edit="editMovie"
        v-for="(movie, movieIndex) in movies" :movie="movie" :key="movie.id"></movie-item>

    </div>

  </div>
</template>
<script setup>
import { computed, reactive, ref, defineAsyncComponent } from "vue";
import MovieItem from "./components/MovieItem.vue";
import AppModal from "./components/AppModal.vue";

const MovieForm = defineAsyncComponent(() => import("./components/MovieForm.vue"));
/*
These are Icons that you can use, of course you can use other ones if you prefer.
*/
import { items } from "./movies.json";

const movies = ref(items);
const currentMovie = ref(null);

function updateRating(id, rating) {
  movies.value.find((movie) => movie.id === id).rating = rating;
}
function removeMovie(id) {
  movies.value = movies.value.filter((movie) => movie.id !== id);
}
function editMovie(id) {
  currentMovie.value = movies.value.find((movie) => movie.id === id);

  showForm();
}

function saveMovie(data) {
  const isNew = !!movies.value.find((movie) => movie.id === data.id);
  if (!isNew) {
    addMovie(data);
  } else {
    updateMovie(data);
  }
}

function updateMovie(data) {

  movies.value = movies.value.map((m) => {
    if (m.id === data.id) {
      data.rating = m.rating;
      return data;
    }
    return m;
  });

  hideForm();

}

function addMovie(data) {

  movies.value.push(data);
  hideForm();
}

const showMovieForm = ref(false);
function hideForm() {
  showMovieForm.value = false;
  currentMovie.value = null;
}

function showForm() {
  showMovieForm.value = true;
}

const averageRating = computed(() => {
  const avg = movies.value
    .map((movie) => parseInt(movie.rating || 0))
    .reduce((a, b) => a + b, 0);

  return isNaN(Number(avg / movies.value.length).toFixed(1)) ? 0 : Number(avg / movies.value.length).toFixed(1);
});

const totalMovies = computed(() => {
  return movies.value.length;
});

function removeRatings() {
  movies.value = movies.value.map((movie) => {
    movie.rating = 0;
    return movie;
  });
}

</script>

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
