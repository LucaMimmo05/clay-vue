<script lang="ts" setup>
</script>

<template>
    <div class="clay-container">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .clay-container
    {
        // backdrop-filter: blur(var(--blur));
        background-color: rgba(255, 255, 255, var(--opacity));
        border-radius: var(--roundness);
        box-shadow: 0px 35px 68px 0px rgba(var(--background-color), 0.5),
              inset var(--depth) 16px 0px rgba(var(--background-color), 0.6),
              inset 0px 11px 28px 0px rgb(255, 255, 255);
    }
</style>
