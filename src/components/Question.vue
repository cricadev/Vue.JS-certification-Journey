<template>
  <div class="flex justify-center">
    <form v-if="!isResult" class="flex flex-col items-center justify-center gap-4" @submit.prevent="handleQuestionSubmit">
      <!-- ALERT -->
      <div v-if="!isCorrectAnswer && isWrongAnswer"
        class="flex items-center gap-2 p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
        </svg>
        <div>
          <span class="font-medium">Wrong answer!</span>
        </div>
      </div>
      <div v-if="isCorrectAnswer && !isWrongAnswer"
        class="flex items-center gap-2 p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
        role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Correct!</span>
        </div>
      </div>
      <h2 class="text-5xl font-semibold leading-relaxed text-center text-white border-b-2 border-b-white">
        {{ question.question }}</h2>
      <div class="flex flex-col px-8 mx-auto mt-4">
        <label v-for="answer in question.options" class="inline-flex items-center">
          <input type="radio" ref="radioButtons" class="w-5 h-5 text-gray-600 form-radio" name="answer" :value="answer"
            required @click="answerValue = $event.target.value">
          <span class="ml-2 text-white">{{ answer }}</span>
        </label>
      </div>
      <button type="submit" v-if="!isSubmit"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Submit </button>
      <button v-else @click="handleNextQuestionButton" type="button"
        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Next</button>
    </form>
    <div class="text-6xl font-bold text-center text-white" v-else>
      YOU GOT: {{ countCorrectAnswers }} out of {{ questions.length }}
      <br>
      <span class="text-yellow-300 animate-pulse">
        PS: {{ responseToResult }}
      </span>

    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed } from "vue"
/* 
Display a question with four answer options.
Allow users to select one answer option.
Provide a "Submit" button to submit the user's answer.
Display a message indicating whether the user's answer is correct or incorrect.
Provide a "Next" button to load the next question.
Keep track of the user's score throughout the quiz.
Display the final score after the last question.
*/
const radioButtons = ref(null)
const countCorrectAnswers = ref(0)
const isCorrectAnswer = ref(false);
const isWrongAnswer = ref(false)
const answerValue = ref('')
const isSubmit = ref(false);
const isResult = ref(false)
const questionIndex = ref(0)
const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is closest to the sun?",
    options: ["Earth", "Mars", "Venus", "Mercury"],
    answer: "Mercury",
  },
]
const question = computed(() => {
  return questions[questionIndex.value]
})

const responseToResult = computed(() => {
  if (countCorrectAnswers.value === questions.length) {
    return `YOOO MAN YOU'RE ACTUALLY GOOD`
  }
  else if (countCorrectAnswers.value < questions.length && countCorrectAnswers.value !== 0) {
    return 'NOT BAD MY G'
  }
  else if (countCorrectAnswers.value === 0) {
    return `you're terrible man! go study for a lil bit`
  }
})


const handleQuestionSubmit = (e) => {
  isSubmit.value = true;
  if (isSubmit.value) {
    if (answerValue.value === question.value.answer) {
      isCorrectAnswer.value = true;
      isWrongAnswer.value = false;
      countCorrectAnswers.value++;
    } else {
      isWrongAnswer.value = true;
      isCorrectAnswer.value = false;
    }
  }
}
const handleNextQuestionButton = (e) => {
  if (questions.length <= questionIndex.value + 1) {
    isResult.value = true;
  } else {
    questionIndex.value++;
  }
  isCorrectAnswer.value = false;
  isWrongAnswer.value = false;
  isSubmit.value = false;
  answerValue.value = '';
  radioButtons.value.forEach((r) => r.checked = false)
}

</script>