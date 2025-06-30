<script lang="ts" setup>
    import { computed } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        size: {
            default: "default",
            type: String as PropType<"small" | "default" | "large">
        },
        type: {
            default: "spinner",
            type: String as PropType<"spinner" | "dots" | "pulse">
        }
    });

    const sizeValue = computed(() =>
    {
        switch (props.size)
        {
            case "small":
                return "2rem";
            case "large":
                return "5rem";
            default:
                return "3rem";
        }
    });
</script>

<template>
    <div class="clay-loading" :style="{ '--clay-loading-current-size': sizeValue }">
        <div v-if="type === 'spinner'" class="clay-loading__spinner">
            <div class="clay-loading__spinner-inner"></div>
        </div>
        <div v-else-if="type === 'dots'" class="clay-loading__dots">
            <div class="clay-loading__dot"></div>
            <div class="clay-loading__dot"></div>
            <div class="clay-loading__dot"></div>
        </div>
        <div v-else-if="type === 'pulse'" class="clay-loading__pulse">
            <div class="clay-loading__pulse-ring"></div>
            <div class="clay-loading__pulse-ring"></div>
            <div class="clay-loading__pulse-ring"></div>
        </div>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/mixins";

:root {
    --clay-loading-color-primary: var(--clay-primary-color);
    --clay-loading-color-background: var(--clay-light-color);
    --clay-loading-color-shadow: oklch(from var(--clay-primary-color) calc(l - 0.25) c h);

    --clay-loading-size: 3rem;

    --clay-loading-roundness: 50%;
    --clay-loading-duration: 1.2s;
    --clay-loading-thickness: 4px;
}

.clay-loading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--clay-loading-current-size, var(--clay-loading-size));
    height: var(--clay-loading-current-size, var(--clay-loading-size));

    &__spinner {
        width: 100%;
        height: 100%;
        position: relative;

        &-inner {
            width: 100%;
            height: 100%;
            border-radius: var(--clay-loading-roundness);

            @include mixins.clay-shadow-inset($color: var(--clay-loading-color-shadow), $intensity: 0.3);

            position: relative;
            border: 4px solid transparent;

            &::before {
                content: "";
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border-radius: var(--clay-loading-roundness);
                background: conic-gradient(from 0deg, transparent 0deg, transparent 270deg,
                var(--clay-loading-color-primary) 270deg,var(--clay-loading-color-primary) 360deg);
                mask: radial-gradient(circle, transparent calc(50% - 4px), black calc(50% - 4px),
                black 50%, transparent 50%);
                animation: clay-loading-spinner var(--clay-loading-duration) linear infinite;

                @include mixins.clay-shadow-elevation($color: var(--clay-loading-color-primary), $intensity: 0.8);
            }

            &::after {
                content: "";
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                border-radius: var(--clay-loading-roundness);
                background: conic-gradient(from 0deg, rgba(from var(--clay-loading-color-primary) r g b / 0.3) 0deg,
                rgba(from var(--clay-loading-color-primary) r g b / 0.1) 90deg, transparent 180deg, transparent 270deg,
                rgba(from var(--clay-loading-color-primary) r g b / 0.2) 360deg);
                mask: radial-gradient(circle, transparent calc(50% - 2px), black calc(50% - 2px),
                black 50%, transparent 50%);
                animation: clay-loading-spinner var(--clay-loading-duration) linear infinite;
            }
        }
    }

    &__dots {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &__dot {
        width: 20%;
        height: 20%;
        border-radius: var(--clay-loading-roundness);
        background-color: rgba(from var(--clay-loading-color-background) r g b / 0.95);
        background-image: linear-gradient(rgba(from var(--white) r g b / 0.2), rgba(from var(--black) r g b / 0.1));
        background-blend-mode: overlay;

        @include mixins.clay-shadow-elevation($color: var(--clay-loading-color-shadow), $intensity: 0.4);

        position: relative;
        animation: clay-loading-dots calc(var(--clay-loading-duration) * 0.8) ease-in-out infinite;

        &::before {
            content: "";
            position: absolute;
            border-radius: var(--clay-loading-roundness);
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            @include mixins.clay-shadow-inset($color: var(--clay-loading-color-primary), $intensity: 0.2);
        }

        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: calc(var(--clay-loading-duration) * 0.15);
        }
        &:nth-child(3) {
            animation-delay: calc(var(--clay-loading-duration) * 0.3);
        }
    }

    &__pulse {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__pulse-ring {
        position: absolute;
        border-radius: var(--clay-loading-roundness);
        border: 3px solid rgba(from var(--clay-loading-color-primary) r g b / 0.6);
        background-color: rgba(from var(--clay-loading-color-background) r g b / 0.05);
        animation: clay-loading-pulse calc(var(--clay-loading-duration) * 1.5)
        cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;

        &:nth-child(1) {
            animation-delay: 0s;
            border-color: rgba(from var(--clay-loading-color-primary) r g b / 0.8);
        }
        &:nth-child(2) {
            animation-delay: calc(var(--clay-loading-duration) * 0.5);
            border-color: rgba(from var(--clay-loading-color-primary) r g b / 0.6);
        }
        &:nth-child(3) {
            animation-delay: calc(var(--clay-loading-duration) * 1);
            border-color: rgba(from var(--clay-loading-color-primary) r g b / 0.4);
        }
    }
}

@keyframes clay-loading-spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes clay-loading-dots {
    0%,
    80%,
    100% {
        transform: scale(1);
        opacity: 0.7;
    }
    40% {
        transform: scale(1.3);
        opacity: 1;
    }
}

@keyframes clay-loading-pulse {
    0% {
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        width: 100%;
        height: 100%;
        opacity: 0;
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --clay-loading-color-background: var(--clay-dark-color);
        --clay-loading-color-shadow: var(--black);
    }
}
</style>
