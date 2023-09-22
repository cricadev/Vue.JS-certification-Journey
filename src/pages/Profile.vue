<script setup>
import CurrentUser from "../components/CurrentUser.vue";
import ProfileForm from "../components/ProfileForm.vue";
import { ref } from "vue";

let user = ref({
  firstName: "James",
  lastName: "Sullivan",
  about:
    "James Sullivan is a renowned scarer at Monsters, Inc. where he works alongside his partner and best friend Mike Wazowski. Sulley's world gets turned upside down when he becomes the accidental guardian of a human child. In working to return Boo to the human world, Sulley manages to uncover a company conspiracy while also solving an energy crisis that plagued the city of Monstropolis.",
  email: "sulley@monstersinc.com",
  image: "/sully.webp",
});

const updateUserData = (data) => {
  user.value = data;
};
</script>
<template>
  <div class="wrapper">
    <CurrentUser :user="user" />
    <ProfileForm :user="user" @update="updateUserData" />
  </div>
</template>
<style>
.card {
  @apply mb-5 md:mb-0 md:w-1/2 mx-auto border border-gray-900/10 shadow-xl rounded-md p-12 bg-white;
}

.card .container {
  @apply block md:block lg:grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3;
}

.card .container .title {
  @apply text-base font-semibold leading-7 text-gray-900;
}

.card .container .description {
  @apply mt-1 text-sm leading-6 text-gray-600 mb-5;
}

.card .content {
  @apply grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2;
}

.card .content .label {
  @apply block text-sm font-medium leading-6 text-gray-900;
}

.card .content .input {
  @apply block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6;
}

.card .content .hint {
  @apply mt-3 text-sm leading-6 text-gray-600;
}

.card .buttons {
  @apply mt-6 flex items-center justify-end gap-x-6;
}

.card .buttons .primary {
  @apply rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600;
}

.card .buttons .muted {
  @apply text-sm font-semibold leading-6 text-gray-900;
}

.card .image-wrapper {
  @apply mt-2 flex items-center gap-x-3;
}

.card .image-wrapper .image {
  @apply rounded-full border-4 border-slate-400 p-1 overflow-hidden w-24 h-24 object-cover;
}

.wrapper {
  @apply gap-5 p-5 md:flex;
}
</style>