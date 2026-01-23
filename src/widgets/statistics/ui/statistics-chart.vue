<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { useStatistics } from '../model/statistics.composable'
import TopUsers from './top-users.vue'
import TopMovies from './top-movies.vue'
import TotalMovies from './total-movies.vue'

const USER_QTY = 10
const MOVIE_QTY = 5

const { totalMovies, topMovies, topUsers } = useStatistics({ users: USER_QTY, movies: MOVIE_QTY })

const root = ref<HTMLElement | null>(null)

defineExpose({ root })
</script>

<template>
  <div ref="root" class="flex flex-col items-center justify-center w-full">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-10 w-full">
      <total-movies
        :count="totalMovies"
        title="Всего фильмов"
        :ui="{
          root: 'col-span-full ring-0',
          body: 'flex items-center gap-8 sm:p-0 p-0',
        }"
      />

      <top-users
        :list="topUsers"
        :title="`Топ-${USER_QTY} спонсоров`"
        :ui="{
          root: 'grid grid-cols-subgrid col-span-full ring-0',
          body: 'grid grid-cols-subgrid col-span-full sm:p-0 p-0',
        }"
      />

      <top-movies
        :list="topMovies"
        :title="`Топ-${MOVIE_QTY} фильмов по версии чата`"
        :ui="{
          root: 'grid grid-cols-subgrid col-span-full ring-0',
          body: 'grid grid-cols-subgrid col-span-full sm:p-0 p-0',
        }"
      />
    </div>
  </div>
</template>
