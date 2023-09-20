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


   <router-view/>
  
 </div>
</template>

<style lang="">
  
</style>