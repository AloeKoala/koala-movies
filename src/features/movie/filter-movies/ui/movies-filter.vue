<script setup lang="ts">
import { defineProps, defineEmits, computed, watch } from 'vue'
import type { Movie } from '@/entities/movie'

const props = defineProps<{
  modelValue: string
  movies: Movie[]
}>()
const emit = defineEmits(['update:modelValue', 'update:filteredMovies'])

function updateValue(value: string) {
  emit('update:modelValue', value)
}

const filteredMovies = computed(() => {
  if (!props.modelValue) return props.movies
  return props.movies.filter((movie) =>
    movie.title.toLowerCase().includes(props.modelValue.toLowerCase()),
  )
})

watch(
  filteredMovies,
  (value) => {
    emit('update:filteredMovies', value)
  },
  { immediate: true },
)
</script>

<template>
  <u-input
    :model-value="props.modelValue"
    @update:model-value="updateValue"
    icon="i-lucide-search"
    size="lg"
    color="primary"
    variant="outline"
    placeholder="Поиск по названию фильма..."
    class="rounded-xl shadow-sm w-full"
  >
    <template v-if="props.modelValue" #trailing>
      <u-button
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-x"
        aria-label="Очистить"
        @click="updateValue('')"
      />
    </template>
  </u-input>
</template>
