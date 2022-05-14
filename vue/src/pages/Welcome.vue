<script setup>
import { useUsers } from '@/stores/user'

const store = useUsers()

const auth = store.authUser
</script>

<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
    <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
      <router-link
        v-if="auth"
        to="/dashboard"
        class="text-sm text-gray-700 underline"
      >
        Dashboard
      </router-link>

      <template v-else>
        <router-link
          to="/login"
          class="ml-4 text-sm text-gray-700 underline"
        >
          Log in
        </router-link>
        <router-link
          to="/register"
          class="ml-4 text-sm text-gray-700 underline"
        >
          Register
        </router-link>
      </template>
    </div>

    <div class="h-screen w-screen bg-gray-50 flex items-center">
      <div class="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div class="w-full lg:w-1/2 mx-8">
          <div class="text-7xl text-green-500 font-dark font-extrabold mb-8">Laravel Surveys</div>
          <p class="text-2xl md:text-3xl font-light leading-normal mb-8">
            Create and share surveys, get the answers you were looking for!
          </p>

          <router-link
            to="/dashboard"
            class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
          >
            Dashboard
          </router-link>
        </div>
        <div class="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://spaces-cdn.clipsafari.com/6dul8tkm3w9fd8a8qc6wuhxnty6a"
            class=""
            alt="Page not found"
          >
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gray-100 {
    background-color: #f7fafc;
    background-color: rgba(247, 250, 252, var(--tw-bg-opacity));
}

.border-gray-200 {
    border-color: #edf2f7;
    border-color: rgba(237, 242, 247, var(--tw-border-opacity));
}

.text-gray-400 {
    color: #cbd5e0;
    color: rgba(203, 213, 224, var(--tw-text-opacity));
}

.text-gray-500 {
    color: #a0aec0;
    color: rgba(160, 174, 192, var(--tw-text-opacity));
}

.text-gray-600 {
    color: #718096;
    color: rgba(113, 128, 150, var(--tw-text-opacity));
}

.text-gray-700 {
    color: #4a5568;
    color: rgba(74, 85, 104, var(--tw-text-opacity));
}

.text-gray-900 {
    color: #1a202c;
    color: rgba(26, 32, 44, var(--tw-text-opacity));
}

@media (prefers-color-scheme: dark) {
    .dark\:bg-gray-800 {
        background-color: #2d3748;
        background-color: rgba(45, 55, 72, var(--tw-bg-opacity));
    }

    .dark\:bg-gray-900 {
        background-color: #1a202c;
        background-color: rgba(26, 32, 44, var(--tw-bg-opacity));
    }

    .dark\:border-gray-700 {
        border-color: #4a5568;
        border-color: rgba(74, 85, 104, var(--tw-border-opacity));
    }

    .dark\:text-white {
        color: #fff;
        color: rgba(255, 255, 255, var(--tw-text-opacity));
    }

    .dark\:text-gray-400 {
        color: #cbd5e0;
        color: rgba(203, 213, 224, var(--tw-text-opacity));
    }
}
</style>
