<script setup lang="ts">
    import { computed } from "vue";

    const value = defineModel({
        type: String,
        default: ""
    });

    const props = defineProps({
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        }
    });

    const classes = computed(() => ({
        "clay-input--small": props.small,
        "clay-input--large": props.large
    }));
</script>

<template>
    <input v-model="value"
           class="clay-input"
           :class="classes" />
</template>

<style lang="scss">
@use "sass:color";

@use "@/assets/scss/variables";

$input-color-background: variables.$primary-color;
$input-color-outline: color.complement($input-color-background);
$input-color-shadow: color.adjust($input-color-background, $lightness: -30%);
$input-color-shadow-lightest: color.adjust($input-color-background, $lightness: +5%);
$input-color-shadow-darkest: color.adjust($input-color-shadow, $lightness: -20%);

:root {
    --clay-input-color-background: #{$input-color-background};
    --clay-input-color-background-light: #fff;
    --clay-input-color-background-dark: #262525;
    --clay-input-color-outline: #{$input-color-outline};
    --clay-input-color-shadow: #{$input-color-shadow};
    --clay-input-color-shadow-lightest: #{$input-color-shadow-lightest};
    --clay-input-color-shadow-darkest: #{$input-color-shadow-darkest};
    --clay-input-spacing-x: 1em;
    --clay-input-spacing-y: 1em;
    --clay-input-spacing: var(--clay-input-spacing-x) var(--clay-input-spacing-y);

    --clay-input-roundness: var(--clay-input-spacing-x);
}
.clay-input {
    border-radius: var(--clay-input-roundness);
    border: none;
    outline: none;
    background-blend-mode: overlay;
    padding: var(--clay-input-spacing);
    font-size: 1em;
    position: relative;
    box-shadow: 0 0 0 0 rgba(from var(--clay-input-color-outline) r g b / 0),
    0px 2px 6px 0px var(--clay-input-color-shadow) inset;
    background: var(--clay-input-color-background-light);

    transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
    color var(--clay-ease-duration) var(--clay-ease-function),

    transform var(--clay-ease-duration) var(--clay-ease-function);
    color: black;

    &::before {
        border-radius: var(--clay-input-roundness);
        content: "";
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: -1;

        background: linear-gradient(145deg, rgba(from var
        (--clay-input-color-background) r g b / 0.9) 0%,
        rgba(from var(--clay-input-color-background) r g b / 0.7) 50%,
        rgba(from var(--clay-input-color-background) r g b / 0.9) 100%);
        box-shadow:
                inset 0px 3px 10px 0px
                rgba(from var(--clay-input-color-shadow) r g b / 0.6),
                inset 0px -3px 10px 0px
                rgba(from var(--clay-input-color-shadow) r g b / 0.4), inset 3px 0px 8px 0px
                rgba(from var(--clay-input-color-shadow) r g b / 0.3), inset -3px 0px 8px 0px
                rgba(from var(--clay-input-color-shadow) r g b / 0.3), 0px 0px 0px 1px
                rgba(from var(--clay-input-color-shadow) r g b / 0.2);
    }

    &:focus-visible {
        box-shadow:0 0 0 0.15em rgba(from var(--clay-input-color-outline) r g b / 1),
         0px 4px 4px 0px var(--clay-input-color-shadow-lightest) inset,
        0px 6px 4px 0px var(--clay-input-color-shadow);
        transform: translateY(-0.0625em) scale(1.1);
    }

    &::placeholder {
        color: #262525;
    }
}
.clay-input--small {
    --clay-input-spacing-x: 0.375em;
    --clay-input-spacing-y: 0.75em;
    font-size: 0.875em;
}

.clay-input--large {
    --clay-input-spacing-x: 0.75em;
    --clay-input-spacing-y: 1.25em;
    font-size: 1.125em;
}

@media (prefers-color-scheme: dark) {
    .clay-input {
        background-color: var(--clay-input-color-background-dark);
        box-shadow:0 0 0 0 rgba(from var(--clay-input-color-outline) r g b / 0),
        0px 7px 6px 0px rgba(from var(--clay-input-color-shadow-darkest) r g b / 0.8) inset;
        color:#fff;
        transition: background-color var(--clay-ease-duration)
        var(--clay-ease-function), box-shadow var(--clay-ease-duration)
        var(--clay-ease-function), color var(--clay-ease-duration)
        var(--clay-ease-function), transform var(--clay-ease-duration)
        var(--clay-ease-function);

        &::placeholder {
            color: #fff;
        }

        &:focus-visible {
            box-shadow: 0 0 0 0.15em rgba(from var(--clay-input-color-outline) r g b / 1),
            0px 2px 4px 0px var(--clay-input-color-shadow) inset,
            0px 6px 4px 0px var(--clay-input-color-shadow);
            transform: translateY(-0.0625em) scale(1.1);
        }
    }
}
</style>
