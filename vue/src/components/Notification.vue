<template>
    <div
        v-if="notification.show"
        class="
            fixed
            w-[300px]
            left-4
            bottom-4
            px-4
            py-2
            text-white
            animate-fade-in-down
        "
        :class="[
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500',
        ]">
        {{ notification.message }}
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSurveys } from '@/stores/surveys'

const store = useSurveys()

const notification = computed(() => store.notification)
</script>

<style></style>
