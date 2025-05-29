<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { useStatistics } from '@/widgets/statistics/model/statistics.composable'

const { totalMovies, top3MoviesByChatRating, top3Nicknames } = useStatistics()

const root = ref<HTMLElement | null>(null)
defineExpose({ root })
</script>

<template>
  <div ref="root" class="flex flex-col items-center justify-center w-full">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <!-- Топ-3 спонсоров -->
      <UCard class="flex flex-col items-center shadow-sm" :ui="{ body: 'self-stretch' }">
        <div class="flex flex-col items-center gap-3 py-4 w-full">
          <UIcon name="i-lucide-users" class="text-green-500 size-7 mb-2" />
          <span
            class="font-amatic text-3xl font-bold text-center max-w-min overflow-hidden text-ellipsis truncate whitespace-nowrap w-full"
            >Топ-3 спонсоров</span
          >
          <ul class="space-y-5 w-full mt-2">
            <li
              v-for="user in top3Nicknames"
              :key="user.nick"
              class="flex items-center justify-between w-full px-2"
            >
              <span
                class="truncate w-full max-w-min whitespace-nowrap overflow-hidden text-ellipsis"
                >{{ user.nick }}</span
              >
              <UBadge color="primary" variant="outline" class="ml-2">{{ user.count }}</UBadge>
            </li>
          </ul>
        </div>
      </UCard>

      <!-- Топ-3 фильма -->
      <UCard class="flex flex-col items-center shadow-sm" :ui="{ body: 'self-stretch' }">
        <div class="flex flex-col items-center gap-3 py-4 w-full">
          <UIcon name="i-lucide-star" class="text-yellow-400 size-7 mb-2" />
          <span
            class="font-amatic text-3xl font-bold text-center max-w-min overflow-hidden text-ellipsis truncate whitespace-nowrap w-full"
            >Топ-3 фильма по версии чата</span
          >
          <ul class="space-y-5 w-full mt-2">
            <li
              v-for="movie in top3MoviesByChatRating"
              :key="movie.title"
              class="flex items-center justify-between w-full px-2"
            >
              <span
                class="truncate w-full max-w-min whitespace-nowrap overflow-hidden text-ellipsis"
                >{{ movie.title }}</span
              >
              <UBadge color="primary" variant="outline" class="ml-2">{{ movie.chat }}</UBadge>
            </li>
          </ul>
        </div>
      </UCard>
      <!-- Всего фильмов -->
      <UCard class="flex flex-col items-center shadow-sm" :ui="{ body: 'self-stretch h-full' }">
        <div class="flex flex-col items-center gap-3 py-4 h-full">
          <UIcon name="i-lucide-film" class="text-secondary size-7 mb-2" />
          <span
            class="font-amatic text-3xl font-bold text-center max-w-min overflow-hidden text-ellipsis truncate whitespace-nowrap w-full mb-4"
            >Всего фильмов</span
          >
          <UBadge color="primary" variant="solid" class="text-2xl px-6 py-2 m-auto">{{
            totalMovies
          }}</UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>
