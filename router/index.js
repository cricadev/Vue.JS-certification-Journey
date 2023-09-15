import { createRouter, createWebHistory } from "vue-router";
import Home from "../src/pages/index.vue";
import Movies from "../src/pages/Movies.vue";
import Movie from "../src/pages/Movie.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movies",
      component: Movies,
    },

    {
      path: "/movie/:id",
      component: Movie,
      props: true,
    },
  ],
});
export default router;
