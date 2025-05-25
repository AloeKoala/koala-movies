<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/entities/movie'

const props = defineProps<Movie>()

const ratingColor = computed(() => {
  if (Number.isNaN(Number(props.rating))) return 'neutral'
  if (Number(props.rating) >= 8) return 'success'
  if (Number(props.rating) >= 6) return 'warning'
  return 'error'
})

const chatColor = computed(() => {
  if (Number.isNaN(Number(props.chat))) return 'neutral'
  if (Number(props.chat) >= 8) return 'success'
  if (Number(props.chat) >= 6) return 'warning'
  return 'error'
})
</script>

<template>
  <u-card
    :ui="{
      root: 'p-0',
      body: 'p-4 sm:p-4 flex items-center justify-between',
    }"
  >
    <h3 class="font-bold font-amatic text-2xl">{{ title }}</h3>

    <section class="flex gap-4 font-sans text-sm">
      <h4 class="sr-only">Информация</h4>
      <u-badge
        v-if="rating"
        icon="i-simple-icons:kinopoisk"
        variant="soft"
        :color="ratingColor"
        class="gap-2 sm:inline-flex hidden"
        :label="rating"
      />
      <u-badge
        v-if="chat"
        icon="i-fluent:people-community-16-filled"
        variant="soft"
        :color="chatColor"
        class="gap-2 sm:inline-flex hidden"
        :label="chat"
      />
      <u-badge
        v-if="nick"
        icon="i-material-symbols:person"
        variant="soft"
        color="neutral"
        :label="nick"
        class="inline-flex items-center gap-2"
      />
      <u-badge
        variant="soft"
        color="neutral"
        :label="year"
        class="inline-flex items-center gap-2"
      />
    </section>
  </u-card>
</template>
