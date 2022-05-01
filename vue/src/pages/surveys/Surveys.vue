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
                            v-if="surveys.loading"
                            class="flex items-center justify-center space-x-2">
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
                                role="status"></div>
                        </div>
                        <div v-else>
                            <div
                                class="
                                    grid grid-cols-1
                                    gap-3
                                    sm:grid-cols-2
                                    md:grid-cols-3
                                ">
                                <SurveyListItem
                                    v-for="(survey, i) in surveys.data"
                                    :key="survey.id"
                                    :survey="survey"
                                    class="opacity-0 animate-fade-in-down"
                                    :style="{ animationDelay: `${i * 0.1}s` }"
                                    @delete="deleteSurvey(survey)" />
                            </div>
                            <div class="flex justify-center mt-5">
                                <nav
                                    class="
                                        relative
                                        z-0
                                        inline-flex
                                        justify-center
                                        rounded-md
                                        shadow-sm
                                        -space-x-px
                                    "
                                    aria-label="Pagination">
                                    <a
                                        v-for="(link, i) of surveys.links"
                                        :key="i"
                                        :disabled="!link.url"
                                        href="#"
                                        @click="getForPage($event, link)"
                                        aria-current="page"
                                        class="
                                            relative
                                            inline-flex
                                            items-center
                                            px-4
                                            py-2
                                            border
                                            text-sm
                                            font-medium
                                            whitespace-nowrap
                                        "
                                        :class="[
                                            link.active
                                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                            i === 0 ? 'rounded-l-md' : '',
                                            i === surveys.links.length - 1
                                                ? 'rounded-r-md'
                                                : '',
                                        ]"
                                        v-html="link.label">
                                    </a>
                                </nav>
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
import SurveyListItem from '@/components/surveys/SurveyListItem.vue'
import { PlusIcon } from '@heroicons/vue/solid'
import { useSurveys } from '@/stores/surveys'
import { computed } from 'vue'

const store = useSurveys()
store.getSurveys()

const surveys = computed(() => store.surveys)

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

function getForPage(e, link) {
    e.preventDefault()
    if (!link.url || link.active) {
        return
    }
    store.getSurveys({ url: link.url })
}
</script>