<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <div class="space-y-12">
      <div class="container">
        <div>
          <h2 class="title">Current User</h2>
          <p class="description">This is your current user profile.</p>
        </div>

        <div class="content">
          <div class="sm:col-span-3">
            <div class="label">First name</div>
            <div class="mt-2">
              {{ user.firstName }}
            </div>
          </div>

          <div class="sm:col-span-3">
            <div class="label">Last name</div>
            <div class="mt-2">
              {{ user.lastName }}
            </div>
          </div>

          <div class="sm:col-span-4">
            <div class="label">Email address</div>
            <div class="mt-2">
              {{ user.email }}
            </div>
          </div>

          <div class="col-span-full">
            <div class="label">Photo</div>
            <div class="image-wrapper">
              <img :src="user.image" alt="" class="image" />
            </div>
          </div>

          <div class="col-span-full">
            <div class="label">About</div>
            <div class="mt-2">
              {{ user.about }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
