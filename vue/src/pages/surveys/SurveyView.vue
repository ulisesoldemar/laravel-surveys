<template>
    <BreezeAuthenticatedLayout>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    <!-- Si existe la survey, muestra el título de la misma, si no, "Create a survey" -->
                    {{ route.params.id ? model.title : 'Create a Survey' }}
                </h2>
                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deleteSurvey()"
                    class="
                        px-3
                        py-2
                        text-white
                        bg-red-500
                        rounded-md
                        hover:bg-red-600
                    ">
                    <TrashIcon class="w-5 h-5 -mt-1 inline-block" />
                    Delete survey
                </button>
            </div>
        </template>
        <div v-if="surveyLoading" class="flex justify-center">Loading...</div>
        <form v-else @submit.prevent="saveSurvey">
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
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.title"
                                class="w-64 h-48 object-cover" />
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
                                ">
                                <PhotographIcon
                                    class="h-[80%] w-[80%] text-gray-300" />
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
                                ">
                                <input
                                    type="file"
                                    @change="onImageChoose"
                                    class="
                                        absolute
                                        left-0
                                        top-0
                                        right-0
                                        bottom-0
                                        opacity-0
                                        cursor-pointer
                                    " />
                                Change
                            </button>
                        </div>
                    </div>
                    <!-- / Imagen -->

                    <!-- Título -->
                    <div>
                        <label
                            for="title"
                            class="block text-sm font-medium text-gray-700">
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
                            " />
                    </div>
                    <!-- / Título -->

                    <!-- Descripción -->
                    <div>
                        <label
                            for="about"
                            class="block text-sm font-medium text-gray-700">
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
                                    focus:ring-indigo-500
                                    focus:border-indigo-500
                                    mt-1
                                    block
                                    w-full
                                    sm:text-sm
                                    border border-gray-300
                                    rounded-md
                                "
                                placeholder="Describe your survey"></textarea>
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
                            " />
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
                                " />
                        </div>
                        <div class="ml-3 text-sm">
                            <label
                                for="status"
                                class="font-medium text-gray-700"
                                >Active</label
                            >
                        </div>
                    </div>
                    <!-- /Estado -->
                </div>
                <!-- / Campos del formulario -->

                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <h3
                        class="
                            text-2xl
                            font-semibold
                            flex
                            items-center
                            justify-between
                        ">
                        Questions
                        <!-- Agregar pregunta -->
                        <button
                            type="button"
                            @click="addQuestion()"
                            class="
                                flex
                                justify-between
                                items-center
                                text-sm
                                px-4
                                py-1
                                rounded-sm
                                text-white
                                bg-gray-600
                                hover:bg-gray-700
                            ">
                            <PlusIcon class="h-4 w-4 -mt-1 inline-block" />
                            Add question
                        </button>
                        <!-- / Agregar pregunta -->
                    </h3>
                    <div
                        v-if="!model.questions.length"
                        class="text-center text-gray-600">
                        You don't have any questions created
                    </div>
                    <div
                        v-for="(question, index) in model.questions"
                        :key="question.id">
                        <QuestionEditor
                            :question="question"
                            :index="index"
                            @change="questionChange"
                            @addQuestion="addQuestion"
                            @deleteQuestion="deleteQuestion" />
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
                        ">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </BreezeAuthenticatedLayout>
</template>

<script setup>
import BreezeAuthenticatedLayout from '@/layouts/Authenticated.vue'
import QuestionEditor from '@/components/editor/QuestionEditor.vue'
import { PhotographIcon, PlusIcon, TrashIcon } from '@heroicons/vue/solid'

import { v4 as uuidv4 } from 'uuid'
import { ref } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useSurveys } from '@/stores/surveys'

const route = useRoute()
const router = useRouter()
const store = useSurveys()
const surveyLoading = computed(() => store.currentSurvey.loading)

let model = ref({
    title: '',
    status: false,
    description: null,
    image: null,
    image_url: null,
    expire_date: null,
    questions: [],
})

// Observar si los datos de la survey actual cambian y cuando esto pase
// se actualiza el model local
watch(
    () => store.currentSurvey.data,
    // El parámtero newVal es store.currentSurvey, por lo que es necesario acceder
    // a data para copiarlo a model
    (newVal, oldVal) => {
        model.value = {
            // Se evitan cambios de referencia con los JSON
            ...JSON.parse(JSON.stringify(newVal.data)),
            status: newVal.status !== 'draft',
        }
    },
)

if (route.params.id) {
    store.getSurvey(route.params.id)
}

function onImageChoose(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
        // El campo que se envía al backend para aplicar validaciones
        model.value.image = reader.result
        // El campo que se muestra en la vista
        model.value.image_url = reader.result
        e.target.value = ''
    }
    reader.readAsDataURL(file)
}

function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: 'text',
        question: '',
        description: null,
        data: {},
    }

    // Inserta la nueva pregunta en el índice apropiado
    model.value.questions.splice(index, 0, newQuestion)
}

function deleteQuestion(question) {
    model.value.questions = model.value.questions.filter(
        q => q.id !== question.id,
    )
}

function questionChange(question) {
    model.value.questions = model.value.questions.map(q => {
        if (q.id === question.id) {
            // Se desreferencía el objeto original para evitar cambios no deseados
            return JSON.parse(JSON.stringify(question))
        }
        return q
    })
}
/**
 * Crea o actualiza un survey
 */
function saveSurvey() {
    store.saveSurvey(model.value).then(({ data }) => {
        router.push({
            name: 'SurveyView',
            params: { id: data.data.id },
        })
    })
}

function deleteSurvey() {
    if (
        confirm(
            `Are you sure you want to delete this survey? Operation can't be undone.`,
        )
    ) {
        store.deleteSurvey(model.value.id).then(() => {
            router.push({
                name: 'surveys'
            })
        })
    }
}
</script>