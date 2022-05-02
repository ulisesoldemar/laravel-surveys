<template>
  <div class="py-5 px-8">
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
          rounded-full
          "
        role="status"
      ></div>
    </div>
    <form
      @submit.prevent="submitSurvey"
      v-else
      class="container mx-auto"
    >
      <div class="grid grid-cols-6 items-center">
        <div class="mr-4">
          <img
            :src="survey.image_url"
            alt=""
          />
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
          <p
            class="text-gray-500 text-sm"
            v-html="survey.description"
          ></p>
        </div>
      </div>
      <div
        v-if="surveyFinished"
        class="px-6 py-8 bg-emerald-400 text-white w-[600px] mx-auto"
      >
        <div class="text-xl mb-3 font-semibold">
          Thank you for participating in this survey.
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm
                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit another response
        </button>
      </div>
      <div v-else>
        <hr class="my-3" />
        <div
          v-for="(question, i) of survey.questions"
          :key="question.id"
        >
          <QuestionViewer
            v-model="answers[question.id]"
            :question="question"
            :index="i"
          />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm
                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import QuestionViewer from '@/components/viewer/QuestionViewer.vue'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSurveys } from '@/stores/surveys'

const route = useRoute()
const store = useSurveys()

const loading = computed(() => store.currentSurvey.loading)
const survey = computed(() => store.currentSurvey.data)

const surveyFinished = ref(false)

const answers = ref({})

store.getSurveyBySlug(route.params.slug)

function submitSurvey() {
  console.log(JSON.stringify(answers.value, undefined, 2))
  store
    .saveSurveyAnswer({
      surveyId: survey.value.id,
      answers: answers.value,

    })
    .then((response) => {
      if (response.status === 201) {
        surveyFinished.value = true
      }
    })
}

function submitAnotherResponse() {
  answers.value = {}
  surveyFinished.value = false
}

</script>

<style></style>
