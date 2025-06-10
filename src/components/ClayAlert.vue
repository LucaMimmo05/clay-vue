<template>
  <ClayCard class="clay-alert" v-bind="$attrs">
    <span class="clay-alert__icon-wrapper">
      <span class="clay-alert__badge">
        <svg :class="`clay-alert__badge-svg clay-alert__badge-svg--${type}`" xmlns="http://www.w3.org/2000/svg"
          width="150" height="150" viewBox="0 0 300 300" fill="none" shape-rendering="geometricPrecision">
          <g filter="url(#badge-shadow)">
            <circle cx="150" cy="150" r="138" :stroke="badgeColor" stroke-width="20" stroke-linecap="round"
              stroke-linejoin="round" />
          </g>
          <defs>
            <filter id="badge-shadow" x="0" y="0" width="300" height="300" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0" result="hardAlpha" />
              <feOffset dy="10" />
              <feGaussianBlur stdDeviation="3" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0.4 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            </filter>
          </defs>
        </svg>
        <span class="clay-alert__icon-content">
          <svg v-if="type === 'success'" class="clay-alert__icon" viewBox="0 0 300 300" width="150" height="150"
            shape-rendering="geometricPrecision">
            <polyline points="90 160 140 220 220 110" fill="none" :stroke="badgeColor" stroke-width="24"
              stroke-linecap="round" stroke-linejoin="round" filter="url(#badge-shadow)" />
          </svg>
          <svg v-else-if="type === 'error'" class="clay-alert__icon" viewBox="0 0 300 300" width="150" height="150"
            shape-rendering="geometricPrecision">
            <g filter="url(#badge-shadow)">
              <line x1="110" y1="110" x2="190" y2="190" :stroke="badgeColor" stroke-width="24" stroke-linecap="round" />
              <line x1="190" y1="110" x2="110" y2="190" :stroke="badgeColor" stroke-width="24" stroke-linecap="round" />
            </g>
          </svg>
          <svg v-else-if="type === 'warning'" class="clay-alert__icon" viewBox="0 0 300 300" width="150" height="150"
            shape-rendering="geometricPrecision">
            <line x1="150" y1="90" x2="150" y2="190" :stroke="badgeColor" stroke-width="24" stroke-linecap="round"
              filter="url(#badge-shadow)" />
            <circle cx="150" cy="230" r="16" :fill="badgeColor" filter="url(#badge-shadow)" />
          </svg>
        </span>
      </span>
    </span>
    <span class="clay-alert__label">{{ type }}</span>
    <div class="clay-alert__content">
      <span class="clay-alert__message">
        {{ message || defaultMessage }}
      </span>
      <ClayButton class="clay-alert__button">ok</ClayButton>
    </div>
  </ClayCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ClayCard from "./ClayCard.vue";
import ClayButton from "./ClayButton.vue";

const props = defineProps({
  type: {
    type: String,
    default: "success",
    validator: (v: string) => ["success", "error", "warning"].includes(v),
  },
  message: {
    type: String,
    default: "",
  },
});

const badgeColor = computed(() => {
  switch (props.type) {
    case "success":
      return "#21ba45";
    case "error":
      return "#db2828";
    case "warning":
      return "#f2c037";
    default:
      return "#21ba45";
  }
});

const defaultMessage = computed(() => {
  if (props.message) return props.message;

  switch (props.type) {
    case "success":
      return "✅ Operazione completata con successo.";
    case "error":
      return "❌ Errore durante l'operazione.";
    case "warning":
      return "⚠️ Attenzione: azione potenzialmente rischiosa.";
    default:
      return "";
  };
});
</script>

<style lang="scss">
.clay-alert__badge-svg,
.clay-alert__icon {
  shape-rendering: geometricPrecision;
  text-rendering: geometricPrecision;
  image-rendering: optimizeQuality;
  will-change: transform;
  transform: translateZ(0);
}

.clay-alert__icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5em;
}
.clay-alert__badge {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
}
.clay-alert__badge-svg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.clay-alert__icon-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.clay-alert__icon {
  width: 96px;
  height: 96px;
  display: block;
}
.clay-alert__label {
  font-size: 1.5em;
  font-weight: 600;
  color: #222;
  text-transform: capitalize;
  text-align: center;
  width: 100%;
  display: block;
  margin-bottom: 2em;
}
.clay-alert__message {
  font-size: 1.1em;
  color: #333;
  text-align: center;
  margin-bottom: 1.5em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.clay-alert__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.clay-alert__button {
  margin-top: 1em;
  width: 110px;
  height: 40px;
}

@media (prefers-color-scheme: dark) {
  .clay-alert__label {
    color: #fff;
  }
  .clay-alert__message {
  color: #eee;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
}
</style>
