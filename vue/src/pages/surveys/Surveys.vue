<template>
    <BreezeAuthenticatedLayout>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Surveys
                </h2>
                <router-link
                    :to="{ name: 'SurveyCreate' }"
                    class="
                        py-2
                        px-3
                        text-white
                        bg-emerald-500
                        rounded-md
                        hover:bg-emerald-600
                    ">
                    <PlusIcon class="h-4 w-4 -mt-1 inline-block" />
                    New survey
                </router-link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div
                            class="
                                grid grid-cols-1
                                gap-3
                                sm:grid-cols-2
                                md:grid-cols-3
                            ">
                            <SurveyListItem
                                v-for="survey in surveys"
                                :key="survey.id"
                                :survey="survey"
                                @delete="deleteSurvey(survey)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BreezeAuthenticatedLayout>
</template>

<script setup>
import BreezeAuthenticatedLayout from '@/layouts/Authenticated.vue'
import SurveyListItem from '@/components/surveys/SurveyListItem.vue'
import { PlusIcon } from '@heroicons/vue/solid'
import { useSurveys } from '@/stores/surveys'
import { computed } from 'vue'

const store = useSurveys()
store.getSurveys()

const surveys = computed(() => store.surveys.data)

function deleteSurvey(survey) {
    if (
        confirm(
            `Are you sure you want to delete this survey? This can't be undone.`,
        )
    ) {
        store.deleteSurvey(survey.id).then(() => {
            store.getSurveys()
        })
    }
}
</script>