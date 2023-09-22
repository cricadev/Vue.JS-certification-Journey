<template>
  <div v-if="fish">
    <div class="absolute fish-wrapper" ref="fishEl" @click="handleFoodByClick">
      <img ref="fishImg" :src="fish.image" :title="fish.name" class="w-64 h-full fish-alive">

      <TransitionGroup>
        <span class="text-fish" v-if="bornToBeWild">
          {{ randomBornTexts }}
        </span>
        <span class="text-fish" v-else-if="aboutToStarve">
          {{ aboutToStarveTexts }}
        </span>
        <span class="text-fish" v-else-if="isStarving">
          {{ almostDeadTexts }}
        </span>
        <span class="text-fish" v-if="isDeadbcOfFat">
          {{ fatTexts }}
        </span>
      </TransitionGroup>
      <div v-if="!isDead" class="absolute bottom-0 w-full h-4"
        :style="{ background: `linear-gradient(to left, #FF0000 ${100 - (fish.timeToStarve / (1000 / fish.speed)) * 100}%, #00FF00 ${100 - (fish.timeToStarve / (1000 / fish.speed)) * 100}% 100%)`, transition: 'background 0.5s linear' }">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch, watchEffect, computed } from "vue"
import { useWindowSize } from '@vueuse/core'
import deadImg from "/dead.png"
// variables declare
const { width: screenWidth, height: screenHeight } = useWindowSize();
const isDead = ref(false);
const fishEl = ref(null);
const fishImg = ref(null);
const isStarving = ref(false);
const aboutToStarve = ref(false);
const bornToBeWild = ref(true);
const isDeadbcOfFat = ref(false);
const randomBornTexts = computed(() => {
  const texts = ['conchesumaderee', 'bobby fisher just reborn', 'im looking for nemo', 'Im aliveeee'];
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
});
const aboutToStarveTexts = computed(() => {
  const texts = ['feed me soon', 'I want chomp chomp', 'feeed me'];
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
})
const almostDeadTexts = computed(() => {
  const texts = ['GONNA DIEEEE', 'HELP MEE', 'AAAAH'];
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
})
const fatTexts = computed(() => {
  const texts = ['BRUICE BRUICE', 'BURGUER FISH', 'YOU KILLED ME'];
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
})
setTimeout(() => {
  bornToBeWild.value = false;
}, 3000)
let clean = null;

const handleFoodByClick = () => {
  props.fish.timeToStarve += 5;

}
/* utility function*/
const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// when onMounted we spawn the fish
onMounted(() => {
  if (props.fish) {
    spawnFish()
  }
});

// the fish prop object
const props = defineProps({
  fish: {
    type: Object,
    required: true,
  }
})
// the function where we spawn the fish
const spawnFish = () => {

  // we get the measurements of the fishImg.value with rect.
  const rect = fishImg.value.getBoundingClientRect();
  // create coordinates for the X and Y, this is going to give us a random value using our util func between 0 and the screenWidth - the measurements of the fish so we don't get outside of the boundaries 
  const x = getRandomArbitrary(0, screenWidth.value - rect.width);
  const y = getRandomArbitrary(0, screenHeight.value - rect.height);
  // assign those coordinates to the object
  props.fish.x = x;
  props.fish.y = y;
  // apply those coordinates to the styles so we can actually see it render it
  fishEl.value.style.left = `${x}px`;
  fishEl.value.style.top = `${y}px`;
  // declare the setInterval so we can stop it when it goes to zero
  clean = setInterval(() => {
    props.fish.timeToStarve--;
  }, 1000);
};

// declaration of variables for the moveFish function,

// lastTime so we can check the time it was when we first call the func,
let lastTime = null;
//  direction so we can control it later on the func,
let directionX = 1;
let directionY = 1;
//  timeSinceDirectionChange so we can change the direction randomly after some seconds have passed 
let timeSinceDirectionChange = 0;


