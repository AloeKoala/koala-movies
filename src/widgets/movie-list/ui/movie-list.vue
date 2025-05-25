<script setup lang="ts">
import { computed, watch } from 'vue'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'
import { type Movie, MovieCard } from '@/entities/movie'
import empty from '@/shared/assets/empty.png'

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
  <div class="mb-4 flex justify-between items-center">
    <h2 class="sr-only">Фильмы</h2>
    <u-badge
      :label="`Всего фильмов: ${total}`"
      variant="soft"
      color="neutral"
      :ui="{ base: 'ml-auto', label: 'font-sans' }"
    />
  </div>

  <div v-if="movies.length > 0" :style="{ height: totalSize + 'px', position: 'relative' }">
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
      <movie-card v-if="movies[item.index]" v-bind="movies[item.index]" />
    </div>
  </div>

  <div v-else class="text-center text-gray-500 flex flex-col items-center justify-center">
    <img :src="empty" alt="empty" class="w-[200px] mb-4 mx-auto" />
    <span class="text-3xl font-bold font-amatic">Ничего не найдено</span>
  </div>
</template>
