<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          <!-- Si existe la survey, muestra el título de la misma, si no, "Create a survey" -->
          {{ model.id ? model.title : "Create a Survey" }}
        </h1>
      </div>
    </template>
    <form @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!--  Campos del formulario -->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- Imagen -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image"
                :src="model.image"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span
                v-else
                class="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-full
                  overflow-hidden
                  bg-gray-100
                "
              >
                <PhotographIcon class="h-[80%] w-[80%] text-gray-300" />
              </span>
              <button
                type="button"
                class="
                  relative
                  overflow-hidden
                  ml-5
                  bg-white
                  py-2
                  px-3
                  border border-gray-300
                  rounded-md
                  shadow-sm
                  text-sm
                  leading-4
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-indigo-500
                "
              >
                <input
                  type="file"
                  class="
                    absolute
                    left-0
                    top-0
                    right-0
                    bottom-0
                    opacity-0
                    cursor-pointer
                  "
                />
                Change
              </button>
            </div>
          </div>
          <!-- / Imagen -->

          <!-- Título -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              v-model="model.title"
              autocomplete="survey_title"
              class="
                mt-1
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                shadow-sm
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <!-- / Título -->

          <!-- Descripción -->
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
                name="description"
                id="description"
                rows="3"
                v-model="model.description"
                autocomplete="survey_description"
                class="
                  shadow-sm
                  focus:ring-indigo-500 focus:border-indigo-500
                  mt-1
                  block
                  w-full
                  sm:text-sm
                  border border-gray-300
                  rounded-md
                "
                placeholder="Describe your survey"
              ></textarea>
            </div>
          </div>
          <!-- / Descripción -->

          <!-- Fecha de caducidad -->
          <div>
            <label
              for="expire_date"
              class="block text-sm font-medium text-gray-700"
              >Expire date</label
            >
            <input
              type="date"
              name="expire_date"
              id="expire_date"
              v-model="model.expire_date"
              class="
                mt-1
                focus:ring-indigo-500 focus:border-indigo-500
                block
                w-full
                shadow-sm
                sm:text-sm
                border-gray-300
                rounded-md
              "
            />
          </div>
          <!-- / Fecha de caducidad -->

          <!-- Estado -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                type="checkbox"
                name="status"
                id="status"
                v-model="model.status"
                class="
                  focus:ring-indigo-500
                  h-4
                  w-4
                  text-indigo-600
                  border-gray-300
                  rounded
                "
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700"
                >Active</label
              >
            </div>
          </div>
          <!-- /Estado -->
        </div>
        <!-- / Campos del formulario -->

        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions
            <!-- Agregar pregunta -->
            <button
              type="button"
              @click="addQuestion()"
              class="
                flex
                items-center
                text-sm
                px-4
                py-1
                rounded-sm
                text-white
                bg-gray-600
                hover:bg-gray-700
              "
            >
              <PlusIcon class="h-4 w-4" />
              Add question
            </button>
            <!-- / Agregar pregunta -->
          </h3>
          <div v-if="!model.questions.length" class="text-center text-gray-600">
            You don't have any questions created
          </div>
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            />
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="
              inline-flex
              justify-center
              py-2
              px-4
              border border-transparent
              shadow-sm
              text-sm
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup>
import { PhotographIcon, PlusIcon } from "@heroicons/vue/solid";

import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import store from "../store";

import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/editor/QuestionEditor.vue";

const route = useRoute();

let model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  expire_date: null,
  questions: [],
});

if (route.params.id) {
  model.value = store.state.surveys.find(
    (s) => s.id === parseInt(route.params.id)
  );
}
</script>
