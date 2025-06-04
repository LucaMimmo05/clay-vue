<script setup lang="ts">
    import { ref, computed } from "vue";

    interface Props {
        small?: boolean;
        large?: boolean;
        placeholder?: string;
        value?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        small: false,
        large: false,
        placeholder: "",
        value: "Enter text here..."
    });

    // const emit = defineEmits<{
    //     "update:value": [value: string];
    // }>();

    const $el = ref<HTMLInputElement | null>(null);

    const classes = computed(() => ({
        "clay-input--small": props.small,
        "clay-input--large": props.large
    }));
</script>

<template>
    <input ref="$el"
           class="clay-input"
           :class="classes"
           :placeholder="placeholder"
           :value="value" />
</template>

<style lang="scss">
    @use "sass:color";

    @use "@/assets/scss/variables";

    $input-color-background: #fff;
    $input-color-outline: color.complement($input-color-background);
    $input-color-shadow: color.adjust($input-color-background, $lightness: -25%);

    :root
    {
        --clay-input-color-background: #{$input-color-background};
        --clay-input-color-outline: #{$input-color-outline};
        --clay-input-color-shadow: #{$input-color-shadow};

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
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.14) inset;
        background: var(--clay-input-color-background);
        transition: background-color var(--clay-ease-duration) var(--clay-ease-function),
                    box-shadow var(--clay-ease-duration) var(--clay-ease-function),
                    color var(--clay-ease-duration) var(--clay-ease-function),
                    transform var(--clay-ease-duration) var(--clay-ease-function);

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

            background: linear-gradient(145deg,
                rgba(from var(--clay-input-color-background) r g b / 0.9) 0%,
                rgba(from var(--clay-input-color-background) r g b / 0.7) 50%,
                rgba(from var(--clay-input-color-background) r g b / 0.9) 100%
            );
            box-shadow:
                /* Ombra interna più intensa al focus */
                inset 0px 3px 10px 0px rgba(0, 0, 0, 0.5),
                inset 0px -3px 10px 0px rgba(0, 0, 0, 0.5),
                inset 3px 0px 8px 0px rgba(0, 0, 0, 0.5),
                inset -3px 0px 8px 0px rgba(0, 0, 0, 0.5),
                /* Bordo di focus */
                0px 0px 0px 2px rgba(0, 0, 0, 0.5);
        }

        &:focus-visible {
            box-shadow: 0px 4px 4px 0px rgba(129, 128, 128, 0.11) inset, 0px 4px 4px 0px rgba(0, 0, 0, 0.34);
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
</style>
