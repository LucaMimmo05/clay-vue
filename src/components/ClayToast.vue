<template>
    <transition name="toast-fade">
        <div v-if="visible"
             class="clay-toast"
             :class="[
                 `clay-toast--${props.type}`,
                 { 'clay-toast--glass': props.variant === 'glass' }
             ]"
             :style="toastStyle"
             role="alert"
             aria-live="polite">
            <span class="clay-toast__message">
                <slot>{{ defaultMessage }}</slot>
            </span>
            <button class="clay-toast__close"
                    aria-label="Chiudi"
                    @click="close">
                <svg width="18"
                     height="18"
                     viewBox="0 0 24 24">
                    <line x1="6"
                          y1="6"
                          x2="18"
                          y2="18"
                          stroke="#db2828"
                          stroke-width="2"
                          stroke-linecap="round" />
                    <line x1="18"
                          y1="6"
                          x2="6"
                          y2="18"
                          stroke="#db2828"
                          stroke-width="2"
                          stroke-linecap="round" />
                </svg>
            </button>
            <div class="clay-toast__progress"
                 :style="progressStyle"></div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from "vue";

    const props = defineProps({
        type: {
            type: String,
            default: "success",
            validator: (v: string) => ["success", "error", "warning", "information"].includes(v)
        },
        message: {
            type: String,
            default: ""
        },
        duration: {
            type: Number,
            default: 3000
        },
        variant: {
            type: String,
            default: "default",
            validator: (v: string) => ["default", "glass"].includes(v)
        }
    });

    const emit = defineEmits(["close"]);

    const visible = ref(true);

    const colors = {
        success: "#21ba45",
        error: "#db2828",
        warning: "#f2c037",
        information: "var(--clay-primary-color)"
    };

    const toastStyle = computed(() => ({}));
    const progress = ref(100);
    let intervalId: number | null = null;

    const progressStyle = computed(() => ({
        width: progress.value + "%",
        background: colors[props.type as keyof typeof colors]
    }));

    function startTimer()
    {
        if (intervalId) { clearInterval(intervalId); }
        progress.value = 100;
        if (props.duration > 0)
        {
            const step = 100 / (props.duration / 20);
            intervalId = window.setInterval(() =>
            {
                progress.value -= step;
                if (progress.value <= 0)
                {
                    progress.value = 0;
                    close();
                    if (intervalId) { clearInterval(intervalId); }
                }
            }, 20);
        }
    }

    onMounted(startTimer);

    watch([() => props.duration, () => props.message], () =>
    {
        visible.value = true;
        startTimer();
    });

    function close()
    {
        visible.value = false;
        emit("close");
        if (intervalId) { clearInterval(intervalId); }
    }

    const defaultMessage = computed(() =>
    {
        if (props.message) { return props.message; }
        switch (props.type)
        {
            case "success":
                return "Your changes have been saved successfully!";
            case "error":
                return "Something went wrong. Please try again.";
            case "warning":
                return "Warning: Check your input values.";
            case "information":
                return "For your information.";
            default:
                return "";
        }
    });
</script>

<style scoped lang="scss">
:root {
  --clay-toast-color-success: #21ba45;
  --clay-toast-color-error: #db2828;
  --clay-toast-color-warning: #f2c037;
  --clay-toast-color-information: var(--clay-primary-color);

  --clay-toast-color-background: linear-gradient(120deg, #fff 70%, #f3f3f7 100%);
  --clay-toast-color-background-glass:
    linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 100%),
    rgba(255,255,255,0.06);

  --clay-toast-color-border: 2px solid rgba(120,120,120,0.18);
  --clay-toast-color-border-glass: 2px solid rgba(120,120,120,0.13);

  --clay-toast-color-text: #222;
  --clay-toast-color-text-glass: #222;
}

.clay-toast {
  font-family: 'Baloo 2', cursive, sans-serif;
  min-width: 320px;
  max-width: 420px;
  padding: 1.2em 2.5em 1.2em 1.5em;
  border-radius: 1.1em;
  position: fixed;
  bottom: 2.5em;
  right: 2.5em;
  z-index: 9999;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  font-weight: 600;
  letter-spacing: 0.01em;
  overflow: hidden;
  user-select: none;
  border: 2px solid rgba(120,120,120,0.18);
  color: var(--clay-toast-color-text);
  background: var(--clay-toast-color-background);
  border: var(--clay-toast-color-border);

  &.clay-toast--glass {
    color: var(--clay-toast-color-text-glass);
    background: var(--clay-toast-color-background-glass);
    border: var(--clay-toast-color-border-glass);
  }

  &::after {
    content: "";
    position: absolute;
    left: 10%;
    bottom: -18px;
    width: 80%;
    height: 32px;
    border-radius: 50%;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 80%);
    filter: blur(2px);
    z-index: 0;
    pointer-events: none;
  }
}

.clay-toast--glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.18) 0%,
    rgba(255,255,255,0.04) 40%,
    rgba(0,0,0,0.10) 100%
  );
  mix-blend-mode: lighten;
}

.clay-toast__close {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 1.0em;
  padding: 0.2em;
  display: flex;
  align-items: center;
  transition: filter 0.15s;
  z-index: 3;
  svg {
    display: block;
    stroke: #db2828;
  }
  &:hover svg {
    filter: brightness(1.3);
  }
}

.clay-toast__progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  border-radius: 0 0 1em 1em;
  transition: width 0.2s linear;
  z-index: 2;
  background: var(--clay-toast-progress);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}

.clay-toast--information {
  --clay-toast-color-information: var(--clay-primary-color);
}

@media (prefers-color-scheme: dark) {
  :root {
    --clay-toast-color-success: #21ba45;
    --clay-toast-color-error: #db2828;
    --clay-toast-color-warning: #f2c037;
    --clay-toast-color-information: var(--clay-primary-color);

    --clay-toast-color-background: #181a1b;
    --clay-toast-color-background-glass:
      linear-gradient(135deg, rgba(40,40,40,0.10) 0%, rgba(40,40,40,0.04) 100%),
      rgba(40,40,40,0.10);

    --clay-toast-color-border: 2px solid rgba(120,120,120,0.18);
    --clay-toast-color-border-glass: 2px solid rgba(120,120,120,0.13);

    --clay-toast-color-text: #fff;
    --clay-toast-color-text-glass: #fff;
  }

  .clay-toast {
    background: #181a1b;
    color: #fff;
    box-shadow:
      0 8px 32px 0 rgba(0,0,0,0.65),
      0 2px 8px 0 rgba(0,0,0,0.45),
      0 0 0 2px #2226 inset,
      0 1.5px 8px 0 #fff1,
      0 16px 48px 8px rgba(0,0,0,0.85),
      0 1.5px 8px 0 #0008,
      inset 0 2px 16px 0 #fff3,
      inset 0 -4px 16px 0 #0008,
      inset 0 0 24px 0 rgba(0,0,0,0.22);
    text-shadow: 0 2px 8px #0008, 0 1px 2px #fff2;
    border: 2px solid rgba(120,120,120,0.18);
  }
  .clay-toast.clay-toast--glass {
    color: #fff;
    background:
      linear-gradient(135deg, rgba(40,40,40,0.10) 0%, rgba(40,40,40,0.04) 100%),
      rgba(40,40,40,0.10);
    border: 2px solid rgba(120,120,120,0.13);
  }
  .clay-toast::before {
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.03) 40%,
      rgba(0,0,0,0.18) 100%
    );
    mix-blend-mode: lighten;
  }
}
</style>