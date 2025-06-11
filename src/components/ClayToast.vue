<template>
    <transition name="toast-fade">
        <div v-if="visible"
             class="clay-toast"
             :class="`clay-toast--${props.type}`"
             :style="toastStyle"
             role="alert"
             aria-live="polite">
            <span class="clay-toast__message">
                <slot>{{ message }}</slot>
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
    import { ref, computed, onMounted } from "vue";

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
        duration: {
            type: Number,
            default: 30000
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
        warning: "#f2c037"
    };

    const toastStyle = computed(() => ({}));
    const progress = ref(100);
    let intervalId: number | null = null;

    const progressStyle = computed(() => ({
        width: progress.value + "%",
        background: colors[props.type as keyof typeof colors]
    }));

    onMounted(() =>
    {
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
    });

    function close()
    {
        visible.value = false;
        emit("close");
        if (intervalId) { clearInterval(intervalId); }
    }
</script>

<style scoped lang="scss">
.clay-toast {
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
  border: none;
  color: #222;
  background: #fff;
  box-shadow:
    0 8px 32px 0 rgba(0,0,0,0.28),
    0 2px 8px 0 rgba(0,0,0,0.18),
    0 0 0 2px #fff6 inset,
    0 1.5px 8px 0 #fff8,
    0 16px 48px 8px rgba(0,0,0,0.35),
    0 1.5px 8px 0 #0002,
    inset 0 2px 16px 0 #0002,
    inset 0 -2px 16px 0 #0003;
  transition: box-shadow 0.2s, background 0.2s;

  &.clay-toast--success {
    border-left: 6px solid #21ba45;
  }
  &.clay-toast--error {
    border-left: 6px solid #db2828;
  }
  &.clay-toast--warning {
    border-left: 6px solid #f2c037;
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
}

@media (prefers-color-scheme: dark) {
  .clay-toast {
    background: #181a1b;
    color: #fff;
    box-shadow:
      0 8px 32px 0 rgba(0,0,0,0.65),
      0 2px 8px 0 rgba(0,0,0,0.45),
      0 0 0 2px #2226 inset,
      0 1.5px 8px 0 #fff1,
      0 16px 48px 8px rgba(0,0,0,0.85),
      0 1.5px 8px 0 #0008;
    text-shadow: 0 2px 8px #0008, 0 1px 2px #fff2;
    border: none;
  }
  .clay-toast--success { border-left: 6px solid #21ba45; }
  .clay-toast--error { border-left: 6px solid #db2828; }
  .clay-toast--warning { border-left: 6px solid #f2c037; }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
}
</style>