<script lang="ts" setup>
    import { ref, watch } from "vue";

    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits<(e: "update:modelValue", value: boolean) => void>();

    const localValue = ref(props.modelValue);

    watch(
        () => props.modelValue,
        (newValue) =>
        {
            localValue.value = newValue;
        }
    );
</script>

<template>
    <label class="switch">
        <input v-model="localValue"
               type="checkbox"
               @change="emit('update:modelValue', localValue)" />
        <span class="slider"></span>
    </label>
</template>

<style lang="scss">
@use "sass:color";
@use "@/assets/scss/variables";

$switch-color-background: variables.$primary-color;
$switch-color-border: color.scale($switch-color-background, $lightness: +70%);

:root {
    --clay-switch-color-background: #{$switch-color-background};
    --clay-switch-color-border: #{$switch-color-border};

    --clay-shadow-light: #ffffff;
    --clay-shadow-dark: #d1d9e6;
}

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;

    & input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .slider {
            background-color: var(--clay-switch-color-background);
            box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.2),
            inset -6px -6px 12px rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.15);
        }

        &:checked + .slider::before {
            transform: translateX(22px);
            animation: switch 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3), 0px 2px 5px rgba(0, 0, 0, 0.2),
            inset 2px 2px 6px rgba(255, 255, 255, 0.9), inset -2px -2px 6px rgba(0, 0, 0, 0.1);
        }
    }
    &:hover {
        transform: scale(1.05);
        transition: transform 0.4s ease-out;

        .slider::before {
            transform: scale(1.05);
            transition: transform 0.5s ease-out;
        }

        input:checked + .slider::before {
            transform: translateX(22px);
            transition: transform 0.5s ease-out;
        }
    }
}

.slider {
    position: absolute;
    cursor: pointer;
    background-color: #f0f0f0;
    border-radius: 34px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.4s;
    box-shadow: inset 14px 12px 14px var(--clay-shadow-dark),
    inset -8px -8px 16px var(--clay-shadow-light), 4px 4px 8px rgba(0, 0, 0, 0.1);

    &::before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 3px;
        bottom: 3px;
        background-color: #fafafa;
        border-radius: 50%;
        transition: 0.4s;
        box-shadow: 4px 4px 8px var(--clay-shadow-dark), -4px -4px 8px
        var(--clay-shadow-light), inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.1);
    }
}

@keyframes switch {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(22px);
    }
}
</style>
