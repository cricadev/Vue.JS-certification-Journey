<script setup lang="ts">
import { ref, computed, watch, reactive, onMounted } from "vue";

/* 1. Display area must show the current calculation and result
  2. each number button must add the number to the display
  3. each arithmetic button must add the symbol to the display
  4. the clear button must clear the display and reset the calculator
  5. the equal button must calculate the result
  6. the decimal button must add a decimal point to the display

*/
onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      handleButtonNumber({ target: { innerText: e.key } });
    }
    else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
      handleArithmeticButton({ target: { innerText: e.key } });
    }
    else if (e.key === ".") {
      handleDecimalButton();
    }
    else if (e.key === "Enter") {
      performCalculations();
    }
    else if (e.key === "Backspace") {
      display.value = display.value.slice(0, -1);
    }
    else if (e.key === "Escape") {
      clearAndResetCalculator();
    }
  });
})
const display = ref("");
const arithmeticSymbols = reactive(["\\+", "-", "\\*", "/", "\\."]);
const handleButtonNumber = (e) => {
  if (display.value == "" && e.target.innerText == "0") {
    return;
  }
  display.value += e.target.innerText;
};
const clearAndResetCalculator = () => {
  display.value = "";
};

const lastArithmeticSymbol = ref(null);
const lastButtonClicked = ref(null)
const handleArithmeticButton = (e) => {
  const value = e.target.innerText;
  if (display.value === "") {
    return;
  }
  else if (arithmeticSymbols.includes(display.value.slice(-1))) {
    lastArithmeticSymbol.value = value;
    display.value = display.value.slice(0, -1);
    display.value += value;
  }
  else if (!isNaN(display.value.slice(-1))) {
    lastArithmeticSymbol.value = null;
    display.value += value;
  }
};
const performCalculations = () => {
  if (display.value === "") {
    return;
  }
  else if (lastArithmeticSymbol.value) {
    display.value = eval(display.value.slice(0, -1));
  }
  else if (arithmeticSymbols.includes(display.value.slice(-1))) {
    display.value = display.value.slice(0, -1);
    display.value = eval(display.value);
  }
  else {
    const result = eval(display.value);
    if (result === Infinity || result === -Infinity) {
      display.value = "Error: Division by zero";
    }
    else {
      display.value = result;
    }
  }
}

const handleDecimalButton = () => {
  if (display.value === "") {
    display.value = "0.";
  }
  else if (arithmeticSymbols.includes(display.value.slice(-1))) {
    return;
  }
  else {
    let lastNumber = "";
    for (let i = display.value.length - 1; i >= 0; i--) {
      const char = display.value.charAt(i);
      if (arithmeticSymbols.includes(char)) {
        lastNumber = display.value.slice(i + 1);
        break;
      }
    }
    if (lastNumber.includes(".")) {
      return;
    }
    else if (display.value.slice(-1) === ".") {
      return;
    }
    else if (display.value.match(/\d+\.\d*$/)) {
      return;
    }
    else {
      display.value += ".";
    }
  }
};
</script>
<template>
  <div class="relative max-w-xl pt-8 pb-4 rounded-md w-72 bg-slate-300">
    <span class="absolute top-0 font-bold text-center left-1/2 translate-x-[-50%]">CRICASSIO</span>
    <div class="display-area">
      <div class="display">
        <div class="display-text">
          <span>{{ display }}</span>
        </div>
      </div>
    </div>
    <div class="grid-calculator">
      <div class="clear-button">
        <button class="button" @click="clearAndResetCalculator">C</button>
      </div>
      <div class="arithmetic-buttons">
        <button class="button" @click="handleArithmeticButton">+</button>
        <button class="button" @click="handleArithmeticButton">-</button>
        <button class="button" @click="handleArithmeticButton">*</button>
        <button class="button" @click="handleArithmeticButton">/</button>
      </div>

      <div class="numbers-buttons">
        <button class="button" @click="handleButtonNumber">1</button>
        <button class="button" @click="handleButtonNumber">2</button>
        <button class="button" @click="handleButtonNumber">3</button>
        <button class="button" @click="handleButtonNumber">4</button>
        <button class="button" @click="handleButtonNumber">5</button>
        <button class="button" @click="handleButtonNumber">6</button>
        <button class="button" @click="handleButtonNumber">7</button>
        <button class="button" @click="handleButtonNumber">8</button>
        <button class="button" @click="handleButtonNumber">9</button>
        <button class="button" @click="handleButtonNumber">0</button>
      </div>

      <div class="equal-button">
        <button class="button" @click="handleDecimalButton">.</button>
        <button class="button" @click="performCalculations">=</button>
      </div>

    </div>
  </div>
</template>

<style lang="">
  
</style>