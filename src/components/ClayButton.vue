<script lang="ts" setup>
    import { computed } from "vue";

    const props = defineProps({
        small: {
            default: false,
            type: Boolean
        },
        large: {
            default: false,
            type: Boolean
        }
    });

    const classes = computed((): Record<string, boolean> => ({
        "clay-button--small": props.small,
        "clay-button--large": props.large
    }));
</script>

<template>
    <button class="clay-button" :class="classes">
        <slot></slot>
    </button>
</template>

<style lang="scss">
    @use "sass:color";

    @use "@/assets/scss/utils";
    @use "@/assets/scss/variables";

    $button-color-background: variables.$primary-color;
    $button-color-outline: color.complement($button-color-background);
    $button-color-shadow: color.adjust($button-color-background, $lightness: -25%);

    :root
    {
        --clay-button-color-background: #{utils.to-rgb-list($button-color-background)};
        --clay-button-color-outline: #{utils.to-rgb-list($button-color-outline)};
        --clay-button-color-shadow: #{utils.to-rgb-list($button-color-shadow)};

        --clay-button-spacing-x: 0.5em;
        --clay-button-spacing-y: 1em;
        --clay-button-spacing: var(--clay-button-spacing-x) var(--clay-button-spacing-y);

        --clay-button-roundness: var(--clay-button-spacing-x);
    }

    .clay-button
    {
        background-color: rgb(var(--clay-button-color-background));
        background-image: linear-gradient(rgba(var(--white), 0.25), rgba(var(--black), 0.25));
        background-blend-mode: overlay;
        border: none;
        border-radius: var(--clay-button-roundness);
        box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                    0px 0.1em 0.2em -0.1em rgba(var(--clay-button-color-shadow), 0.75);

        color: white;
        cursor: pointer;
        font-size: 1em;
        font-weight: bold;
        outline: none;
        padding: var(--clay-button-spacing);
        position: relative;
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                    color var(--clay-ease-duration) var(--clay-ease-function),
                    transform var(--clay-ease-duration) var(--clay-ease-function);

        perspective: 0px;

        &::before
        {
            border-radius: var(--clay-button-roundness);
            bottom: 0px;
            box-shadow: inset 0px 0px 0.125em 0px rgba(var(--black), 0.25),
                        inset 0px 0.2em 0.45em 0px rgba(var(--white), 0.25),
                        inset 0px -0.2em 0.45em 0px rgba(var(--black), 0.25);

            content: "";
            left: 0px;
            mix-blend-mode: hard-light;
            position: absolute;
            right: 0px;
            top: 0px;
            transition: box-shadow var(--clay-ease-duration) var(--clay-ease-function);

            z-index: -1;
        }

        &:hover
        {
            box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                        0px 0.25em 0.25em 0px rgba(var(--clay-button-color-shadow), 0.333);

            transform: translateY(-0.125em) scale(1.1);
        }
        &:focus-visible
        {
            box-shadow: 0px 0px 0px 0.15em rgba(var(--clay-button-color-outline), 1),
                        0px 0.25em 0.25em 0px rgba(var(--clay-button-color-shadow), 0.333);

            transform: translateY(-0.125em) scale(1.1);
        }
        &:active
        {
            box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                        0px 0px 0.125em 0px rgba(var(--clay-button-color-shadow), 0.75),
                        0px -0.25em 0.25em 0px rgba(var(--clay-button-color-shadow), 0.333);

            transform: translateY(0.25em) scaleX(1.2) scaleY(0.9);

            &::before
            {
                box-shadow: inset 0px 0px 0.125em 0px rgba(var(--black), 0.25),
                            inset 0px 0.2em 0.45em 0px rgba(var(--black), 0),
                            inset 0px -0.2em 0.45em 0px rgba(var(--black), 0.25);
            }
        }

        &.clay-button--small
        {
            font-size: 0.75em;
        }
        &.clay-button--large
        {
            font-size: 1.5em;
        }
    }

    @media (prefers-color-scheme: dark)
    {
        $button-color-background: color.adjust(variables.$primary-color, $lightness: -30%);
        $button-color-background-glow: color.adjust($button-color-background, $lightness: 20%);
        $button-color-outline: color.complement($button-color-background-glow);
        $button-color-shadow: rgb(0, 0, 0);

        :root
        {
            --clay-button-color-background: #{utils.to-rgb-list($button-color-background)};
            --clay-button-color-outline: #{utils.to-rgb-list($button-color-outline)};
            --clay-button-color-shadow: #{utils.to-rgb-list($button-color-shadow)};
        }

        .clay-button
        {
            box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                        0px 0.1em 0.2em -0.1em rgba(var(--clay-button-color-shadow), 0.5);

            &:hover,
            &:focus-visible,
            &:active
            {
                --clay-button-color-background: #{utils.to-rgb-list($button-color-background-glow)};
                --clay-button-color-shadow: #{utils.to-rgb-list($button-color-background-glow)};
            }

            &:hover
            {
                box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                            0px 0px 0.5em 0px rgba(var(--clay-button-color-shadow), 0.25),
                            0px 0.25em 0.5em 0px rgba(var(--clay-button-color-shadow), 0.25);

            }
            &:focus-visible
            {
                box-shadow: 0px 0px 0px 0.15em rgba(var(--clay-button-color-outline), 1),
                            0px 0px 0.5em 0px rgba(var(--clay-button-color-shadow), 0.25),
                            0px 0.25em 0.5em 0px rgba(var(--clay-button-color-shadow), 0.25);
            }
            &:active
            {
                box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                            0px 0px 0.25em 0px rgba(var(--clay-button-color-shadow), 0.25),
                            0px -0.25em 0.25em 0px rgba(var(--clay-button-color-shadow), 0.25);
            }
        }
    }
</style>
