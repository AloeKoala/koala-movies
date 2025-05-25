<script setup lang="ts">
import { ref } from 'vue'
import { type Movie, movies as data } from '@/entities/movie'
import { MoviesFilter } from '@/features/movie'
import { MovieList } from '@/widgets/movie-list'

const movies = ref<Movie[]>(data)
const filterValue = ref<string>('')
const filteredMovies = ref<Movie[]>(movies.value)
</script>

<template>
  <u-container class="p-8 flex-grow">
    <div class="flex items-center gap-2 mb-6 sticky top-2 z-1">
      <movies-filter
        v-model="filterValue"
        :movies="movies"
        v-model:filteredMovies="filteredMovies"
      />
    </div>

    <movie-list :movies="filteredMovies" :total="movies.length" :filter-value="filterValue" />
  </u-container>
</template>
