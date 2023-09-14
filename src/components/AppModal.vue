<template lang="">
  <div class="relative flex flex-col items-center justify-center w-screen h-screen">
    <h2 class="text-2xl text-red-400">{{title}}</h2>
    <button class="absolute px-2 text-2xl text-white bg-blue-500 rounded-full top-4 right-4" @click="$emit('close')"
        >X</button>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: null,
  }
})
defineEmits(['close'])
</script>
<style lang="">
  
</style>