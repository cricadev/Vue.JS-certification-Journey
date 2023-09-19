<script setup>
import { ref, watch, reactive, computed } from "vue";
import O from "/src/OLetter.png"
import X from "/src/Xletter.png"

const isXWinner = ref(false);
const isOWinner = ref(false);
const isADraw = ref(false);
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
  9: false,
})
const currentTurn = ref(1)


const isEven = (n) => {
  return n % 2 == 0;
}
const isOdd = (n) => {
  return Math.abs(n % 2) == 1;

}


const handleTurn = (e) => {
  if (gameOver.value) {
    return;
  }
  const cell = e.target.dataset.cell;
  // 1.  we have each player as a reactive object with the 9 cells as booleans that has  to be triggered to true whenever the user clicks a cell that matches the key of this boolean value we previously talked, also it's not possible to trigger to true if the other player is already there

  for (const move in playerOMoves) {
    if (move === cell && isOdd(currentTurn.value)) {
      console.log("was X turn", cell)
      playerXMoves[cell] = true;
      currentTurn.value++;
      if (checkWin() === "X") {
        isXWinner.value = true;
        gameOver.value = true;
      }
    }
    else if (move === cell && isEven(currentTurn.value)) {
      console.log("was O turn")
      playerOMoves[cell] = true;
      currentTurn.value++;
      if (checkWin() === "O") {
        isOWinner.value = true;
        gameOver.value = true;
      }
    }
  }
}





watch(currentTurn, (newV, oldV) => {
  if (oldV === 9) {
    setTimeout(() => {
      gameOver.value = true;
      isADraw.value = true;
    }, 100)
  }
})
const checkWin = () => {
  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (playerXMoves[a] && playerXMoves[b] && playerXMoves[c]) {
      for (const cell of combination) {
        document.querySelector(`[data-cell="${cell}"]`).classList.add("winning-cell");
      }
      return "X";
    }
    else if (playerOMoves[a] && playerOMoves[b] && playerOMoves[c]) {
      for (const cell of combination) {
        document.querySelector(`[data-cell="${cell}"]`).classList.add("winning-cell");
      }
      return "O";
    }
  }

  return null;
};
const restartGame = () => {
  currentTurn.value = 1;
  gameOver.value = false;
  isADraw.value = false;
  isXWinner.value = false;
  isOWinner.value = false;
  document.querySelectorAll('[data-cell]').forEach((el) => el.classList.remove("winning-cell"))
  for (let i = 1; i <= 9; i++) {
    playerXMoves[i] = false;
    playerOMoves[i] = false;
  }
}

</script>
<template>
  <div>
    <h1 class="my-4 text-6xl font-bold text-center text-white">tic tac toe</h1>
    <div class="">
      <h2 class="turn-label" v-if="isEven(currentTurn) && currentTurn < 9 && !gameOver"> It's Player O turn
      </h2>
      <h2 class="turn-label" v-if="isOdd(currentTurn) && !gameOver"> It's Player X turn</h2>


      <h2 class="turn-label" v-if="currentTurn > 9">
        GAME OVER
      </h2>

    </div>
    <div class="board">
      <transition>
        <div v-if="gameOver"
          class="absolute reset-game top-32 left-1/2 translate-x-[-50%] flex flex-col justify-center items-center">
          <h2 class="label-winner" v-if="isXWinner"> X IS WINNER, THE REAL MOTHERFUCKER
          </h2>
          <h2 class="label-winner" v-if="isOWinner"> O IS WINNER, THE REAL MOTHERFUCKER</h2>
          <h2 class="label-winner" v-if="isADraw && !isOWinner && !isXWinner">
            YOU TOO ARE A PIECE OF SHIT IT'S A FUCKING DRAW
          </h2>


          <button class="px-8 py-5 text-center text-white bg-blue-500 rounded-md top- hover:bg-blue-600"
            @click="restartGame">Reset
            Game</button>
        </div>
      </transition>
      <div class="board-cell" @click="handleTurn" v-for="cell in 9" :data-cell="cell">
        <transition-group>
          <img :src="O" alt="" v-if="playerOMoves[cell]">
          <img :src="X" alt="" v-if="playerXMoves[cell]">
        </transition-group>
      </div>
    </div>
  </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
