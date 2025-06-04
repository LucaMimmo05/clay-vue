
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
  --clay-card-color-background: #{$input-color-background};
  --clay-card-color-background-dark: #{$input-color-background};
  --clay-card-color-outline: #{$input-color-outline};
  --clay-card-color-shadow: #{$input-color-shadow};
  --clay-card-spacing-x:7rem;
  --clay-card-spacing-y:8rem;
  --clay-card-spacing: var(--clay-card-spacing-x) var(--clay-card-spacing-y);
  --clay-card-roundness: var(--clay-card-spacing-x);
}

.clay-card {
  border-radius: 1em;
  background: #fff;
  padding: var(--clay-card-spacing);
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.51), 0px 3px 22px 0px rgba(0, 0, 0, 0.06) inset;
}
.clay-card--small {
        --clay-card-spacing-x: 0.375em;
        --clay-card-spacing-y: 0.75em;
        font-size: 0.875em;
    }

.clay-card--large {
        --clay-card-spacing-x: 0.75em;
        --clay-card-spacing-y: 1.25em;
         font-size: 1.125em;
    }
@media (prefers-color-scheme: dark) {
        .clay-card {
          border-radius: 1em;
          background: #fff;
          padding: var(--clay-card-spacing);
          box-shadow: 0px 4px 16px 0px rgba(255, 255, 255, 0.41), 0px 3px 24px 0px rgba(0, 0, 0, 0.66) inset;
        }
    }
</style>
