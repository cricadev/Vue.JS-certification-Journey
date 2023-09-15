<template>
  <div class="flex flex-col px-16">
    <Transition>
      <span class="number" id="number" :key="number.number">{{ number.number }}</span>
    </Transition>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  number: {
    type: Object,
    required: true,
    default: null,
  },
})

</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.number {
  @apply text-9xl absolute;
}
</style>