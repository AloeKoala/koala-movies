<script setup lang="ts">
import { computed } from 'vue';
import { useColorMode } from '@vueuse/core';

const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === 'dark';
    },
    set() {
        colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
    },
});
</script>

<template>
    <u-button
        :icon="isDark ? 'i-ph:sun' : 'i-ph:moon-stars'"
        color="neutral"
        variant="ghost"
        class="text-default"
        label="Переключить тему"
        @click="isDark = !isDark"
    />
</template>
