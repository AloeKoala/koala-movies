<script setup lang="ts">
import type { Movie } from '@/entities/movie'
import DashboardTile from './dashboard-tile.vue'

defineProps<{ list: Movie[] }>()
</script>

<template>
    <dashboard-tile :ui="{ header: 'flex items-center gap-4 justify-center mt-2' }">
        <template #header>
            <u-icon
                name="ph:heart-duotone"
                class="bg-red-200 rounded-full size-12 p-2 dark:bg-red-700"
            />
            <h3 class="text-3xl">Топ 5 фильмов</h3>
        </template>
        <ul class="col-span-full grid min-w-0 w-full gap-4 p-2">
            <li
                v-for="movie in list"
                :key="movie.title"
                class="flex min-w-0 max-w-full items-center justify-between gap-2 overflow-hidden rounded-full p-1 pl-4 ring-1 ring-default"
            >
                <span class="min-w-0 flex-1 truncate">
                    {{ movie.title }}
                </span>
                <u-badge
                    color="primary"
                    variant="subtle"
                    class="shrink-0 rounded-full"
                >
                    {{ movie.chat }}
                </u-badge>
            </li>
        </ul>
    </dashboard-tile>
</template>
