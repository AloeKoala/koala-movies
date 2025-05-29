<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { type Movie, movies as data } from '@/entities/movie'
import { MoviesFilter } from '@/features/movie'
import { MovieList } from '@/widgets/movie-list'
import { StatisticsChart } from '@/widgets/statistics'

const movies = ref<Movie[]>(data)
const filterValue = ref<string>('')
const filteredMovies = ref<Movie[]>(movies.value)

const statisticsRef = ref<{ root: HTMLElement | null } | null>(null)
const filterRef = ref<HTMLElement | null>(null)
const isIntersecting = ref<boolean>(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isIntersecting.value = !entry.isIntersecting
    },
    {
      root: null,
      threshold: 0,
    },
  )
  observer.observe(statisticsRef.value?.root!)
})

onBeforeUnmount(() => {
  if (observer && statisticsRef.value?.root) {
    observer.unobserve(statisticsRef.value?.root!)
  }
})
</script>

<template>
  <u-container class="p-4 flex-grow">
    <statistics-chart ref="statisticsRef" class="mb-12" />

    <div class="flex items-center gap-2 mb-6 sticky top-2 z-1" ref="filterRef">
      <movies-filter
        v-model="filterValue"
        :movies="movies"
        v-model:filteredMovies="filteredMovies"
        :is-intersecting="isIntersecting"
      />
    </div>

    <movie-list :movies="filteredMovies" :filter-value="filterValue" />
  </u-container>
</template>
