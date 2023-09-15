import { createRouter, createWebHistory } from "vue-router";
import Home from "../src/pages/index.vue";
import Movies from "../src/pages/Movies.vue";
import Movie from "../src/pages/Movie.vue";
import Error404 from "../src/pages/Error.vue";
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
    {
      path: "/:pathMatch(.*)*",
      name: "error404",
      component: Error404,
    },
  ],
});
export default router;
