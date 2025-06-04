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
//   "update:value": [value: string];
// }>();

// Rinominato per evitare warning ESLint (variabili non usate)
const _el = ref<HTMLInputElement | null>(null);

const _classes = computed(() => ({
  "clay-input--small": props.small,
  "clay-input--large": props.large
}));
</script>

<template>
  <div class="clay-card">
    <slot></slot>
  </div>
</template>

<style lang="scss">
@use "sass:color";
@use "@/assets/scss/variables";

$input-color-background: #fff;
$input-color-outline: color.complement($input-color-background);
$input-color-shadow: color.adjust($input-color-background, $lightness: -25%);

:root {
  --clay-input-color-background: #{$input-color-background};
  --clay-input-color-background-dark: #{$input-color-background};
  --clay-input-color-outline: #{$input-color-outline};
  --clay-input-color-shadow: #{$input-color-shadow};

  --clay-input-spacing-x: 1em;
  --clay-input-spacing-y: 1em;
  --clay-input-spacing: var(--clay-input-spacing-x) var(--clay-input-spacing-y);

  --clay-input-roundness: var(--clay-input-spacing-x);
}

.clay-card {
  border-radius: 1em;
  background: #fff;
  padding: 2em;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  min-width: 200px;
}
</style>
