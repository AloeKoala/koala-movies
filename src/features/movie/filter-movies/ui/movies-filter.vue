<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import type { Movie } from '@/entities/movie';

const props = defineProps<{
    modelValue: string;
    movies: Movie[];
    isIntersecting?: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'update:filteredMovies']);

const sortOptions = [
    {
        label: 'Название',
        value: 'title',
        icon: 'ph:text-aa',
    },
    { label: 'Рейтинг', value: 'rating', icon: 'i-simple-icons:kinopoisk' },
    {
        label: 'Чат',
        value: 'chat',
        icon: 'ph:users-three',
    },
    { label: 'Дата', value: 'date', icon: 'ph:calendar-dots' },
];
const sortBy = ref('title');
const sortDir = ref<'asc' | 'desc'>('asc');

function updateValue(value: string) {
    emit('update:modelValue', value);
}

function toggleSort(optionValue: string) {
    if (sortBy.value === optionValue) {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = optionValue;
        sortDir.value = 'asc';
    }
}

const filteredMovies = computed(() => {
    let result = props.movies;
    if (props.modelValue) {
        result = result.filter((movie) =>
            movie.title.toLowerCase().includes(props.modelValue.toLowerCase()),
        );
    }
    const sorted = [...result];
    if (sortBy.value === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy.value === 'rating') {
        sorted.sort(
            (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0),
        );
    } else if (sortBy.value === 'chat') {
        sorted.sort((a, b) => (Number(b.chat) || 0) - (Number(a.chat) || 0));
    } else if (sortBy.value === 'date') {
        sorted.sort((a, b) => {
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
    }
    if (sortDir.value === 'desc') {
        sorted.reverse();
    }
    return sorted;
});

watch(
    filteredMovies,
    (value) => {
        emit('update:filteredMovies', value);
    },
    { immediate: true },
);
</script>

<template>
    <div
        ref="filterBar"
        class="filter flex flex-row items-center sm:items-start gap-2 sticky top-2 z-1 w-full"
        :class="{ 'filter--sticky': isIntersecting }"
    >
        <img
            src="@/app/assets/images/logo_right.png"
            alt="logo"
            class="filter__logo block h-auto z-1"
            :class="{ 'filter__logo--is-intersecting': isIntersecting }"
        />
        <u-input
            :model-value="props.modelValue"
            @update:model-value="updateValue"
            icon="ph:magnifying-glass"
            size="lg"
            color="primary"
            variant="outline"
            placeholder="Поиск по названию фильма..."
            class="filter__input rounded-xl shadow-sm min-w-0"
            :class="{ 'filter__input--with-logo': isIntersecting }"
        >
            <template v-if="props.modelValue" #trailing>
                <u-button
                    color="neutral"
                    variant="link"
                    size="sm"
                    icon="i-lucide-x"
                    aria-label="Очистить"
                    @click="updateValue('')"
                />
            </template>
        </u-input>

        <u-button-group size="lg" class="hidden sm:flex align-middle">
            <u-button
                v-for="option in sortOptions"
                :key="option.value"
                :icon="option.icon"
                :label="option.label"
                :color="sortBy === option.value ? 'primary' : 'neutral'"
                :variant="sortBy === option.value ? 'subtle' : 'outline'"
                :ui="{
                    label: 'font-sans text-xs sm:text-sm',
                }"
                @click="toggleSort(option.value)"
            >
                <template #trailing>
                    <u-icon
                        v-if="sortBy === option.value"
                        :name="
                            sortDir === 'asc'
                                ? 'ph:sort-ascending'
                                : 'ph:sort-descending'
                        "
                        class="ml-1"
                    />
                </template>
            </u-button>
        </u-button-group>
    </div>
</template>

<style>
.filter {
    position: relative;
}

.filter--sticky::before {
    opacity: 1;
}

.filter__logo {
    width: 0;
    margin-right: -0.5rem;
    opacity: 0;
    transform: scale(0.8);
    transform-origin: left center;
    transition:
        width 0.3s ease,
        margin-right 0.3s ease,
        opacity 0.3s ease,
        transform 0.3s ease;
}

.filter__logo--is-intersecting {
    width: 1.75rem;
    margin-right: 0;
    opacity: 1;
    transform: scale(1);
}

.filter__input {
    position: relative;
    flex: 1 1 auto;
    max-width: 100%;
    transition: max-width 0.3s ease, flex-basis 0.3s ease;
}

.filter__input--with-logo {
    flex-basis: calc(100% - 2.25rem);
    max-width: calc(100% - 2.25rem);
}

.filter::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: 50%;
    right: 0;
    display: block;
    width: 100vw;
    height: 60px;
    background-color: var(--ui-bg);
    border-bottom: 1px solid var(--ui-bg-elevated);
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translateX(-50%);
    pointer-events: none;
}

.filter--sticky::before {
    opacity: 1;
}
</style>
