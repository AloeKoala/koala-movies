<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import DashboardTile from './dashboard-tile.vue'
import background from '@/app/assets/images/background.webp'
import character from '@/app/assets/images/character.webp'

defineProps<{ count: number }>()

const confettiCanvas = ref<HTMLCanvasElement | null>(null)

const isLoadingBg = ref(true)
const isLoadingFg = ref(true)

let bg: HTMLImageElement | undefined
let fg: HTMLImageElement | undefined
bg = new Image()
bg.onload = () => (isLoadingBg.value = false)
bg.src = background
fg = new Image()
fg.onload = () => (isLoadingFg.value = false)
fg.src = character
</script>

<template>
    <dashboard-tile
        :ui="{
            root: 'flex flex-col',
            body: 'grow-1 relative grid grid-rows-[min-content_1fr]',
        }"
    >
        <u-skeleton
            v-if="isLoadingBg || isLoadingFg"
            class="min-h-80 min-w-80 col-span-full row-span-full"
        />
        <template v-else>
            <div
                class="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
                :style="{
                    backgroundImage: `url(${background})`,
                }"
            />
            <div
                class="w-full flex items-center gap-4 justify-center z-10 mt-2"
            >
                <u-icon
                    name="ph:film-reel-duotone"
                    class="bg-blue-700 text-white rounded-full size-12 p-2"
                />
                <h3 class="text-3xl font-bold text-white text-shadow-sm">
                    Всего фильмов
                </h3>
            </div>
            <p
                class="absolute top-[30%] left-[15%] font-amatic text-7xl font-bold text-black"
            >
                {{ count }}
            </p>
            <img
                src="@/app/assets/images/character.webp"
                width="100%"
                class="ml-auto mt-auto z-10 -mr-14"
            />
        </template>
    </dashboard-tile>
</template>
