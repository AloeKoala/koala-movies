<script setup lang="ts">
import { ThemeSwitcher } from '@/widgets/theme-switcher'
import { links } from '@/widgets/main-header'
import { sendMetricEvent, YM_ACTION } from '@/shared/lib/metrics'
</script>

<template>
  <header class="grid justify-center items-center py-8">
    <h1
      class="header__logo pr-8 justify-self-center text-4xl font-bold uppercase relative pointer-events-none"
    >
      Кино и коалы
    </h1>

    <ul
      class="mt-auto flex w-full flex-col items-center justify-center gap-2 py-6 text-xs text-gray-500 sm:flex-row sm:justify-center sm:gap-4"
    >
      <li v-for="link in links" :key="link.name">
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 hover:underline"
          :class="link.color"
          @click="sendMetricEvent(YM_ACTION.CLICK_LINK, { socialLink: link.name })"
        >
          <u-icon :name="link.icon" class="text-base" />
          <span>
            {{ link.name }}
          </span>
        </a>
      </li>
    </ul>

    <theme-switcher class="mx-auto" />
  </header>
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
  background-image: url('@/shared/assets/logo_left.png');
  transform: scale(50%);
}

.header__logo::after {
  content: '';
  position: absolute;
  top: -1.75rem;
  right: -1rem;
  display: block;
  width: 89px;
  height: 100px;
  background-image: url('@/shared/assets/logo_right.png');
  transform: scale(50%);
}

.header__logo:hover {
  opacity: 0.9;
}
</style>
