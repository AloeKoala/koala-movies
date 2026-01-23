<script setup lang="ts">
defineProps<{ count: number; title: string }>()
</script>

<template>
  <u-card>
    <div class="flex gap-3 py-2 items-center">
      <u-icon name="i-lucide-film" class="text-secondary size-7" />
      <span
        class="font-amatic text-3xl font-bold text-center max-w-min overflow-hidden text-ellipsis truncate whitespace-nowrap w-full"
      >
        {{ title }}
      </span>
    </div>
    <u-badge
      color="primary"
      variant="solid"
      class="px-4 py-0 rounded-full font-amatic text-3xl font-bold"
    >
      {{ count }}
    </u-badge>
  </u-card>
</template>
