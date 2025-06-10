<template>
    <div :class="['clay-alert', `clay-alert--${type}`]" v-bind="$attrs">
        <div class="clay-alert__content">
            <span class="clay-alert__label">{{ type }}</span>
            <ClayButton class="clay-alert__button">
                okay
            </ClayButton>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ClayButton from "./ClayButton.vue";

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const props = defineProps({
        type: {
            type: String,
            default: "success",
            validator: (v: string) => ["success", "error", "warning"].includes(v)
        }
    });
</script>

<style lang="scss">
.clay-alert {
  width: 312px;
  height: 226px;
  flex-shrink: 0;
  fill: #fff;
  background: #fff;
  border-radius: 0.75em;
  box-shadow:
    7px 0px 51px 0px rgba(119, 119, 119, 0.2) inset,
    -9px -9px 75px 0px rgba(119, 119, 119, 0.35) inset;
  filter: drop-shadow(0px 13px 45px rgba(0, 0, 0, 0.41));
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em auto;
}

.clay-alert__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.clay-alert__label {
  font-size: 1.5em;
  font-weight: 600;
  color: #222;
  text-transform: capitalize;
  text-align: center;
  width: 100%;
  display: block;
  margin-bottom: 2.5em;
}

.clay-alert__button {
  margin-top: auto;
}
</style>