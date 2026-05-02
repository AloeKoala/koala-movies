<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { useStatistics } from '../model/statistics.composable'
import { USER_QTY, MOVIE_QTY } from '../config/statistics-output.config'
import TopUsers from './top-users.vue'
import TopMovies from './top-movies.vue'
import TotalMovies from './total-movies.vue'

const { totalMovies, topMovies, topUsers } = useStatistics({ users: USER_QTY, movies: MOVIE_QTY })

const root = ref<HTMLElement | null>(null)

defineExpose({ root })
</script>

<template>
  <div ref="root" class="flex flex-col items-center justify-center w-full">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-10 w-full">
      <top-users
        :list="topUsers"
        :title="`Топ-${USER_QTY} спонсоров`"
        :ui="{
          root: 'grid grid-cols-subgrid col-span-full ring-0',
          body: 'grid grid-cols-subgrid col-span-full sm:p-0 p-0',
        }"
      />

      <!-- <top-movies
        :list="topMovies"
        :title="`Топ-${MOVIE_QTY} фильмов по версии чата`"
        :ui="{
          root: 'grid grid-cols-subgrid col-span-full ring-0',
          body: 'grid grid-cols-subgrid col-span-full sm:p-0 p-0',
        }"
      /> -->

      <total-movies
        :count="totalMovies"
        title="Всего фильмов"
        :ui="{
          root: 'col-span-full ring-0',
          body: 'flex items-center gap-8 sm:p-0 p-0 justify-center',
        }"
      />
    </div>
  </div>
</template>
