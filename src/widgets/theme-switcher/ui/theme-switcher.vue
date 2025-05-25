<script setup lang="ts" >
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.value =
            colorMode.value === 'dark' ? 'light' : 'dark'
    },
})
</script>

<template>
    <u-button
        :icon="isDark ? 'i-lucide:sun' : 'i-lucide:moon'"
        color="neutral"
        variant="ghost"
        class="text-muted"
        label="Переключить тему"
        @click="isDark = !isDark"
    />
</template>
