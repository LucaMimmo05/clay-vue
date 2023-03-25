<script lang="ts" setup>
</script>

<template>
    <button class="clay-button">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    .clay-button
    {
        background-image: linear-gradient(#69cdfd, #45a5fc, #1a81e0);
        background-size: 100% 200%;
        background-position: 0px 10%;
        border: none;
        border-radius: 10px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        padding: 10px 20px;
        box-shadow: 0px 1.5px 3px -1.5px rgba(24, 119, 202, 0.75),
                    inset 0px 3px 7px 0px rgb(150, 222, 255),
                    inset 0px -3px 7px 0px rgb(24, 119, 202);

        outline: none;
        transition: background-position 333ms cubic-bezier(0.68, -0.55, 0.27, 1.55),
                    box-shadow 333ms cubic-bezier(0.68, -0.55, 0.27, 1.55),
                    transform 333ms cubic-bezier(0.68, -0.55, 0.27, 1.55);

        &:hover
        {
            box-shadow: 0px 4px 4px 0px rgba(24, 119, 202, 0.333),
                        inset 0px 3px 7px 0px rgb(150, 222, 255),
                        inset 0px -3px 7px 0px rgb(24, 119, 202);

            transform: translateY(-2px);
        }

        &:active
        {
            box-shadow: 0px 0px 1px 0px rgba(24, 119, 202, 0.75),
                        inset 0px 3px 7px 0px rgba(24, 119, 202, 1),
                        inset 0px -3px 7px 0px rgb(150, 222, 255, 0),
                        0px -4px 4px -2px rgba(24, 119, 202, 0.333);

            transform: translateY(2px);
        }

        &:focus
        {
            background-position: 0px 90%;
            // TODO: ripple più scuro!
        }
        &:focus-visible
        {
            box-shadow: 0px 0px 0px 2.5px rgba(252, 165, 65, 1),
                        inset 0px 3px 7px 0px rgb(150, 222, 255),
                        inset 0px -3px 7px 0px rgb(24, 119, 202);
        }
    }
</style>
