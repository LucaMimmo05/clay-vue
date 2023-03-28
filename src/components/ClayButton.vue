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
        background-image: linear-gradient(rgb(105, 205, 255), rgb(70, 165, 255));
        border: none;
        border-radius: 10px;
        box-shadow: 0px 0px 0px 0px rgba(252, 165, 65, 0),  // outline
                    0px 1.5px 3px -1.5px rgba(25, 140, 220, 0.75);  // shadow

        color: white;
        cursor: pointer;
        font-weight: bold;
        padding: 10px 20px;
        outline: none;
        transition: box-shadow 333ms cubic-bezier(0.68, -0.55, 0.27, 1.55),
                    transform 333ms cubic-bezier(0.68, -0.55, 0.27, 1.55);

        transform-style: preserve-3d;

        &::before
        {
            background-color: rgba(87, 185, 255, 0);
            border-radius: 10px;
            bottom: 0px;
            box-shadow: inset 0px 0px 2px 0px rgba(25, 140, 220, 0.5),  // inner-border
                        inset 0px 3px 7px 0px rgb(175, 225, 255),  // top-light
                        inset 0px -3px 7px 0px rgb(25, 140, 220);  // bottom-light

            content: "";
            left: 0px;
            position: absolute;
            right: 0px;
            top: 0px;
            transition: background-color 333ms cubic-bezier(0.68, -0.55, 0.27, 1.55),
                        box-shadow 333ms cubic-bezier(0.68, -0.55, 0.27, 1.55);

            z-index: -1;
        }

        &:hover
        {
            box-shadow: 0px 0px 0px 0px rgba(252, 165, 65, 0),  // outline
                        0px 4px 4px 0px rgba(25, 140, 220, 0.333);  // shadow

            transform: scale(1.05) translateY(-2px);

            &::before
            {
                background-color: rgba(255, 255, 255, 0.125);
            }
        }

        &:focus
        {
            &::before
            {
                background-color: rgba(0, 0, 0, 0.125);
            }
        }
        &:focus-visible
        {
            box-shadow: 0px 0px 0px 2.5px rgba(252, 165, 65, 1),  // outline
                        0px 4px 4px 0px rgba(25, 140, 220, 0.333);  // shadow

            transform: scale(1.05) translateY(-2px);
        }

        &:active
        {
            box-shadow: 0px 0px 0px 0px rgba(252, 165, 65, 0),  // outline
                        0px 0px 2px 0px rgba(25, 140, 220, 0.75),  // shadow
                        0px -4px 4px -2px rgba(25, 140, 220, 0.333);  // top-notch;

            transform: scale(0.95) translateY(2px);

            &::before
            {
                box-shadow: inset 0px 0px 2px 0px rgba(25, 140, 220, 1),  // inner-border
                            inset 0px 3px 7px 0px rgb(175, 225, 255),  // top-light
                            inset 0px -3px 7px 0px rgb(25, 140, 220);  // bottom-light
            }
        }
    }
</style>
