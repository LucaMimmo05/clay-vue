<script lang="ts" setup>
    import ClayButton from "@/components/ClayButton.vue";
    import ClayCard from "@/components/ClayCard.vue";
    import ClayInput from "@/components/inputs/ClayInput.vue";
</script>

<template>
    <ClayCard>
        <form class="login-form">
            <ClayInput id="username" />
            <ClayInput id="password" type="password" />
            <hr />
            <ClayButton type="submit">
                Login
            </ClayButton>
        </form>
    </ClayCard>
</template>

<style lang="scss">
    .login-form
    {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
</style>
