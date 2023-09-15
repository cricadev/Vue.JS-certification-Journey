<template>
  <div class="w-screen h-screen wrapper-countdown">
    <h1 class="text-center text-white text-8xl">New Years Countdown</h1>
    <div class="flex justify-between max-w-5xl">
      <CountdownSegment v-for="number in NewYearsCountdown" :key="number.id" :number="number" />
    </div>

  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import CountdownSegment from "../components/CountdownSegment.vue";

const newYearsDate = new Date("Jan 1, 2024 00:00:00")
const now = ref(Date.now());

const refNYDate = ref(newYearsDate.getTime())
const currentDate = ref(new Date());

setInterval(() => {
  currentDate.value = Date.now();
}, 1000);

const elapsed = computed(() => {
  return refNYDate.value - currentDate.value;
})

const computedSeconds = computed(() => {
  return Math.floor((elapsed.value / 1000) % 60);
})
const computedMinutes = computed(() => {
  return Math.floor((elapsed.value / 1000 / 60) % 60);
})
const computedHours = computed(() => {
  return Math.floor((elapsed.value / (1000 * 60 * 60)) % 24);
})
const computedDays = computed(() => {
  return Math.floor(elapsed.value / (1000 * 60 * 60 * 24));
})







const NewYearsCountdown = reactive({
  days: {
    id: 1,
    number: computedDays,
    label: "Days",
  },
  hours: {
    id: 2,
    number: computedHours,
    label: "Hours",
  },
  minutes: {
    id: 3,
    number: computedMinutes,
    label: "Minutes",
  },
  seconds: {
    id: 4,
    number: computedSeconds,
    label: "Seconds",
  },
})
</script>
<style lang="">

</style>