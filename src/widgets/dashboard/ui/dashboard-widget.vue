<script setup lang="ts">
import { useStatistics } from '@/widgets/statistics'
import {
    USER_QTY,
    MOVIE_QTY,
} from '@/widgets/statistics/config/statistics-output.config'
import TileTopViewers from './tile-top-viewers.vue'
import TileTopMovies from './tile-top-movies.vue'
import TileTotalMovies from './tile-total-movies.vue'
import { ref } from 'vue'

const { topUsers, topMovies, totalMovies } = useStatistics({
    users: USER_QTY,
    movies: MOVIE_QTY,
})

const root = ref<HTMLElement | null>(null)

defineExpose({ root })
</script>

<template>
    <div
        ref="root"
        class="grid min-w-0 md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_3fr_2fr] gap-4 *:min-w-0 justify-stretch"
    >
        <tile-top-movies :list="topMovies" />
        <tile-top-viewers
            :list="topUsers"
            class="md:order-1 md:col-span-full lg:order-0 lg:col-span-1"
        />
        <tile-total-movies :count="totalMovies" />
    </div>
</template>
