<script lang="ts" setup>
    import { ref, watch } from "vue";

    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        theme: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits<(e: "update:modelValue", value: boolean) => void>();

    const localValue = ref(props.modelValue);
    const switchId = `clay-switch-${Math.random().toString(36)
        .substr(2, 9)}`;

    watch(
        () => props.modelValue,
        (newValue) =>
        {
            localValue.value = newValue;
        }
    );

    watch(localValue, (newValue) =>
    {
        emit("update:modelValue", newValue);
    });
</script>

<template>
    <label :for="switchId" class="switch">
        <input :id="switchId"
               v-model="localValue"
               type="checkbox" />
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

    --clay-shadow-light-dark: #6b7280;
    --clay-shadow-dark-dark: #374151;
    --clay-switch-bg-dark: #4b5563;
    --clay-switch-bg-dark-checked: color.adjust($switch-color-background, $lightness: -20%);
    --clay-switch-toggle-dark: #9ca3af;
}

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    cursor: pointer;

    & input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .slider {
            background-color: var(--clay-switch-color-background);
            box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.2), inset -6px -6px 12px
            rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.15);
        }

        &:checked + .slider::before {
            transform: translateX(22px);
            animation: switch 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3), 0px 2px 6px rgba(0, 0, 0, 0.2),
            inset 2px 2px 6px rgba(255, 255, 255, 0.9), inset -2px -2px 6px rgba(0, 0, 0, 0.1);
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
    transition: 0.3s;
    box-shadow: inset 8px 8px 16px var(--clay-shadow-dark), inset -8px -8px 16px
    var(--clay-shadow-light), 2px 2px 8px rgba(0, 0, 0, 0.1);

    &::before {
        position: absolute;
        content: "";
        height: 22px;
        width: 22px;
        left: 3px;
        bottom: 3px;
        background-color: #fafafa;
        border-radius: 50%;
        transition: 0.5s;
        box-shadow: 4px 4px 8px var(--clay-shadow-dark), -4px -4px 8px var(--clay-shadow-light),
        inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(0, 0, 0, 0.1);
    }
}

@keyframes switch {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(22px);
    }
}

@media (prefers-color-scheme: dark) {
    $button-color-background: color.adjust(variables.$primary-color, $lightness: -30%);
    :root {
        --clay-button-color-background: #{$button-color-background};
    }
    .slider {
        background-color: var(--clay-switch-bg-dark);
        box-shadow: inset 6px 6px 12px var(--clay-shadow-dark-dark), inset -6px -6px 12px
        var(--clay-shadow-light-dark), 2px 2px 8px rgba(0, 0, 0, 0.2);

        &::before {
            background-color: var(--clay-switch-toggle-dark);
            box-shadow: 3px 3px 6px var(--clay-shadow-dark-dark), -3px -3px 6px var(--clay-shadow-light-dark),
            inset 2px 2px 4px rgba(255, 255, 255, 0.15), inset -2px -2px 4px rgba(0, 0, 0, 0.2);
        }
    }

    .switch input:checked + .slider {
        background-color: var(--clay-button-color-background);
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.3), inset -4px -4px 8px
        rgba(255, 255, 255, 0.1), 2px 2px 6px rgba(0, 0, 0, 0.15);

        &::before {
            background-color: #ffffff;
            box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3), 0px 1px 4px rgba(0, 0, 0, 0.2),
            inset 2px 2px 4px rgba(255, 255, 255, 0.25), inset -2px -2px 4px rgba(0, 0, 0, 0.25);
        }
    }
}
</style>
