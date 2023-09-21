<template>
  <div v-if="fish">
    <div class="absolute fish-wrapper" ref="fishEl">
      <img ref="fishImg" :src="fish.image" :title="fish.name" class="w-64 h-full fish-alive">
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from "vue"
import { useWindowSize } from '@vueuse/core'

const { width: screenWidth, height: screenHeight } = useWindowSize();
const isDead = ref(false);

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
const fishEl = ref(null);
const fishImg = ref(null)
const spawnFish = () => {

  const rect = fishImg.value.getBoundingClientRect();
  const x = getRandomArbitrary(0, screenWidth.value - rect.width);
  const y = getRandomArbitrary(0, screenHeight.value - rect.height);
  fishEl.value.style.left = `${x}px`;
  fishEl.value.style.top = `${y}px`;
  setInterval(() => {
    props.fish.timeToStarve--;
  }, 1000)
}
const moveFish = () => {

  if (!fishImg.value || !fishEl.value) {
    return;
  }
  const rect = fishImg.value.getBoundingClientRect();
  let x = parseFloat(fishEl.value.style.left);
  let y = parseFloat(fishEl.value.style.top);
  let dx = getRandomArbitrary(-1, 2);
  let dy = getRandomArbitrary(-1, 2);
  const newX = x + dx * props.fish.speed;
  const newY = y + dy * props.fish.speed;

  if (newX < 0 || newX + rect.width > screenWidth) {
    dx = -dx;
    fishImg.value.style.transform = 'scaleX(-1)';
  }
  if (newY < 0 || newY + rect.height > screenHeight) {
    dy = -dy;
  }

  fishEl.value.style.left = `${newX}px`;
  fishEl.value.style.top = `${newY}px`;

  requestAnimationFrame(moveFish);
};

watch(() => props.fish.timeToStarve, (newV, oldV) => {

  if (newV === 0) {
    isDead.value = true;
  }
})
onMounted(() => {
  if (props.fish) {
    spawnFish()
    requestAnimationFrame(moveFish);
  }
});

const props = defineProps({
  fish: {
    type: Object,
    required: true,
  }
})

</script>
<style lang="">
  
</style>