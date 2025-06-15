<script lang="ts" setup>
    import { computed } from "vue";
    import type { PropType } from "vue";

    const props = defineProps({
        elevation: {
            default: "default",
            type: String as PropType<"none" | "low" | "default" | "high">
        },
        glass: {
            default: false,
            type: Boolean
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-card--glass": props.glass,

        "clay-card--elevation-none": props.elevation === "none",
        "clay-card--elevation-low": props.elevation === "low",
        "clay-card--elevation-high": props.elevation === "high"
    }));
</script>

<template>
    <div class="clay-card" :class="classes">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    @use "sass:color";

    @use "@/assets/scss/mixins";
    @use "@/assets/scss/variables";

    $card-color-background: variables.$light-color;
    $card-color-shadow: color.adjust(variables.$primary-color, $lightness: -25%);

    :root
    {
        --clay-card-color-background: #{$card-color-background};
        --clay-card-color-shadow: #{$card-color-shadow};

        --clay-card-opacity: 1.0;

        --clay-card-spacing-x: 1em;
        --clay-card-spacing-y: 0.5em;
        --clay-card-spacing: var(--clay-card-spacing-y) var(--clay-card-spacing-x);

        --clay-card-roundness: var(--clay-card-spacing-x);
    }

    .clay-card
    {
        background-color: rgba(from var(--clay-card-color-background) r g b / var(--clay-card-opacity));
        background-image: linear-gradient(rgba(from var(--white) r g b / 0.25), rgba(from var(--black) r g b / 0.125));
        background-blend-mode: overlay;
        border-radius: var(--clay-card-roundness);

        @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow));

        padding: var(--clay-card-spacing);
        perspective: 0px;
        position: relative;
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function);

        &::before
        {
            border-radius: var(--clay-card-roundness);
            bottom: 0px;

            @include mixins.clay-shadow-inset($color: var(--clay-primary-color));

            content: "";
            left: 0px;
            mix-blend-mode: multiply;
            position: absolute;
            right: 0px;
            top: 0px;
            transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            z-index: -1;
        }

        &.clay-card--elevation-none
        {
            @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow), $intensity: 0.125);
        }
        &.clay-card--elevation-low
        {
            @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow), $intensity: 0.5);
        }
        &.clay-card--elevation-high
        {
            @include mixins.clay-shadow-elevation($color: var(--clay-card-color-shadow), $intensity: 2);
        }

        &.clay-card--glass
        {
            $card-color-background: variables.$light-color;
            $card-color-shadow: color.adjust($card-color-background, $lightness: -50%);

            --clay-card-color-background: #{$card-color-background};
            --clay-card-color-shadow: #{$card-color-shadow};

            --clay-card-blur: 0.5em;
            --clay-card-opacity: 0.5;

            backdrop-filter: blur(var(--clay-card-blur)) saturate(180%);

            &::before
            {
                @include mixins.clay-shadow-inset($intensity: 0.5, $color: var(--clay-card-color-shadow));
            }
        }
    }

    @media (prefers-color-scheme: dark)
    {
        $card-color-background: variables.$dark-color;
        $card-color-shadow: var(--black);

        :root
        {
            --clay-card-color-background: #{$card-color-background};
            --clay-card-color-shadow: #{$card-color-shadow};
        }

        .clay-card
        {
            &::before
            {
                @include mixins.clay-shadow-inset();
            }

            &.clay-card--glass
            {
                $card-color-background: variables.$dark-color;

                --clay-card-color-background: #{$card-color-background};
                --clay-card-color-shadow: var(--black);
            }
        }
    }
</style>
