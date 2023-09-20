<template>
  <div v-if="fish">

    <img :src="fish.image" :title="fish.name">

  </div>
</template>
<script setup>
defineProps({
  fish: {
    type: Object,
    required: true,
  }
})
</script>
<style lang="">
  
</style>