const moveFish = (time) => {
  // if the fish is dead then we don't use the function
  if (isDead.value) {

    if (lastTime === null) {
      lastTime = time;
    }

    const elapsed = time - lastTime;


    const distance = props.fish.speed * elapsed / 1000;

    directionY = -1;

    props.fish.y -= distance * directionY;

    if (fishEl.value) {
      if (props.fish.y > screenHeight.value - fishImg.value.height) {
        props.fish.y = screenHeight.value - fishImg.value.height;
        props.fish.speed = 0;
        fishImg.value.classList.add('fish--is-dead')
      }
      fishEl.value.style.left = `${props.fish.x}px`;
      fishEl.value.style.top = `${props.fish.y}px`;

      // if direction is equals -1 then we scaleX -1 so it flips, this is a common trick in game Dev
      if (directionX === -1) {
        fishImg.value.style.transform = 'scaleX(-1)';
      } else {
        fishImg.value.style.transform = 'scaleX(1)';

      }
    }

    lastTime = time;
  } else {

    // we assing the first time when we call the function since we are calling it as a callback function of requestAnimationFrame a webAPI
    if (lastTime === null) {
      lastTime = time;
    }
    // The elapsed variable represents the time elapsed between the current frame and the previous frame, in milliseconds. 
    const elapsed = time - lastTime;

    // we calculate the distance the fish has moved multiplying the speed by the elapsed time and we divided by 1000 so we convert the elapsed time from miliseconds to seconds. the elapsed variable is in milliseconds, while the props.fish.speed variable is in pixels per second, so we need to convert the elapsed time to seconds to get the correct distance that the fish should move
    const distance = props.fish.speed * elapsed / 1000;

    //.

    // we sum the distance and multiply by the direction we want to go, right now it only goes left and right but we want to make it go diagonals too
    props.fish.x += distance * directionX;
    props.fish.y += distance * directionY;

    // we can only apply styles if fishEl exists right?
    if (fishEl.value) {
      // with this statement we prevent the fish X coordinate going farther than the left side of the screen 
      if (props.fish.x < 0) {
        props.fish.x = 0;
        directionX = 1;
      }
      else if (props.fish.y < 0) {
        props.fish.y = 0;
        directionY = 1;
      }
      else if (props.fish.y > screenHeight.value - fishImg.value.height) {
        props.fish.y = screenHeight.value - fishImg.value.height;
        directionY = -1;
      }
      // here is the same thing but for the right side 
      else if (props.fish.x > screenWidth.value - fishImg.value.width) {
        props.fish.x = screenWidth.value - fishImg.value.width;
        directionX = -1;
      }
      // we apply the style left that will works for both left and right since x can be negative value also when direction is negative, maths son!
      fishEl.value.style.left = `${props.fish.x}px`;
      fishEl.value.style.top = `${props.fish.y}px`;

      // if direction is equals -1 then we scaleX -1 so it flips, this is a common trick in game Dev
      if (directionX === -1) {
        fishImg.value.style.transform = 'scaleX(-1)';
      } else {
        fishImg.value.style.transform = 'scaleX(1)';

      }
    }

    // some time have elapsed between the things that happened above so we update the lastTime
    lastTime = time;
    // we calculate the time that has passed so we can change the direction randomly
    timeSinceDirectionChange += elapsed;
    if (timeSinceDirectionChange > 10000) {
      directionX = Math.random() < 0.5 ? -1 : 1;
      directionY = Math.random() < 0.5 ? -1 : 1;

      timeSinceDirectionChange = 0;
    }
  }
  requestAnimationFrame(moveFish);
};

// a function to handle the death of the fish, we clean the interval so the timeToStarve doesn't go any lower and update the image of the fish
const fishJustDied = () => {
  isDead.value = true;
  clearInterval(clean);
  props.fish.image = deadImg
}

// watchEffect is the one that is basically making that everything happens, it works sorta like a while loop in JS, we just watching for some stuff to change and then we call functions based on that
watchEffect(() => {
  if (props.fish) {
    if (props.fish.timeToStarve <= 0) {
      fishJustDied();
    } else if (props.fish.timeToStarve <= 10) {
      aboutToStarve.value = true;
      setTimeout(() => {
        aboutToStarve.value = false;
      }, 3000)
      requestAnimationFrame(moveFish)

    } else if (props.fish.timeToStarve <= 5) {
      isStarving.value = true;
      setTimeout(() => {
        isStarving.value = false;
      }, 3000)
      requestAnimationFrame(moveFish)

    } else if (props.fish.timeToStarve > 50) {
      isDeadbcOfFat.value = true;
      fishJustDied()
      setTimeout(() => {
        isDeadbcOfFat.value = false;
      }, 3000)
      requestAnimationFrame(moveFish)
    }
    else {
      requestAnimationFrame(moveFish)
    }
  }

});



</script>
<style  scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.fish--is-dead {
  animation-name: dead;
  animation-duration: 3000ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

}

@keyframes dead {
  0% {
    opacity: 1;
  }


  100% {
    opacity: 0;
  }
}
</style>