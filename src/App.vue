<script lang="ts" setup>
    import ClayButton from "./components/ClayButton.vue";
    import ClayContainer from "./components/ClayContainer.vue";
</script>

<template>
    <div>
        <ClayContainer>
            <ClayButton>
                Prova 1
            </ClayButton>
        </ClayContainer>
    </div>
</template>

<style lang="scss">
    :root
    {
        --background-color: 145, 192, 255;  // #91C0FF

        --blur: 5px;
        --depth: 0px -8px;
        --opacity: 1.0;
        --roundness: 26px;
    }

    html,
    body
    {
        height: 100%;
        margin: 0px;
        padding: 0px;
    }
    body
    {
        background-color: rgb(var(--background-color));
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
</style>
