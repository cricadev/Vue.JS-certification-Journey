<script setup>
import { reactive } from "vue";

const emit = defineEmits(["update:modelValue", "cancel"]);
const props = defineProps({
  modelValue: { type: Object, default: null },
});

const genres = reactive([
  { text: "Drama", value: "Drama" },
  { text: "Crime", value: "Crime" },
  { text: "Action", value: "Action" },
  { text: "Comedy", value: "Comedy" },
]);
const errors = reactive({
  name: null,
  description: null,
  image: null,
  inTheaters: null,
  genres: null,
  rating: null,
});

const form = reactive({
  id: props.modelValue?.id,
  name: props.modelValue?.name,
  description: props.modelValue?.description,
  image: props.modelValue?.image,
  inTheaters: props.modelValue?.inTheaters || false,
  genres: props.modelValue?.genres || [],
  rating: props.modelValue?.rating || null,
});

const validations = reactive({
  name: "required",
  genres: "required",
});

const validationRules = (rule) => {
  if (rule === "required") return /^ *$/;

  return null;
};
function clearErrors() {
  errors.name = null;
  errors.description = null;
  errors.image = null;
  errors.genres = null;
  errors.inTheaters = null;
}

function validate() {
  let valid = true;
  clearErrors();
  for (const [field, rule] of Object.entries(validations)) {
    const validation = validationRules(rule);
    if (validation) {
      if (validation.test(form[field] || "")) {
        errors[field] = `${field} is ${rule}`;
        valid = false;
      }
    }
  }

  return valid;
}
function cancelForm() {
  cleanUpForm();
  emit("cancel");
}

function saveMovie() {
  if (validate()) {
    const data = {
      id: form.id || Number(Date.now()),
      name: form.name,
      description: form.description,
      image: form.image,
      genres: form.genres,
      inTheaters: form.inTheaters,
      rating: form.rating,
    };
    emit("update:modelValue", data);
  }
}

function cleanUpForm() {
  form.name = null;
  form.description = null;
  form.image = null;
  form.genres = null;
  form.inTheaters = false;
  clearErrors();
}


</script>
<template lang="">


    <form class="relative flex items-center justify-center modal-wrapper" @submit.prevent="saveMovie">
  
      <div class="mt-10">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required v-model="form.name">
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" name="description" v-model="form.description"></textarea>
        </div>
        <div class="form-group">
          <label for="image">Image:</label>
          <input type="text" id="image" name="image" v-model="form.image">
        </div>
        <div class="form-group">
          <label for="genre">Genre:</label>
          <select id="genre" name="genre" v-model="form.genres" multiple required>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="sci-fi">Sci-Fi</option>
          </select>
        </div>
        <div class="form-group">
          <label for="theaters">Is in theathers:</label>
          <input type="checkbox" id="featured" v-model="form.inTheaters" />
        </div>
        <div class="flex flex-row justify-between gap-2">
          <button class="px-2 text-2xl text-white bg-blue-500 rounded-full "
        @click="cancelForm">Cancel</button>
          <button type="submit" class="px-2 text-red-500 bg-white rounded-md ">Submit</button>
        </div>
      </div>
    </form>
  



</template>
<style lang="">
  
</style>