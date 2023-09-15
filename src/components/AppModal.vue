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
  <Transition>
    <div v-if="show"
      class="absolute top-0 left-0 z-30 grid items-center justify-center w-screen h-screen bg-black/80 place-items-center"
      id="bg-modal">
      <h2 class="relative z-10 pt-20 text-2xl text-red-400 place-self-start">{{ title }}</h2>
      <button class="absolute z-10 px-2 text-2xl text-white bg-blue-500 rounded-full top-4 right-4"
        @click="$emit('close')">
        X
      </button>
      <div class="modal-wrapper-inner">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active,
.v-enter-active .modal-wrapper-inner,
.v-leave-active .modal-wrapper-inner {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from .modal-wrapper-inner,
.v-leave-to .modal-wrapper-inner {
  transform: translateX(-100px);
}

.modal-wrapper-inner {
  @apply absolute flex items-center justify-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] max-w-lg w-full;
}
</style>
