<script setup>
import { useHead } from '@vueuse/head'
useHead({
  title: 'Vue.js Certification',
  meta: [
    {
      name: 'description',
      content: 'My journey towards becoming a certified Vue.js developer. Notes, projects and resources',
    },
    {
      name: 'keywords',
      content: 'Vue.js, Certification, Vue.js Certification',
    },
  ],
})
</script>
<template lang="">
 <div class="app">  

  <div class="fixed top-0 left-0 w-screen ">
    <nav class="bg-gray-800">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/"
              class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white">Home</router-link>
        
          </div>
        </div>
      </div>
    </nav>
  </div>
   <router-view/>
  
 </div>
</template>

<style lang="">
  
</style>