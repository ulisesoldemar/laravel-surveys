<template>
    <div>
        <!-- Índice de la pregunta -->
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold">
                {{ index + 1 }}. {{ model.question }}
            </h3>
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
                    ">
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
                    ">
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
                    " />
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
                        focus:outline-none
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        sm:text-sm
                    ">
                    <option
                        v-for="type in questionTypes"
                        :key="type"
                        :value="type">
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
                "></textarea>
        </div>
        <!-- / Descripción de la pregunta -->

        <!-- Datos -->
        <div>
            <div v-if="shouldHaveOptions()" class="mt-2">
                <h4
                    class="
                        text-sm
                        font-semibold
                        mb-1
                        flex
                        justify-between
                        items-center
                    ">
                    Options
                    <!-- Agregar nueva opción -->
                    <button
                        type="button"
                        @click="addOption()"
                        class="
                            flex
                            justify-between
                            items-center
                            text-xs
                            px-2
                            py-1
                            rounded-sm
                            text-white
                            bg-gray-600
                            hover:bg-gray-700
                        ">
                        <PlusIcon class="h-3 w-3 inline-block" />
                        Add option
                    </button>
                    <!-- / Agregar nueva opción -->
                </h4>
                <div
                    v-if="!model.data.options.length"
                    class="text-xs text-gray-600 text-center py-2">
                    You don't have any options defined
                </div>
                <div>
                    <!-- Lista de opciones -->
                    <div
                        v-for="(option, index) in model.data.options"
                        :key="option.uuid"
                        class="flex items-center mb-1">
                        <span class="w-6 text-sm">{{ index + 1 }}</span>
                        <input
                            type="text"
                            v-model="option.text"
                            @change="dataChange"
                            class="
                                w-full
                                rounded-sm
                                px-2
                                py-1
                                text-xs
                                border border-gray-300
                                focus:border-indigo-500
                            " />
                        <!-- Eliminar opción -->
                        <button
                            type="button"
                            @click="removeOption(option)"
                            class="
                                h-6
                                w-6
                                rounded-full
                                flex
                                items-center
                                justify-center
                                border border-transparent
                                transition-colors
                                hover:border-red-100
                            ">
                            <TrashIcon class="h-3 w-3 text-red-500" />
                        </button>
                        <!-- / Eliminar opción -->
                    </div>
                    <!-- / Lista de opciones -->
                </div>
            </div>
        </div>
        <!-- / Datos -->

        <hr class="my-4" />
    </div>
</template>

<script setup>
import { PlusIcon, TrashIcon } from '@heroicons/vue/solid'

import { ref, computed } from '@vue/reactivity'
import { v4 as uuidv4 } from 'uuid'
import { useSurveys } from '@/stores/surveys'

const store = useSurveys()

const props = defineProps({
    question: Object,
    index: Number,
})

// Métodos para llamar desde las plantillas
const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion'])

// Se vuelve a crear todos los datos de la pregunta para evitar modificaciones
// no intenciondas a la referencia
const model = ref(JSON.parse(JSON.stringify(props.question)))

// Se obtienen los tipos de preguntas desde pinia
const questionTypes = computed(() => store.questionTypes)

function upperCaseFirst(str) {
    // Primera letra en mayúscula más el resto de la cadena
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function shouldHaveOptions() {
    // Retorna true o false según contenga alguno de estos tipos de pregunta
    return ['select', 'radio', 'checkbox'].includes(model.value.type)
}

function getOptions() {
    return model.value.data.options
}

function setOptions(options) {
    model.value.data.options = options
}

function addOption() {
    // Se concatena un Objeto más a la lista de opciones mediante el
    // operador spread (...)
    setOptions([...getOptions(), { uuid: uuidv4(), text: '' }])
    dataChange()
}

function removeOption(op) {
    setOptions(getOptions().filter(opt => opt !== op))
    dataChange()
}

function typeChange() {
    if (shouldHaveOptions()) {
        // De esta manera, se evita perder las opciones en la preguntas
        // de tipo checkbox, radio y select si se cambia a otro tipo de
        // pregunta
        setOptions(getOptions() || [])
    }
    dataChange()
}

// Emite el cambio de datos
function dataChange() {
    // Se elimina la referencia original para evitar pérdida de datos
    const data = JSON.parse(JSON.stringify(model.value))
    if (!shouldHaveOptions()) {
        delete data.data.options
    }

    emit('change', data)
}

function addQuestion() {
    emit('addQuestion', props.index + 1)
}

function deleteQuestion() {
    emit('deleteQuestion', props.question)
}
</script>

<style>
</style>