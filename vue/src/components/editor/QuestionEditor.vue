<template>
  <div>
    <!-- Índice de la pregunta -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-bold">{{ index + 1 }}. {{ model.question }}</h3>
      <div class="flex items-center">
        <!-- Agregar nueva pregunta -->
        <button
          type="button"
          @click="addQuestion()"
          class="
            flex
            items-center
            text-xs
            py-1
            px-3
            mr-2
            rounded-sm
            text-white
            bg-gray-600
            hover:bg-gray-700
          "
        >
          <PlusIcon class="h-4 w-4" />
          Add
        </button>
        <!-- / Agregar nueva pregunta -->

        <!-- Eliminar pregunta -->
        <button
          type="button"
          @click="deleteQuestion()"
          class="
            flex
            items-center
            text-xs
            px-3
            py-1
            rounded-sm
            border border-transparent
            text-red-500
            hover:border-red-600
          "
        >
          <TrashIcon class="h-4 w-4" />
          Delete
        </button>
        <!-- / Eliminar pregunta -->
      </div>
    </div>
    <!-- / Índice de la pregunta -->

    <!-- Preguntas -->
    <div class="grid gap-3 grid-cols-12">
      <!-- Pregunta -->
      <div class="mt-3 col-span-9">
        <label
          :for="'question_text_' + model.data"
          class="block text-sm font-medium text-gray-700"
          >Question text</label
        >
        <input
          type="text"
          :name="'question_text_' + model.data"
          :id="'question_text_' + model.data"
          v-model="model.question"
          @change="dataChange"
          class="
            mt-1
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            shadown-sm
            sm:text-sm
            border-gray-300
            rounded-md
          "
        />
      </div>
      <!-- / Pregunta -->

      <!-- Tipo de pregunta -->
      <div class="mt-3 col-span-3">
        <label
          for="question_type"
          class="block text-sm font-medium text-gray-700"
          >Select question type</label
        >
        <select
          name="question_type"
          id="question_type"
          v-model="model.type"
          @change="typeChange"
          class="
            mt-1
            block
            w-full
            px-3
            py-2
            border border-gray-300
            bg-white
            rounded-md
            shadow-sm
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            sm:text-sm
          "
        >
          <option v-for="type in questionTypes" :key="type" :value="type">
            {{ upperCaseFirst(type) }}
          </option>
        </select>
      </div>
      <!-- / Tipo de pregunta -->
    </div>
    <!-- / Preguntas -->

    <!-- Descripción de la pregunta -->
    <div class="mt-3 col-span-9">
      <label
        :for="'question_description_' + model.id"
        class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <textarea
        :name="'question_description_' + model.id"
        :id="'question_description_' + model.id"
        v-model="model.description"
        @change="dataChange"
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
      ></textarea>
    </div>
    <!-- / Descripción de la pregunta -->
    <hr class="my-4" />
  </div>
</template>

<script setup>
import { PlusIcon, TrashIcon } from "@heroicons/vue/solid";

import { ref } from "@vue/reactivity";

const props = defineProps({
  question: Object,
  index: Number,
});

// Métodos para llamar desde las plantillas
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

// Se vuelve a crear todos los datos de la pregunta para evitar modificaciones
// no intenciondas a la referencia
const model = ref(JSON.parse(JSON.stringify(props.question)));
</script>

<style>
</style>