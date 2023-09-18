<script setup>
import { computed, ref, watch } from "vue";

const products = ref([
  { id: 1, name: "Mouse - Logitech MX Master 3S", price: 9220, quantity: 1 },
  { id: 2, name: "Keyboard - Logitech MX Keys", price: 7990, quantity: 1 },
  {
    id: 3,
    name: "WebCam - Logitech HD Pro Webcam C920",
    price: 6890,
    quantity: 1,
  },
]);


const total = computed(() => {
  if (products.value.forEach((product) => product.quantity < 1)) {
    console.log("it's zero")
  }

  return Math.round(
    products.value.reduce((acc, product) => acc + product.price * product.quantity, 0) / 100
  );
});
watch(products, () => {
  total.value;
});

function increaseQuantity(product) {
  product.quantity += 1;
}

function decreaseQuantity(product) {
  product.quantity -= 1;
}
</script>
<template>
  <div class="flex items-center justify-center w-screen h-screen dark:text-white">
    <div class="w-full max-w-3xl border rounded-md shadow-2xl border-gray-50 dark:border-gray-600">
      <h2 class="p-8 text-4xl text-gray-200 bg-gray-600">Shopping Cart</h2>
      <ul class="p-8 dark:text-white">
        <li v-for="product in products" :key="product.id"
          class="flex flex-col w-full p-4 my-2 odd:bg-gray-100 odd:dark:bg-gray-700">
          <span class="flex items-center justify-between w-full space-x-3">
            <span class="w-1/3 truncate">{{ product.name }}</span>
            <span>${{ product.price / 100 }}</span>
            <span class="inline-flex items-center justify-between space-x-3">
              <button class="px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-600" @click="decreaseQuantity(product)">
                -
              </button>
              <span class="w-12 text-center">{{ product.quantity }}</span>
              <button class="px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-600" @click="increaseQuantity(product)">
                +
              </button>
            </span>
            <span class="w-16 text-right">
              ${{ (product.price * product.quantity) / 100 }}
            </span>
          </span>
        </li>
      </ul>
      <p class="flex items-center justify-between p-8 mt-4 text-3xl">
        <span>Total:</span>
        <span class="font-bold">${{ total }}</span>
      </p>
    </div>
  </div>
</template>
