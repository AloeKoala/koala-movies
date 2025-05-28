<script setup lang="ts">
import { computed } from 'vue'
import type { Movie } from '@/entities/movie'

const props = defineProps<Movie & { isMobile: boolean }>()

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
      body: 'grid p-0 items-center justify-between gap-2 overflow-x-auto sm:p-0 grid-cols-1 sm:grid-cols-2 sm:flex sm:py-4',
    }"
  >
    <div
      class="flex p-4 pb-2 justify-between gap-2 items-center w-full sm:max-w-full sm:justify-start sm:py-0"
    >
      <h3 class="kd-h3 font-sans text-lg truncate">{{ title }}</h3>
      <u-badge
        variant="soft"
        color="neutral"
        :label="year"
        class="inline-flex items-center gap-2"
      />
    </div>

    <section
      class="font-sans text-sm flex flex-row gap-2 px-4 pb-4 sm:pl-0 overflow-x-auto w-full whitespace-nowrap sm:overflow-x-visible sm:whitespace-normal sm:py-0 sm:justify-end"
    >
      <h4 class="sr-only">Информация</h4>
      <u-badge
        v-if="rating"
        icon="i-simple-icons:kinopoisk"
        variant="soft"
        :color="ratingColor"
        :label="rating"
        class="gap-2 inline-flex"
      />
      <u-badge
        v-if="chat"
        icon="i-fluent:people-community-16-filled"
        variant="soft"
        :color="chatColor"
        :label="chat"
        class="gap-2 inline-flex"
      />
      <template v-if="nick">
        <u-badge
          v-for="user of nick.split('+')"
          :key="user"
          icon="i-material-symbols:person"
          variant="soft"
          color="neutral"
          :label="user"
          class="inline-flex items-center gap-2"
        />
      </template>
      <u-badge
        v-if="date"
        icon="i-lucide-calendar"
        variant="soft"
        color="neutral"
        :label="
          new Date(date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: isMobile ? 'short' : 'long',
            year: 'numeric',
          })
        "
        class="inline-flex items-center gap-2"
      />
    </section>
  </u-card>
</template>
