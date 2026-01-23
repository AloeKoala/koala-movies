<script setup lang="ts">
import { computed, watch, ref, defineExpose } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { type Movie, MovieCard } from '@/entities/movie'
import empty from '@/shared/assets/empty.png'

const props = defineProps<{
  movies: Movie[]
  filterValue: string
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('sm')

const rowHeight = computed(() => (isMobile.value ? 120 : 80))
const root = ref<HTMLElement | null>(null)

const virtualizer = useVirtualizer({
  count: props.movies.length,
  estimateSize: (index) => (isItemVisible(index) ? rowHeight.value : 0),
  overscan: 10,
  getScrollElement: () => root.value,
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

watch(isMobile, () => {
  virtualizer.value.measure()
})
</script>

<template>
  <div class="mb-4 flex justify-between items-center">
    <h2 class="sr-only">Фильмы</h2>
  </div>

  <div
    ref="root"
    v-if="movies.length > 0"
    :style="{ height: totalSize + 'px', position: 'relative' }"
  >
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
      <movie-card v-if="movies[item.index]" v-bind="movies[item.index]" :is-mobile="isMobile" />
    </div>
  </div>

  <div v-else class="text-center text-gray-500 flex flex-col items-center justify-center">
    <img :src="empty" alt="empty" class="w-[200px] mb-4 mx-auto" />
    <span class="text-3xl font-bold font-amatic">Ничего не найдено</span>
  </div>
</template>
