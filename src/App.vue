<script setup lang="ts">
import { ref, computed } from 'vue'
import { movies as data } from '@/assets/movies'
import MovieList from '@/components/MovieList.vue'
import MainHeader from '@/components/MainHeader.vue'

const movies = ref(data)
const filterValue = ref('')

const filteredMovies = computed(() => {
  if (!filterValue.value) return movies.value
  return movies.value.filter((movie) =>
    movie.title.toLowerCase().includes(filterValue.value.toLowerCase()),
  )
})
</script>

<template>
  <UApp>
    <div class="flex flex-col min-h-screen">
      <MainHeader />
      <UContainer class="p-8 flex-grow">
        <div class="flex items-center gap-2 mb-6 sticky top-2 z-1">
          <UInput
            v-model="filterValue"
            icon="i-lucide-search"
            size="lg"
            color="primary"
            variant="outline"
            placeholder="Поиск по названию фильма..."
            class="rounded-xl shadow-sm w-full"
          >
            <template v-if="filterValue" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-x"
                aria-label="Очистить"
                @click="filterValue = ''"
              />
            </template>
          </UInput>
        </div>
        <MovieList :movies="filteredMovies" :total="movies.length" :filter-value="filterValue" />
      </UContainer>
      <footer
        class="mt-auto flex w-full flex-col items-center justify-center gap-2 border-t border-gray-200 py-6 text-xs text-gray-500 sm:flex-row sm:justify-center sm:gap-4 dark:border-gray-800"
      >
        <span>© Подземелья и коалы 2025. Все права защищены</span>
      </footer>
    </div>
  </UApp>
</template>

<style>
.header__logo::before {
  content: '';
  position: absolute;
  top: -1.75rem;
  left: -2.25rem;
  display: block;
  width: 55px;
  height: 88px;
  background-image: url('@/assets/logo_left.png');
  transform: scale(50%);
}

.header__logo::after {
  content: '';
  position: absolute;
  top: -1.75rem;
  right: -3rem;
  display: block;
  width: 89px;
  height: 100px;
  background-image: url('@/assets/logo_right.png');
  transform: scale(50%);
}

.header__logo:hover {
  opacity: 0.9;
}
</style>
