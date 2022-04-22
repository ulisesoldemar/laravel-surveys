<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="
            py-2
            px-3
            text-white
            bg-emerald-500
            rounded-md
            hover:bg-emerald-600
          "
        >
          <PlusIcon class="h-4 w-4 -mt-1 inline-block" />
          New survey
        </router-link>
      </div>
    </template>
    <div>
      <pre>{{ surveys }}</pre>
    </div>
  </PageComponent>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/solid";
import { computed } from "vue";
import store from "../store";
import PageComponent from "../components/PageComponent.vue";

const surveys = computed(() => store.state.surveys);
</script>
