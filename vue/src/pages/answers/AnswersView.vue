<template>
  <BreezeAuthenticatedLayout>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          {{ model.title }}
        </h2>
      </div>
    </template>
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <div
              v-if="loading"
              class="flex justify-center"
            >
              <div
                class="
                spinner-border
                animate-spin
                inline-block
                w-12
                h-12
                border-4
                rounded-full"
                role="status"
              ></div>
            </div>
            <div
              v-else
              class="grid grid-cols-1 gap-5 text-gray-700"
            >
              <div
                v-for="(question, i) in model.data"
                :key="question.id"
                :style="{ animationDelay: `${i * 0.1}s` }"
                class="bg-white shadow-md p-3 flex flex-col animate-fade-in-down"
              >
                <h3 class="text-2xl font-semibold mb-2">{{ parseInt(i) + 1 }}. {{ question.question.question }}</h3>
                <div v-if="question.question.type === 'select'">
                  <div
                    v-for="(answer) in question.answers"
                    :key="answer.id"
                  >
                    <select
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md
            shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
            sm:text-sm"
                      disabled
                    >
                      <option>
                        {{ answer.answer }}
                      </option>
                    </select>
                  </div>
                </div>
                <div v-else-if="question.question.type === 'radio'">
                  <div
                    v-for="(answer) in question.answers"
                    :key="answer.id"
                  >
                    <div class="flex items-center">
                      <input
                        :name="'answer' + answer.id"
                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        disabled
                      />
                      <label
                        :for="'answer' + answer.id"
                        class="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {{ answer.answer }}
                      </label>
                    </div>
                  </div>
                </div>
                <div v-else-if="question.question.type === 'checkbox'">
                  <div
                    v-for="(answer) in question.answers"
                    :key="answer.id"
                  >
                    <div
                      v-for="(option) in answer.answer"
                      :key="option.id"
                      class="flex items-center"
                    >
                      <input
                        :id="option.id"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        disabled
                      />
                      <label
                        :for="option.id"
                        class="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {{ option }}
                      </label>
                    </div>
                  </div>
                </div>
                <div v-else-if="question.question.type === 'text'">
                  <div
                    v-for="(answer) in question.answers"
                    :key="answer.id"
                  >
                    <input
                      type="text"
                      :value="answer.answer"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm 
            sm:text-sm border-gray-300 rounded-md"
                      disabled
                    >
                  </div>
                </div>
                <div v-else-if="question.question.type === 'textarea'">
                  <div
                    v-for="(answer) in question.answers"
                    :key="answer.id"
                  >
                    <textarea
                      type="text"
                      :value="answer.answer"
                      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm 
            sm:text-sm border-gray-300 rounded-md"
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BreezeAuthenticatedLayout>
</template>

<script setup>
import BreezeAuthenticatedLayout from '@/layouts/Authenticated.vue'
import { PhotographIcon, PlusIcon, TrashIcon } from '@heroicons/vue/solid'

import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useAnswers } from '../../stores/answers'

const route = useRoute()
const router = useRouter()
const store = useAnswers()
const loading = computed(() => store.loading)

let model = ref({
  title: '',
  data: [],
})

// Observar si los datos de la survey actual cambian y cuando esto pase
// se actualiza el model local
watch(
  () => store.data,
  // El parámtero newVal es store.currentSurvey, por lo que es necesario acceder
  // a data para copiarlo a model
  (newVal, oldVal) => {
    model.value.data = {
      // Se evitan cambios de referencia con los JSON
      ...JSON.parse(JSON.stringify(newVal.data)),
    },
      model.value.title = newVal.title
  },
)

if (route.params.id) {
  store.getAnswers(route.params.id)
}
</script>