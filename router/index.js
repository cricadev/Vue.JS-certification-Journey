import { createRouter, createWebHistory } from "vue-router";
import Home from "../src/pages/index.vue";
import Movies from "../src/pages/Movies.vue";
import Movie from "../src/pages/Movie.vue";
import Error404 from "../src/pages/Error.vue";
import Countdown from "../src/pages/Countdown.vue";
import ShoppingCart from "../src/pages/ShoppingCart.vue";
import Calculator from "../src/pages/Calculator.vue";
import TicTacToe from "../src/pages/TicTacToe.vue";
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
      path: "/countdown",
      component: Countdown,
    },
    {
      path: "/shopping-cart",
      component: ShoppingCart,
    },
    {
      path: "/tic-tac-toe",
      component: TicTacToe,
    },
    {
      path: "/aquarium",
      component: () => import("../src/pages/VirtualAquarium.vue"),
    },
    {
      path: "/quiz",
      component: () => import("../src/pages/Quiz.vue"),
    },
    {
      path: "/task-list",
      component: () => import("../src/pages/Task.vue"),
    },
    {
      path: "/profile",
      component: () => import("../src/pages/Profile.vue"),
    },
    {
      path: "/movie/:id",
      component: Movie,
      props: true,
    },
    {
      path: "/calculator",
      component: Calculator,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error404",
      component: Error404,
    },
  ],
});
export default router;
