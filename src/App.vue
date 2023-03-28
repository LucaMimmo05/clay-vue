<script lang="ts" setup>
    import ClayButton from "./components/ClayButton.vue";
    import ClayContainer from "./components/ClayContainer.vue";
</script>

<template>
    <div>
        <ClayContainer>
            <ClayButton style="font-size: 0.75em;">
                Small
            </ClayButton>
            <ClayButton style="font-size: 1em;">
                Normal
            </ClayButton>
            <ClayButton style="font-size: 1.5em;">
                Big
            </ClayButton>
        </ClayContainer>
    </div>
</template>

<style lang="scss">
    :root
    {
        --black: 0, 0, 0;
        --white: 255, 255, 255;

        --clay-color-background: 145, 192, 255;

        --clay-ease-duration: 333ms;
        --clay-ease-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    html,
    body
    {
        font-size: 16px;
        height: 100%;
        margin: 0px;
        padding: 0px;
    }
    body
    {
        background-color: rgb(var(--clay-color-background));
    }

    #app
    {
        padding-top: 2.5em;
    }

    .clay-container
    {
        height: 244px;
        margin: auto;
        padding: 2.5em;
        text-align: center;
        width: 364px;
    }
    .clay-button
    {
        margin: 0.25em;
    }
</style>
