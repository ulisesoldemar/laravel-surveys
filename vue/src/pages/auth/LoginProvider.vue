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

const setErrors = ref()

const errors = computed(() => setErrors.value)

const status = route.query.reset?.length > 0 ? atob(route.query.reset) : null

async function loginProvider() {
  store.loginCallback(store.provider, route.query.code)
}

loginProvider()

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
      Login with {{ store.provider }}, please wait
    </h1>
  </BreezeGuestLayout>
</template>
