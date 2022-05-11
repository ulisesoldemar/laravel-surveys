<template>
  <BreezeAuthenticatedLayout>
    <template v-slot:header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <div v-if="loading" class="flex justify-center">
              <div class="
                spinner-border
                animate-spin
                inline-block
                w-12
                h-12
                border-4
                rounded-full" role="status"></div>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
              <div class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down"
                style="animation-delay: 0.1s;">
                <h3 class="text-2xl font-semibold">Total surveys</h3>
                <div class="text-8xl font-semibold flex-1 flex items-center justify-center">{{ data.totalSurveys }}
                </div>
              </div>
              <div class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down"
                style="animation-delay: 0.2s;">
                <h3 class="text-2xl font-semibold">Total answers</h3>
                <div class="text-8xl font-semibold flex-1 flex items-center justify-center">{{ data.totalSurveys }}
                </div>
              </div>
              <div class="row-span-2 order-3 bg-white shadow-md p-4 lg:order-1 animate-fade-in-down">
                <h3 class="text-2xl font-semibold">Latest survey</h3>
                <img :src="data.latestSurvey.image_url" :alt="data.latestSurvey.title" class="w-[240px] mx-auto" />
                <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
                <div class="flex justify-between text-sm mb-1">
                  <div>Upload date:</div>
                  <div>{{ data.latestSurvey.created_at }}</div>
                </div>
                <div class="flex-justify-between text-sm mb-3">
                  <div>Answers:</div>
                  <div>{{ data.totalAnswers }}</div>
                </div>
                <div class="flex justify-between">
                  <router-link :to="{
                    name: 'SurveyView',
                    params: { id: data.latestSurvey.id },
                  }" class="
                        flex
                        py-2
                        px-4
                        border border-transparent
                        text-sm
                        rounded-md
                        text-indigo-500
                        hover:bg-indigo-700
                        hover:text-white
                        transition-colors
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    ">
                    <PencilIcon class="h-5 w-5 mr-2 inline-block" />
                    Edit
                  </router-link>
                  <button class="
                    flex
                    py-2
                    px-4
                    border border-transparent
                    text-sm
                    rounded-md
                    text-indigo-500
                    hover:bg-indigo-700
                    hover:text-white
                    transition-colors
                    focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <EyeIcon class="h-5 w-5 mr-2 inline-block" />
                    View answers
                  </button>
                </div>
              </div>
              <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3 animate-fade-in-down"
                style="animation-delay: 0.3s;">
                <div class="flex justify-between items-center mb-3 px-2">
                  <h3 class="text-2xl font-semibold">Latest answers</h3>
                  <a href="javascript:void(0)" class="text-sm text-blue-500 hover:decoration-blue-500">View all</a>
                </div>
                
                <a href="#" v-for="answer of data.latestAnswers" :key="answer.id" class="block p-2 hover:bg-gray-100/90">
                  <div class="font-semibold">{{ answer.survey.title }}</div>
                  <small>
                    Answer made at:
                    <i class="font-semibold">{{ answer.end_date }}</i>
                  </small>
                </a>
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
import { PencilIcon, EyeIcon } from '@heroicons/vue/solid';
import { computed } from '@vue/reactivity';
import { useDashboard } from '../stores/dashboard';

const store = useDashboard();

const loading = computed(() => store.loading);
const data = computed(() => store.data);

store.getDashboardData();

</script>
