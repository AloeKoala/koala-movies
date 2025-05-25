<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { DefaultLayout } from '@/app/layouts'
import { MainHeader } from '@/widgets/main-header'

const route = useRoute()

const layout = computed(() => route.meta.layout || DefaultLayout)
</script>

<template>
  <u-app>
    <component :is="layout">
      <template #header>
        <main-header />
      </template>

      <template #default>
        <router-view />
      </template>

      <template #footer>
        <footer
          class="mt-auto flex w-full flex-col items-center justify-center gap-2 border-t border-gray-200 py-6 text-xs text-gray-500 sm:flex-row sm:justify-center sm:gap-4 dark:border-gray-800"
        >
          <span>© Подземелья и коалы 2025. Все права защищены</span>
        </footer>
      </template>
    </component>
  </u-app>
</template>
