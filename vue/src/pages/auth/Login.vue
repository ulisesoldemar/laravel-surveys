<script setup>
import { useRoute } from 'vue-router'
import { useUsers } from '@/stores/user'
import { computed, ref } from 'vue'
import BreezeButton from '@/components/Button.vue'
import BreezeCheckbox from '@/components/Checkbox.vue'
import BreezeGuestLayout from '@/layouts/Guest.vue'
import BreezeInput from '@/components/Input.vue'
import BreezeLabel from '@/components/Label.vue'
import BreezeValidationErrors from '@/components/ValidationErrors.vue'

const route = useRoute()

const store = useUsers()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const status = route.query.reset?.length > 0 ? atob(route.query.reset) : null

form.value = store.userLogin

const submitLogin = () => {
  store.login(setErrors, processing)
}

async function loginBySocial(provider) {
  store.loginBySocial(provider)
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url
      }
    })
}
</script>

<template>
  <BreezeGuestLayout>
    <div
      v-if="status"
      class="mb-4 font-medium text-sm text-green-600"
    >
      {{ status }}
    </div>

    <BreezeValidationErrors
      class="mb-4"
      :errors="errors"
    />
    <h1 class="mt-6 text-center font-extrabold text-gray-900">
      Sign in to your account
    </h1>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ ' ' }}
      <router-link
        to="/register"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        register for free
      </router-link>
    </p>
    <form @submit.prevent="submitLogin">
      <div>
        <BreezeLabel
          for="email"
          value="Email"
        />
        <BreezeInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
          autocomplete="username"
        />
      </div>

      <div class="mt-4">
        <BreezeLabel
          for="password"
          value="Password"
        />
        <BreezeInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
        />
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <BreezeCheckbox
            name="remember"
            :checked="form.remember"
            v-model="form.remember"
          />
          <span class="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <router-link
          to="/forgot-password"
          class="underline text-sm text-gray-600 hover:text-gray-900"
        >
          Forgot your password?
        </router-link>
        <BreezeButton
          class="ml-4"
          :processing="processing"
        >
          Login
        </BreezeButton>
      </div>
    </form>
    <div class="my-2 flex flex-row justify-center">
      <span class="bg-white absolute px-4">or</span>
      <div
        class="w-full bg-gray-200 mt-3 mb-3"
        style="height: 1px"
      ></div>
    </div>
    <div class="w-full flex flex-col gap-2">
    </div>
    <div class="grid space-y-4">
      <button
        @click="loginBySocial('google')"
        class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
      >
        <div class="relative flex items-center space-x-4 justify-center">
          <img
            src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
            class="absolute left-0 w-5"
            alt="google logo"
          >
          <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
        </div>
      </button>
      <button
        @click="loginBySocial('github')"
        class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
      >
        <div class="relative flex items-center space-x-4 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="absolute left-0 w-5 text-gray-700"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Github</span>
        </div>
      </button>
    </div>

  </BreezeGuestLayout>
</template>
