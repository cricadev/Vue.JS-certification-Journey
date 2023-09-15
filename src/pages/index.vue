<template >
  <div class="pt-32">
    <h1 class="text-5xl font-bold text-center text-white uppercase">Vue.js Certification</h1>

    <div class="grid max-w-full grid-cols-3 grid-rows-3 gap-8 mt-16 place-items-center">
      <router-link v-for="challenge in challenges" class=" challenge-item" :to="challenge.url" :key="challenge.id">
        <h1 class="py-4 text-2xl font-bold text-center text-green-300 bg-white">
          {{ challenge.name }}
        </h1>
        <img :src="challenge.image" class="" alt="">
      </router-link>
    </div>

  </div>
</template>
<script setup>

const challenges = [
  {
    id: 1,
    name: "Movie App",
    description: "Create a movie app with Vue.js",
    image: "/MovieApp.png",
    url: "/movies",
  },
  {
    id: 2,
    name: "New Years Countdown",
    description: "Create a countdown timer for New Year's Eve",
    image: "/NewYearsCountdown.png",
    url: "/countdown",
  },
  {
    id: 3,
    name: "Shopping Cart Bug",
    description: "Fix a bug in an existing shopping cart application",
    image: "/ShoppingCartBug.png",
    url: "/shopping-cart",
  },
  {
    id: 4,
    name: "Simple Calculator",
    description: "Create a simple calculator application with Vue.js",
    image: "/SimpleCalculator.png",
    url: "/calculator",
  },
  {
    id: 5,
    name: "Tic-Tac-Toe",
    description: "Create a Tic-Tac-Toe game with Vue.js",
    image: "/TicTacToe.png",
    url: "/tic-tac-toe",
  },
  {
    id: 6,
    name: "Virtual Aquarium",
    description: "Create a virtual aquarium with Vue.js",
    image: "/VirtualAquarium.png",
    url: "/aquarium",
  },
  {
    id: 7,
    name: "Multiple Choice Quiz",
    description: "Create a multiple choice quiz with Vue.js",
    image: "/MultipleChoiceQuiz.png",
    url: "/quiz",
  },
  {
    id: 8,
    name: "Task List Bug",
    description: "Fix a bug in an existing task list application",
    image: "/TaskListBug.png",
    url: "/task-list",
  },
  {
    id: 9,
    name: "Profile Form Bug",
    description: "Fix a bug in an existing user profile form",
    image: "/ProfileFormBug.png",
    url: "/profile",
  },
];
</script>
