<script setup lang="ts">
import type { Movie } from '@/entities/movie'

defineProps<{ list: Movie[]; title: string }>()
</script>

<template>
  <u-card>
    <div class="flex gap-3 py-2 w-full col-span-full mb-4">
      <u-icon name="i-lucide-star" class="text-yellow-400 size-7 mb-2" />
      <span
        class="font-amatic text-3xl font-bold text-center max-w-min overflow-hidden text-ellipsis truncate whitespace-nowrap w-full"
      >
        {{ title }}
      </span>
    </div>

    <ul class="grid grid-cols-subgrid col-span-full gap-4">
      <li
        v-for="movie in list"
        :key="movie.title"
        class="flex items-center justify-between p-2 rounded-xl ring-1 ring-default"
      >
        <span class="truncate w-full max-w-min whitespace-nowrap overflow-hidden text-ellipsis">
          {{ movie.title }}
        </span>
        <u-badge color="primary" variant="outline" class="ml-2">{{ movie.chat }}</u-badge>
      </li>
    </ul>
  </u-card>
</template>
