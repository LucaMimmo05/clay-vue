<script lang="ts" setup>
</script>

<template>
    <div class="clay-container">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    :root
    {
        --clay-container-blur: 5px;
        --clay-container-depth: 0px -8px;
        --clay-container-opacity: 1.0;
        --clay-container-roundness: 26px;
    }
    .clay-container
    {
        // backdrop-filter: blur(var(--clay-container-blur));
        background-color: rgba(255, 255, 255, var(--clay-container-opacity));
        border-radius: var(--clay-container-roundness);
        box-shadow: 0px 35px 68px 0px rgba(var(--clay-color-background), 0.5),
              inset var(--clay-container-depth) 16px 0px rgba(var(--clay-color-background), 0.6),
              inset 0px 11px 28px 0px rgb(255, 255, 255);
    }
</style>
