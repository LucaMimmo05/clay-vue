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

    const emit = defineEmits<{
        "update:value": [value: string];
    }>();

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
