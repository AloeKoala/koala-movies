<script setup lang="ts">
import { defineProps, defineEmits, computed, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import type { Movie } from '@/entities/movie'

const props = defineProps<{
  modelValue: string
  movies: Movie[]
}>()
const emit = defineEmits(['update:modelValue', 'update:filteredMovies'])

const sortOptions = [
  { label: 'Название', value: 'title', icon: 'i-material-symbols:sort-by-alpha' },
  { label: 'Рейтинг', value: 'rating', icon: 'i-simple-icons:kinopoisk' },
  { label: 'Чат', value: 'chat', icon: 'i-fluent:people-community-16-filled' },
  { label: 'Дата', value: 'date', icon: 'i-lucide-calendar' },
]
const sortBy = ref('title')
const sortDir = ref<'asc' | 'desc'>('asc')

const filterBar = ref<HTMLElement | null>(null)
const isStuck = ref(false)

function updateValue(value: string) {
  emit('update:modelValue', value)
}

function toggleSort(optionValue: string) {
  if (sortBy.value === optionValue) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = optionValue
    sortDir.value = 'asc'
  }
}

const filteredMovies = computed(() => {
  let result = props.movies
  if (props.modelValue) {
    result = result.filter((movie) =>
      movie.title.toLowerCase().includes(props.modelValue.toLowerCase()),
    )
  }
  const sorted = [...result]
  if (sortBy.value === 'title') {
    sorted.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortBy.value === 'rating') {
    sorted.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
  } else if (sortBy.value === 'chat') {
    sorted.sort((a, b) => (Number(b.chat) || 0) - (Number(a.chat) || 0))
  } else if (sortBy.value === 'date') {
    sorted.sort((a, b) => {
      if (!a.date && !b.date) return 0
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }
  if (sortDir.value === 'desc') {
    sorted.reverse()
  }
  return sorted
})

watch(
  filteredMovies,
  (value) => {
    emit('update:filteredMovies', value)
  },
  { immediate: true },
)

function handleScroll() {
  if (!filterBar.value) return
  const { top } = filterBar.value.getBoundingClientRect()
  isStuck.value = top <= 8 // top-2
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    ref="filterBar"
    class="flex flex-col items-center sm:items-start sm:flex-row gap-2 sticky top-2 z-1 w-full filter"
    :class="{ 'filter--is-stuck': isStuck }"
  >
    <transition name="fade-logo" mode="out-in">
      <img
        v-if="isStuck"
        src="@/shared/assets/logo_right.png"
        alt="logo"
        class="filter__logo"
        :class="{ 'filter__logo--is-stuck': isStuck }"
      />
    </transition>
    <u-input
      :model-value="props.modelValue"
      @update:model-value="updateValue"
      icon="i-lucide-search"
      size="lg"
      color="primary"
      variant="outline"
      placeholder="Поиск по названию фильма..."
      class="filter__input rounded-xl shadow-sm w-full flex grow-1"
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

    <u-button-group size="lg" class="hidden sm:flex align-middle">
      <u-button
        v-for="option in sortOptions"
        :key="option.value"
        :icon="option.icon"
        :label="option.label"
        :color="sortBy === option.value ? 'primary' : 'neutral'"
        :variant="sortBy === option.value ? 'solid' : 'outline'"
        :ui="{
          label: 'font-sans text-xs sm:text-sm',
        }"
        @click="toggleSort(option.value)"
      >
        <template #trailing>
          <u-icon
            v-if="sortBy === option.value"
            :name="sortDir === 'asc' ? 'i-lucide-arrow-up' : 'i-lucide-arrow-down'"
            class="ml-1"
          />
        </template>
      </u-button>
    </u-button-group>
  </div>
</template>

<style scoped>
.filter__logo {
  display: none;
}

.filter::before {
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.filter--is-stuck::before {
  content: '';
  background-color: var(--ui-bg);
  border-bottom: 1px solid var(--ui-border);
  position: absolute;
  top: -0.5rem;
  left: -1000px;
  right: -1000px;
  bottom: -0.5rem;
  z-index: -1;
  opacity: 1;
}

.filter--is-stuck .filter__logo {
  display: block;
  width: auto;
  flex: 1;
  height: 2.2rem;
}

.fade-logo-enter-active, .fade-logo-leave-active {
  transition: opacity 0.3s;
}
.fade-logo-enter-from, .fade-logo-leave-to {
  opacity: 0;
}
.fade-logo-enter-to, .fade-logo-leave-from {
  opacity: 1;
}
</style>
