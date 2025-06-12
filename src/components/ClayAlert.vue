<template>
    <ClayCard v-if="visible"
              :class="['clay-alert', { 'clay-card--glass': props.variant === 'glass' }]"
              v-bind="$attrs">
        <button v-if="showCloseButton"
                class="clay-alert__close-button"
                aria-label="Close"
                @click="closeAlert">
            <svg class="clay-alert__close-icon"
                 viewBox="0 0 24 24"
                 width="24"
                 height="24">
                <g>
                    <line x1="6"
                          y1="6"
                          x2="18"
                          y2="18"
                          stroke="var(--clay-alert-color-error)"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <line x1="18"
                          y1="6"
                          x2="6"
                          y2="18"
                          stroke="var(--clay-alert-color-error)"
                          stroke-width="2"
                          stroke-linecap="round" />
                </g>
            </svg>
        </button>
        <span class="clay-alert__icon-wrapper">
            <span class="clay-alert__badge">
                <svg :class="`clay-alert__badge-svg clay-alert__badge-svg--${type}`"
                     xmlns="http://www.w3.org/2000/svg"
                     width="150"
                     height="150"
                     viewBox="0 0 300 300"
                     fill="none"
                     shape-rendering="geometricPrecision">
                    <g>
                        <circle cx="150"
                                cy="150"
                                r="138"
                                :stroke="badgeColor"
                                stroke-width="20"
                                fill="none"
                                filter="url(#inner-shadow)" />
                    </g>
                    <defs>
                        <filter id="inner-shadow"
                                x="0"
                                y="0"
                                width="300"
                                height="300"
                                filterUnits="userSpaceOnUse">
                            <feOffset dx="0" dy="6" />
                            <feGaussianBlur stdDeviation="10" result="offset-blur" />
                            <feComposite in="SourceGraphic"
                                         in2="offset-blur"
                                         operator="out"
                                         result="inverse" />
                            <feFlood flood-color="#000"
                                     flood-opacity="1.0"
                                     result="color" />
                            <feComposite in="color"
                                         in2="inverse"
                                         operator="in"
                                         result="shadow" />
                            <feComposite in="shadow"
                                         in2="SourceGraphic"
                                         operator="over" />
                        </filter>
                    </defs>
                </svg>
                <span class="clay-alert__icon-content">
                    <svg v-if="type === 'success'"
                         class="clay-alert__icon"
                         viewBox="0 0 300 300"
                         width="150"
                         height="150"
                         shape-rendering="geometricPrecision">
                        <polyline points="90 160 140 220 220 110"
                                  fill="none"
                                  :stroke="badgeColor"
                                  stroke-width="24"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  filter="url(#inner-shadow)" />
                    </svg>
                    <svg v-else-if="type === 'error'"
                         class="clay-alert__icon"
                         viewBox="0 0 300 300"
                         width="150"
                         height="150"
                         shape-rendering="geometricPrecision">
                        <g filter="url(#inner-shadow)">
                            <line x1="110"
                                  y1="110"
                                  x2="190"
                                  y2="190"
                                  :stroke="badgeColor"
                                  stroke-width="24"
                                  stroke-linecap="round" />
                            <line x1="190"
                                  y1="110"
                                  x2="110"
                                  y2="190"
                                  :stroke="badgeColor"
                                  stroke-width="24"
                                  stroke-linecap="round" />
                        </g>
                    </svg>
                    <svg v-else-if="type === 'warning'"
                         class="clay-alert__icon"
                         viewBox="0 0 300 300"
                         width="150"
                         height="150"
                         shape-rendering="geometricPrecision">
                        <line x1="150"
                              y1="90"
                              x2="150"
                              y2="190"
                              :stroke="badgeColor"
                              stroke-width="24"
                              stroke-linecap="round"
                              filter="url(#inner-shadow)" />
                        <circle cx="150"
                                cy="230"
                                r="16"
                                :fill="badgeColor"
                                filter="url(#inner-shadow)" />
                    </svg>
                </span>
            </span>
        </span>
        <span class="clay-alert__label">{{ type }}</span>
        <div class="clay-alert__content">
            <span class="clay-alert__message">
                <slot>
                    {{ message || defaultMessage }}
                </slot>
            </span>
            <div class="clay-alert__buttons">
                <ClayButton v-if="showCancelButton" class="clay-alert__button clay-alert__button--cancel">
                    Cancel
                </ClayButton>
                <ClayButton class="clay-alert__button">
                    OK
                </ClayButton>
            </div>
        </div>
    </ClayCard>
</template>

