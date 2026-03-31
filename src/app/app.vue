<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DefaultLayout } from '@/app/layouts'
import { MainHeader } from '@/widgets/main-header'

const route = useRoute()
</script>

<template>
  <u-app>
    <component :is="route.meta.layout || DefaultLayout">
      <template #header>
        <main-header />
      </template>

      <template #default>
        <router-view />
      </template>

      <template #footer>
        <footer
          class="mt-auto flex w-full flex-col items-center justify-center gap-2 py-6 text-xs text-gray-500 sm:flex-row sm:justify-center sm:gap-4"
        >
          <span>© Подземелья и коалы 2025. Все права защищены</span>
        </footer>
      </template>
    </component>
  </u-app>
</template>
