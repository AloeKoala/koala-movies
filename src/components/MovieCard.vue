<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  year: number | string
  rating?: number | string
  chat?: number | string
  nick?: string
}>()

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
  <UCard
    :ui="{
      root: 'p-0',
      body: 'p-0 sm:p-4',
    }"
  >
    <div class="flex items-center justify-between">
      <div class="mr-auto flex gap-2">
        <span class="font-bold font-amatic text-2xl">{{ title }}</span>
      </div>
      <dl class="flex gap-4 font-sans text-sm">
        <span v-if="rating" class="inline-flex items-center gap-2">
          <dt class="sr-only">Кинопоиск:</dt>
          <dd>
            <UBadge icon="i-simple-icons:kinopoisk" variant="soft" :color="ratingColor">{{
              rating
            }}</UBadge>
          </dd>
        </span>
        <span v-if="chat" class="inline-flex items-center gap-2">
          <dt class="sr-only">Оценка чата:</dt>
          <dd>
            <UBadge icon="i-fluent:people-community-16-filled" variant="soft" :color="chatColor">
              {{ chat }}</UBadge
            >
          </dd>
        </span>
        <span v-if="nick" class="inline-flex items-center gap-2">
          <dt class="sr-only">Заказал:</dt>
          <dd>
            <UBadge icon="i-material-symbols:person" variant="soft" color="neutral" :label="nick" />
          </dd>
        </span>
        <span class="inline-flex items-center gap-2">
          <dt class="sr-only">Год:</dt>
          <dd>
            <UBadge variant="soft" color="neutral" :label="year" />
          </dd>
        </span>
      </dl>
    </div>
  </UCard>
</template>
