<script setup>
import { ref, watch, reactive } from "vue";
import O from "/src/OLetter.png"
import X from "/src/Xletter.png"

const gameOver = ref(false)
const playerXMoves = reactive({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
})
const playerOMoves = reactive({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
})
const countMoves = ref(0)

const handleTurn = (e) => {
  if(gameOver.value){
    return;
  }
  let cell = e.target;
  let cellNumber = cell.dataset.cell;
  
}

const resetGame = () => {
  gameOver.value = true;

}
const restartGame = () => {
  countMoves.value = 0;
  gameOver.value = false;
  for (let i = 1; i <= 9; i++) {
    playerXMoves[i] = false;
    playerOMoves[i] = false;
  }
}
const removeWatch = watch(countMoves, (newM, oldM) => {
  console.log(oldM, newM)
  if (newM === 9) {
    playerXMoves[newM] = true;
    setTimeout(() => {
      resetGame()
    }, 1000)
  }
  else if (newM % 2 === 0) {
    console.log("Player O turns", playerOMoves[newM])
    playerOMoves[newM] = true;
  }
  else {
    console.log("Player X turns", playerXMoves[newM])
    playerXMoves[newM] = true;

  }

})
</script>
<template>
  <div>
    <h1 class="my-4 text-6xl font-bold text-center text-white">tic tac toe</h1>
    <div class="board">
      <div v-if="gameOver" class="absolute reset-game top-1/2 left-1/2 translate-x-[-50%]  translate-y-[-50%]">
        <button class="py-2 text-white bg-blue-500 rounded-md top- hover:bg-blue-600" @click="restartGame">Reset
          Game</button>
      </div>
      <div class="board-cell" @click="handleTurn" v-for="cell in 9">
        <img :src="O" alt="" v-if="playerOMoves[cell]">
        <img :src="X" alt="" v-if="playerXMoves[cell]">
      </div>
    </div>
  </div>
</template>