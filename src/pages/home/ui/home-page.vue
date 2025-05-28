<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { type Movie, movies as data } from '@/entities/movie'
import { MoviesFilter } from '@/features/movie'
import { MovieList } from '@/widgets/movie-list'

const movies = ref<Movie[]>(data)
const filterValue = ref<string>('')
const filteredMovies = ref<Movie[]>(movies.value)

const filterRef = ref<HTMLElement | null>(null)
const listRef = ref<{ root: HTMLElement | null } | null>(null)
const isIntersecting = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (filterRef.value && listRef.value?.root) {
    observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.value = entry.isIntersecting
        console.log(isIntersecting.value)
      },
      {
        root: null,
        threshold: 0,
      },
    )
    observer.observe(listRef.value.root!)
  }
})

onBeforeUnmount(() => {
  if (observer && listRef.value?.root) {
    observer.unobserve(listRef.value.root!)
  }
})
</script>

<template>
  <u-container class="p-4 flex-grow">
    <div class="flex items-center gap-2 mb-6 sticky top-2 z-1" ref="filterRef">
      <movies-filter
        v-model="filterValue"
        :movies="movies"
        v-model:filteredMovies="filteredMovies"
        :is-intersecting="isIntersecting"
      />
    </div>

    <movie-list
      ref="listRef"
      :movies="filteredMovies"
      :total="movies.length"
      :filter-value="filterValue"
    />
  </u-container>
</template>
