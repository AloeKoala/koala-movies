<script setup lang="ts">
import type { User } from '@/entities/user'
import DashboardTile from './dashboard-tile.vue'

defineProps<{ list: User[] }>()
</script>

<template>
    <dashboard-tile :ui="{ header: 'flex items-center gap-4 justify-center mt-2' }">
        <template #header>
            <u-icon
                name="ph:crown-simple-duotone"
                class="bg-yellow-200 dark:bg-yellow-700 rounded-full size-12 p-2"
            />
            <h3 class="text-3xl">Топ 10 спонсоров</h3>
        </template>
        <ul class="col-span-full grid min-w-0 w-full grid-cols-2 gap-4 p-2">
            <li
                v-for="user in list"
                :key="user.nick"
                class="flex min-w-0 max-w-full items-center justify-between gap-2 overflow-hidden rounded-full p-1 pl-4 ring-1 ring-default"
            >
                <span class="min-w-0 flex-1 truncate">
                    {{ user.nick }}
                </span>
                <u-badge
                    color="primary"
                    variant="subtle"
                    class="shrink-0 rounded-full"
                >
                    {{ user.count }}
                </u-badge>
            </li>
        </ul>
    </dashboard-tile>
</template>