<script setup lang="ts">
    import { ref, computed } from "vue";
    import ClayCard from "./ClayCard.vue";
    import ClayButton from "./ClayButton.vue";

    const emit = defineEmits(["close"]);

    const props = defineProps({
        type: {
            type: String,
            default: "success",
            validator: (v: string) => ["success", "error", "warning"].includes(v)
        },
        message: {
            type: String,
            default: ""
        },
        showCancelButton: {
            type: Boolean,
            default: false
        },
        showCloseButton: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: "default",
            validator: (v: string) => ["default", "glass"].includes(v)
        }
    });

    const visible = ref(true);

    function closeAlert()
    {
        visible.value = false;
        emit("close");
    }

    const badgeColor = computed(() =>
    {
        switch (props.type)
        {
            case "success":
                return "var(--clay-alert-color-success)";
            case "error":
                return "var(--clay-alert-color-error)";
            case "warning":
                return "var(--clay-alert-color-warning)";
            default:
                return "var(--clay-alert-color-success)";
        }
    });

    const defaultMessage = computed(() =>
    {
        if (props.message) { return props.message; }
        switch (props.type)
        {
            case "success":
                return "✅ Operation completed successfully.";
            case "error":
                return "❌ Error during operation.";
            case "warning":
                return "⚠️ Warning: potentially risky action.";
            default:
                return "";
        }
    });
</script>

<style lang="scss">
:root {
  /* Colors */
  --clay-alert-color-success: #21ba45;
  --clay-alert-color-error: #db2828;
  --clay-alert-color-warning: #f2c037;

  --clay-alert-color-cancel: #ff4d4f;
  --clay-alert-color-cancel-hover: #ff7875;
  --clay-alert-color-cancel-active: #e04344;

  /* Shadows */
  --clay-alert-shadow-opacity: 0.4;
  --clay-alert-shadow-offset-y: 10px;
  --clay-alert-shadow-blur: 3px;
  --clay-alert-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  --clay-alert-text-shadow-dark: 0 1px 2px rgba(0, 0, 0, 0.5);
}

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
  text-shadow: var(--clay-alert-text-shadow) inset;
}

.clay-alert__message {
  font-size: 1.1em;
  color: #333;
  text-align: center;
  margin-bottom: 1.5em;
  text-shadow: var(--clay-alert-text-shadow) inset;
}

.clay-alert__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clay-alert__buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;
  width: 100%;
}

.clay-alert__button {
  width: 110px;
  height: 40px;
}

.clay-alert__button--cancel {
  --clay-button-color-background: var(--clay-alert-color-cancel) !important;
  --clay-button-color-outline: var(--clay-alert-color-cancel) !important;
  --clay-button-color-shadow: var(--clay-alert-color-cancel) !important;
  color: #fff !important;
}

.clay-alert__button--cancel:hover,
.clay-alert__button--cancel:focus-visible {
  --clay-button-color-background: color-mix(in srgb, var(--clay-alert-color-cancel) 90%, #fff 10%);
  --clay-button-color-shadow: var(--clay-alert-color-cancel);
}

.clay-alert__button--cancel:active,
.clay-alert__button--cancel.clay-button--active {
  --clay-button-color-background: var(--clay-alert-color-cancel);
  --clay-button-color-shadow: var(--clay-alert-color-cancel);
}

.clay-alert__close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  transition: background-color 0.2s ease;
}

.clay-alert__close-button:hover {
  background-color: rgba(from var(--clay-alert-color-error) r g b / 0.1);
}

.clay-alert__close-icon {
  width: 20px;
  height: 20px;
}

.clay-alert__button--cancel:focus-visible,
.clay-alert__close-button:focus-visible {
  outline: none;
  --clay-button-color-outline: #33ffff;
  --clay-button-color-shadow: #33ffff;
  box-shadow:
    0 0 0 0.15em rgba(51,255,255,1),
    0 0 0.5em 0 rgba(51,255,255,0.25),
    0 0.25em 0.5em 0 rgba(51,255,255,0.25);
}

@media (prefers-color-scheme: dark) {
  :root {
    --clay-alert-color-cancel: #b71c1c;
    --clay-alert-color-cancel-hover: #ff3333;
    --clay-alert-color-cancel-active: #ff4444;
  }

  .clay-alert__label {
    color: #fff;
    text-shadow: var(--clay-alert-text-shadow) inset;
  }

  .clay-alert__message {
    color: #eee;
    text-shadow: var(--clay-alert-text-shadow-dark) inset;
  }

  .clay-alert__button--cancel {
    --clay-button-color-background: var(--clay-alert-color-cancel) !important;
    --clay-button-color-outline: var(--clay-alert-color-cancel) !important;
    --clay-button-color-shadow: var(--clay-alert-color-cancel) !important;
    color: #fff !important;
  }

  .clay-alert__button--cancel:hover,
  .clay-alert__button--cancel:focus-visible {
    --clay-button-color-background: var(--clay-alert-color-cancel-hover);
    --clay-button-color-shadow: var(--clay-alert-color-cancel-hover);
  }

  .clay-alert__button--cancel:active,
  .clay-alert__button--cancel.clay-button--active {
    --clay-button-color-background: var(--clay-alert-color-cancel-active);
    --clay-button-color-shadow: var(--clay-alert-color-cancel-active);
  }
}
</style>
