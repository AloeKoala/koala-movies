<script setup lang="ts">
import type { User } from '@/entities/user'

defineProps<{ list: User[]; title: string }>()
</script>

<template>
  <u-card>
    <div class="flex gap-3 py-2 w-full col-span-full mb-4 justify-center">
      <u-icon name="i-lucide-users" class="text-green-500 size-7 mb-2" />
      <span
        class="font-amatic text-3xl font-bold text-center max-w-min overflow-hidden text-ellipsis truncate whitespace-nowrap w-full"
      >
        {{ title }}
      </span>
    </div>
    <ul class="grid grid-cols-subgrid col-span-full gap-4">
      <li
        v-for="user in list"
        :key="user.nick"
        class="flex items-center justify-between p-2 rounded-xl ring-1 ring-default"
      >
        <span class="truncate w-full max-w-min whitespace-nowrap overflow-hidden text-ellipsis">
          {{ user.nick }}
        </span>
        <u-badge color="primary" variant="outline" class="ml-2">{{ user.count }}</u-badge>
      </li>
    </ul>
  </u-card>
</template>
