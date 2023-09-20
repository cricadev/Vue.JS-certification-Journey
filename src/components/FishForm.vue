<template>
  <div>

    <!-- drawer init and toggle -->
    <div class="absolute top-1/2 translate-y-[-50%]">
      <button
        class="p-2 mb-2 mr-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
        aria-controls="drawer-example">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 8 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
        </svg>

      </button>
    </div>

    <!-- drawer component -->
    <div id="drawer-example"
      class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-blue-400 w-80 dark:bg-gray-800"
      tabindex="-1" aria-labelledby="drawer-label">

      <form @submit.prevent="handleFormSubmit" class="flex flex-col w-full h-full gap-12">
        <div class="grid w-full grid-cols-2 select-fish-image h-2/4">
          <img id="fish-image" class="fish-option" @click="handleFishClick" src="/goldfish.png" alt="">
          <img id="fish-image" class="fish-option" @click="handleFishClick" src="/golden-purple-fish.png" alt="">
          <img id="fish-image" class="fish-option" @click="handleFishClick" src="/tuna.png" alt="">
          <img id="fish-image" class="fish-option" @click="handleFishClick" src="/tropical-fish.png" alt="">
          <img id="fish-image" class="fish-option" @click="handleFishClick" src="/guppie.png" alt="">
        </div>
        <div>
          <label for="first_name" class="block mb-2 text-sm font-medium text-white">Fish Name</label>
          <input type="text" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John" required v-model="fish.name">
        </div>

        <button type="submit"
          class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add
          Fish</button>

      </form>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import {
  initDrawers,

} from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {

  initDrawers();
})
const isSelectedFish = ref(false)
const fish = reactive({
  id: 0,
  name: '',
  phrases: []
})
const handleFishClick = (e) => {
  isSelectedFish.value = true;
  const selectedFishImage = e.target.src;
  const fishesImages = document.querySelectorAll('#fish-image');
  fishesImages.forEach((f) => {
    if (!f.classList.contains('selected-fish') && isSelectedFish) {
      e.target.classList.add('selected-fish');
      isSelectedFish.value = false;
    }
  })

}
const handleFormSubmit = () => {
  console.log("fish submitted")

}
</script>
<style lang="">
  
</style>