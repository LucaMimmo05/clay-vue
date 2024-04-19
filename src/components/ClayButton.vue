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
    :root
    {
        --clay-button-color-background: 87, 185, 255;
        --clay-button-color-outline: 255, 185, 87;
        --clay-button-color-shadow: 25, 140, 220;

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
                    0px 1.5px 3px -1.5px rgba(var(--clay-button-color-shadow), 0.75);

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
                        0px 4px 4px 0px rgba(var(--clay-button-color-shadow), 0.333);

            transform: translateY(-2px) scale(1.1);
        }

        &:focus-visible
        {
            box-shadow: 0px 0px 0px 2.5px rgba(var(--clay-button-color-outline), 1),
                        0px 4px 4px 0px rgba(var(--clay-button-color-shadow), 0.333);

            transform: translateY(-2px) scale(1.1);
        }

        &:active
        {
            box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                        0px 0px 2px 0px rgba(var(--clay-button-color-shadow), 0.75),
                        0px -4px 4px -2px rgba(var(--clay-button-color-shadow), 0.333);

            transform: translateY(4px) scaleX(1.2) scaleY(0.9);

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

    body[dark]
    {
        --clay-button-color-background: 0, 111, 191;
        --clay-button-color-outline: 255, 185, 87;
        --clay-button-color-shadow: 0, 0, 0;

        .clay-button
        {
            box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                        0px 1.5px 3px -1.5px rgba(var(--clay-button-color-shadow), 0.5);

            &:hover
            {
                --clay-button-color-background: 47, 168, 255;
                --clay-button-color-shadow: 47, 168, 255;

                box-shadow: 0px 0px 0px 0px rgba(var(--clay-button-color-outline), 0),
                            0px 0px 8px 0px rgba(var(--clay-button-color-shadow), 0.666);

            }
        }
    }
</style>
