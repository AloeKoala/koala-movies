<script setup lang="ts">
defineProps<{ count: number; title: string }>()
</script>

<template>
  <u-card>
    <div class="flex gap-3 py-2 items-center">
      <u-icon name="i-ph:film-reel" class="text-secondary size-9" />
      <span
        class="font-amatic text-3xl font-bold text-center max-w-min overflow-hidden text-ellipsis truncate whitespace-nowrap w-full"
      >
        {{ title }}
      </span>
    </div>
    <u-badge
      color="primary"
      variant="subtle"
      class="px-4 py-0 rounded-lg font-amatic text-3xl"
    >
      {{ count }}
    </u-badge>
  </u-card>
</template>
