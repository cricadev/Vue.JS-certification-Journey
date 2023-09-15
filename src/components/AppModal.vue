<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["close"]);
</script>
<template>
  <transition>
    <div v-if="show" class="relative flex flex-col items-center justify-center w-screen h-screen bg-modal">
      <h2 class="text-2xl text-red-400">{{ title }}</h2>
      <button class="absolute px-2 text-2xl text-white bg-blue-500 rounded-full top-4 right-4" @click="$emit('close')">
        X
      </button>
      <slot class="form-modal"></slot>
    </div>
  </transition>
</template>

<style>
.v-enter-active .bg-modal,
.v-leave-active .bg-modal {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from .form-modal,
.v-leave-to .form-modal {
  transform: translateY(-50px);
}
</style>
