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
        background-image: linear-gradient(#c3ecff, #69cdfd, #45a5fc);
        background-size: 100% 200%;
        background-position: 0px 90%;
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
            box-shadow: 0px 3px 3px 0px rgba(24, 119, 202, 0.5),
                        inset 0px 3px 7px 0px rgb(150, 222, 255),
                        inset 0px -3px 7px 0px rgb(24, 119, 202);

            transform: translateY(-1.5px);
        }

        &:active
        {
            background-position: 0px 10%;
            box-shadow: 0px 1.5px 3px -1.5px rgba(24, 119, 202, 0.75),
                        inset 0px 3px 7px 0px rgb(150, 222, 255),
                        inset 0px -3px 7px 0px rgb(24, 119, 202);

            transform: translateY(0px);
        }

        &:focus-visible
        {
            box-shadow: 0px 0px 0px 2.5px rgba(252, 165, 65, 1),
                        inset 0px 3px 7px 0px rgb(150, 222, 255),
                        inset 0px -3px 7px 0px rgb(24, 119, 202);
        }
    }
</style>
