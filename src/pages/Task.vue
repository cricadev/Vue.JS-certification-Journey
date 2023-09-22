<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { reactive, computed, ref } from "vue";

const tasks = ref([
  { id: 1, name: "Task 1" },
  { id: 2, name: "Task 2" },
  { id: 3, name: "Task 3" },
]);
const addTask = () => {
  const newTask = { id: Math.random(), name: `Task ${tasks.value.length + 1}` };
  tasks.value.push(newTask);
};
const removeTask = (id) => {
  tasks.value = tasks.value.filter((t) => t.id !== id)

};
</script>
<template>
  <div class="wrapper">
    <h1>Task List</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="text" v-model="task.name" />
        <button @click="removeTask(task.id)" data-test="button-remove">
          <XMarkIcon class="w-4 h-4" />
        </button>
      </li>
    </ul>
    <button @click="addTask" data-test="button-add">Add Task</button>
  </div>
</template>
<style>
body {
  @apply bg-gray-200 !important;
}

.wrapper {
  @apply bg-gray-200 p-4 rounded-lg shadow-lg max-w-lg mx-auto mt-5;
}

h1 {
  @apply text-4xl font-bold mb-4;
}

ul li {
  @apply list-none mb-4 border border-gray-400 rounded-lg relative;
}

button[data-test="button-remove"] {
  @apply w-6 h-6 p-1 absolute top-[50%] translate-y-[-50%] right-[10px] bg-red-900 text-white rounded-full hover:bg-red-700 inline-flex items-center justify-center ml-8;
}

button[data-test="button-add"] {
  @apply bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500;
}

input[type="text"] {
  @apply w-full bg-transparent rounded-lg p-2 pr-10;
}
</style>