<script setup lang="ts">
import { computed, watch } from 'vue'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import type { Movie } from '@/assets/movies'

const props = defineProps<{
  movies: Movie[]
  total: number
  filterValue: string
}>()

const rowHeight = 80 // px, примерная высота карточки
const virtualizer = useWindowVirtualizer({
  count: props.movies.length,
  estimateSize: (index) => (isItemVisible(index) ? rowHeight : 0),
  overscan: 5,
})

const virtualItems = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())

function isItemVisible(index: number) {
  const item = props.movies[index]
  if (!item) return false
  return item.title.toLowerCase().includes(props.filterValue.toLowerCase())
}

watch(
  () => props.movies.length,
  () => {
    virtualizer.value.measure()
    virtualizer.value.scrollToIndex(0)
  },
)
</script>

<template>
  <h2 class="text-2xl font-bold mb-4 flex justify-between">
    Фильмы
    <UBadge
      :label="`Всего фильмов: ${total}`"
      variant="soft"
      color="neutral"
      :ui="{ label: 'font-sans' }"
    />
  </h2>
  <div :style="{ height: totalSize + 'px', position: 'relative' }">
    <div
      v-for="item in virtualItems"
      :key="item.index"
      :style="{
        position: 'absolute',
        top: item.start + 'px',
        left: 0,
        width: '100%',
      }"
    >
      <MovieCard v-if="movies[item.index]" v-bind="movies[item.index]" />
    </div>
  </div>
</template>
