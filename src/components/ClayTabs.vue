<script setup lang="ts">
    import { ref, computed, onMounted } from "vue";

    interface Tab {
        id: string;
        title: string;
        content?: string;
        disabled?: boolean;
    }

    interface Props {
        tabs: Tab[];
        modelValue?: string;
        vertical?: boolean;
        small?: boolean;
        large?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        tabs: () => [],
        modelValue: "",
        vertical: false,
        small: false,
        large: false
    });

    const emit = defineEmits<{
        "update:modelValue": [value: string];
        "tab-changed": [tab: Tab];
    }>();

    const activeTab = ref(props.modelValue);
    const $el = ref<HTMLElement | null>(null);

    const classes = computed((): Record<string, boolean> => ({
        "clay-tabs--vertical": props.vertical,
        "clay-tabs--small": props.small,
        "clay-tabs--large": props.large
    }));

    const activeTabData = computed(() =>
    {
        return props.tabs.find((tab) => tab.id === activeTab.value) || props.tabs[0];
    });

    const applyAnimation = (
        element: HTMLElement,
        animationName: string,
        duration: string,
        timingFunction: string
    ) =>
    {
        element.style.animation = "none";
        void element.offsetHeight;
        element.style.animation = `${animationName} ${duration} ${timingFunction} forwards`;
    };

    const findFirstEnabledTab = (): Tab | undefined =>
    {
        return props.tabs.find((tab) => !tab.disabled);
    };

    const findTabById = (id: string): Tab | undefined =>
    {
        return props.tabs.find((tab) => tab.id === id && !tab.disabled);
    };

    const selectTab = (tab: Tab) =>
    {
        if (tab.disabled) { return; }

        activeTab.value = tab.id;
        emit("update:modelValue", tab.id);
        emit("tab-changed", tab);

        if (!$el.value) { return; }

        const clickedTab = $el.value.querySelector(`[data-tab-id="${tab.id}"]`) as HTMLElement;
        if (clickedTab)
        {
            applyAnimation(
                clickedTab,
                "clay-tabs-candy-bounce",
                "0.6s",
                "var(--clay-tabs-candy-bounce)"
            );
        }

        const content = $el.value.querySelector(".clay-tabs__panel") as HTMLElement;
        if (content)
        {
            applyAnimation(
                content,
                "clay-tabs-content-bounce",
                "0.4s",
                "var(--clay-tabs-squishy-function)"
            );
        }
    };

    onMounted(() =>
    {
        if (props.tabs.length === 0) { return; }

        const initialTab = findTabById(activeTab.value) || findFirstEnabledTab();

        if (initialTab)
        {
            activeTab.value = initialTab.id;
            selectTab(initialTab);
        }
    });
</script>

<template>
    <div ref="$el"
         class="clay-tabs"
         :class="classes">
        <div class="clay-tabs__header">
            <button v-for="tab in tabs"
                    :key="tab.id"
                    :class="{
                        'clay-tabs__tab--active': tab.id === activeTab,
                        'clay-tabs__tab--disabled': tab.disabled
                    }"
                    class="clay-tabs__tab"
                    :data-tab-id="tab.id"
                    :disabled="tab.disabled"
                    @click="selectTab(tab)">
                {{ tab.title }}
            </button>
        </div>

        <div class="clay-tabs__content">
            <div class="clay-tabs__panel">
                <slot :active-tab="activeTabData"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use "@/assets/scss/mixins";

@mixin reset-and-apply-animation($name, $duration, $timing-function) {
    animation: none;
    animation: #{$name} #{$duration} #{$timing-function} forwards;
}

@mixin radial-light-effects($light-pos: 30%, $dark-pos: 70%) {
    background:
        radial-gradient(
            circle at #{$light-pos} #{$light-pos},
            rgba(from var(--clay-tabs-color-shadow) r g b / 0.2) 0%,
            transparent 70%
        ),
        radial-gradient(
            circle at #{$dark-pos} #{$dark-pos},
            rgba(from var(--clay-tabs-color-shadow) r g b / 0.15) 0%,
            transparent 70%
        );
}

@mixin standard-tab-shadow() {
    box-shadow: var(--clay-tabs-shadow-base), var(--clay-tabs-shadow-subtle);
}

@mixin active-tab-shadow() {
    box-shadow:
        var(--clay-tabs-shadow-glow),
        var(--clay-tabs-shadow-base),
        var(--clay-tabs-shadow-subtle),
        var(--clay-tabs-shadow-inset-light),
        var(--clay-tabs-shadow-inset-dark),
        var(--clay-tabs-shadow-depth),
        var(--clay-tabs-shadow-depth-far);
}

:root {
    --clay-tabs-color-background: var(--clay-primary-color);
    --clay-tabs-color-background-hover: oklch(from var(--clay-tabs-color-background) calc(l + 0.1) c h);
    --clay-tabs-color-background-active: oklch(from var(--clay-tabs-color-background) calc(l - 0.1) c h);
    --clay-tabs-color-outline: oklch(from var(--clay-tabs-color-background) calc(l + 0.2) calc(c * 1.2) calc(h + 180));
    --clay-tabs-color-shadow: oklch(from var(--clay-tabs-color-background) calc(l - 0.25) c h);
    --clay-tabs-color-shadow-light: oklch(from var(--clay-tabs-color-background) calc(l + 0.15) c h);
    --clay-tabs-color-text: var(--white);
    --clay-tabs-color-text-inactive: oklch(from var(--clay-tabs-color-text) calc(l - 0.3) c h);
    --clay-tabs-color-border: oklch(from var(--clay-tabs-color-background) calc(l + 0.2) c h);
    --clay-tabs-color-panel-background: var(--white);
    --clay-tabs-color-panel-text: var(--dark-color);
    --clay-tabs-glow-color: rgba(255, 255, 255, 0.25);

    --clay-tabs-spacing-x: 1.5em;
    --clay-tabs-spacing-y: 0.75em;
    --clay-tabs-spacing: var(--clay-tabs-spacing-y) var(--clay-tabs-spacing-x);
    --clay-tabs-spacing-content: 1.5em;

    --clay-tabs-roundness: 1.2em;
    --clay-tabs-border-width: 2px;
    --clay-tabs-depth: 0.8em;
    --clay-tabs-squash-factor: 0.15;
    --clay-tabs-hover-scale: 1.05;
    --clay-tabs-candy-squash: 0.9;

    --clay-tabs-bounce-duration: 0.6s;
    --clay-tabs-bounce-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --clay-tabs-squishy-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --clay-tabs-candy-bounce: cubic-bezier(0.68, -0.6, 0.32, 1.6);

    --clay-tabs-gradient-header: linear-gradient(
        145deg,
        oklch(from var(--clay-tabs-color-background) calc(l + 0.2) calc(c * 0.7) h),
        oklch(from var(--clay-tabs-color-background) calc(l - 0.1) calc(c * 0.4) h)
    );

    --clay-tabs-gradient-tab: linear-gradient(
        145deg,
        oklch(from var(--clay-tabs-color-background-active) calc(l + 0.1) calc(c * 0.9) h),
        oklch(from var(--clay-tabs-color-background-active) calc(l - 0.15) calc(c * 0.7) h)
    );

    --clay-tabs-gradient-tab-hover: linear-gradient(
        145deg,
        oklch(from var(--clay-tabs-color-background-hover) calc(l + 0.15) calc(c * 1.1) h),
        oklch(from var(--clay-tabs-color-background-hover) calc(l - 0.1) calc(c * 0.8) h)
    );

    --clay-tabs-gradient-tab-active: linear-gradient(
        145deg,
        oklch(from var(--clay-tabs-color-background) calc(l + 0.15) calc(c * 0.8) h),
        oklch(from var(--clay-tabs-color-background) calc(l - 0.05) calc(c * 0.6) h)
    );

    --clay-tabs-gradient-content: linear-gradient(
        145deg,
        oklch(from var(--clay-tabs-color-panel-background) calc(l + 0.05) calc(c * 0.2) h),
        oklch(from var(--clay-tabs-color-panel-background) calc(l - 0.02) calc(c * 0.1) h)
    );

    --clay-tabs-shadow-base: 0 0 0 0 rgba(from var(--clay-tabs-color-outline) r g b / 0);
    --clay-tabs-shadow-subtle: 0 0.1em 0.2em -0.1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.75);
    --clay-tabs-shadow-elevated: 0 0.4em 0.8em -0.2em rgba(from var(--clay-tabs-color-shadow) r g b / 0.4);
    --clay-tabs-shadow-glow: 0 0 24px 8px var(--clay-tabs-glow-color);

    --clay-tabs-shadow-inset-light: inset 0.3em 0.3em 0.6em
        rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.4);
    --clay-tabs-shadow-inset-dark: inset -0.3em -0.3em 0.6em
        rgba(from var(--clay-tabs-color-shadow) r g b / 0.3);
    --clay-tabs-shadow-depth: 0 var(--clay-tabs-depth) calc(var(--clay-tabs-depth) * 1.5)
        rgba(from var(--clay-tabs-color-shadow) r g b / 0.6);
    --clay-tabs-shadow-depth-far: 0 calc(var(--clay-tabs-depth) * 0.5) calc(var(--clay-tabs-depth) * 2)
        rgba(from var(--clay-tabs-color-shadow) r g b / 0.3);

    --clay-tabs-radial-light: radial-gradient(
        circle at 30% 30%,
        rgba(from var(--clay-tabs-color-shadow) r g b / 0.2) 0%,
        transparent 70%
    );
    --clay-tabs-radial-dark: radial-gradient(
        circle at 70% 70%,
        rgba(from var(--clay-tabs-color-shadow) r g b / 0.15) 0%,
        transparent 70%
    );
}

.clay-tabs {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: inherit;
    perspective: 1000px;
    animation: clay-tabs-initial-bounce 0.6s var(--clay-tabs-bounce-function) forwards;

    &.clay-tabs--vertical {
        flex-direction: row;

        .clay-tabs__header {
            flex-direction: column;
            border-bottom: none;
            border-right: none;
            border-radius: var(--clay-tabs-roundness) 0 0 var(--clay-tabs-roundness);
            background: var(--clay-tabs-gradient-header);
            box-shadow:
                inset 0.5em 0.5em 1em rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.4),
                inset -0.5em -0.5em 1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.3),
                0 0.7em 2em rgba(from var(--clay-tabs-color-shadow) r g b / 0.5);
            padding: 0.5em 0 0.5em 0.5em;
        }

        .clay-tabs__tab {
            border-bottom: none;
            border-radius: var(--clay-tabs-roundness) 0 0 var(--clay-tabs-roundness);
            margin-bottom: 0.3em;
            margin-right: 0;
            box-shadow:
                var(--clay-tabs-shadow-base),
                0 0.2em 0.5em -0.1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.85);

            &.clay-tabs__tab--active {
                border-right: none;
                border-bottom: none;
                transform: scaleX(1) translateX(var(--clay-tabs-squash-factor)) rotateY(-5deg) scale(1.02);
                box-shadow:
                    var(--clay-tabs-shadow-glow),
                    var(--clay-tabs-shadow-base),
                    0 0.2em 0.5em -0.1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.85),
                    inset 0.3em 0.3em 0.6em rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.5),
                    inset -0.3em -0.3em 0.6em rgba(from var(--clay-tabs-color-shadow) r g b / 0.4),
                    0 var(--clay-tabs-depth) calc(var(--clay-tabs-depth) * 1.5)
                        rgba(from var(--clay-tabs-color-shadow) r g b / 0.7),
                    0 calc(var(--clay-tabs-depth) * 0.5) calc(var(--clay-tabs-depth) * 2)
                        rgba(from var(--clay-tabs-color-shadow) r g b / 0.4);

                &:focus-visible {
                    outline: none;
                    box-shadow:
                        0 0 0.3em 0.1em rgba(from var(--clay-tabs-color-outline) r g b / 0.9),
                        0 0 0.6em 0.2em rgba(from var(--clay-tabs-color-outline) r g b / 0.7),
                        0 0 1em 0.3em rgba(from var(--clay-tabs-color-outline) r g b / 0.5),
                        0 0 1.5em 0.4em rgba(from var(--clay-tabs-color-outline) r g b / 0.3),
                        0 0 2.5em 0.6em rgba(from var(--clay-tabs-color-outline) r g b / 0.15),
                        var(--clay-tabs-shadow-glow),
                        inset 0.3em 0.3em 0.6em rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.5),
                        inset -0.3em -0.3em 0.6em rgba(from var(--clay-tabs-color-shadow) r g b / 0.4);
                    transform:
                        scaleX(1)
                        translateX(calc(var(--clay-tabs-squash-factor) + 0.0625em))
                        rotateY(-5deg)
                        scale(1.04);
                    z-index: 10;
                    position: relative;
                }
            }

            &:focus-visible {
                outline: none;
                box-shadow:
                    0 0 0.3em 0.1em rgba(from var(--clay-tabs-color-outline) r g b / 0.9),
                    0 0 0.6em 0.2em rgba(from var(--clay-tabs-color-outline) r g b / 0.7),
                    0 0 1em 0.3em rgba(from var(--clay-tabs-color-outline) r g b / 0.5),
                    0 0 1.5em 0.4em rgba(from var(--clay-tabs-color-outline) r g b / 0.3),
                    0 0 2.5em 0.6em rgba(from var(--clay-tabs-color-outline) r g b / 0.15),
                    var(--clay-tabs-shadow-base),
                    0 0.2em 0.5em -0.1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.85);
                transform: translateX(0.0625em) scale(1.02);
                z-index: 10;
                position: relative;
            }

            &:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
        }
    }

    &.clay-tabs--small {
        --clay-tabs-spacing-x: 1em;
        --clay-tabs-spacing-y: 0.5em;
        --clay-tabs-spacing-content: 1em;
        --clay-tabs-depth: 0.5em;

        .clay-tabs__tab {
            font-size: 0.875em;
        }
    }

    &.clay-tabs--large {
        --clay-tabs-spacing-x: 2em;
        --clay-tabs-spacing-y: 1em;
        --clay-tabs-spacing-content: 2em;
        --clay-tabs-depth: 1.2em;

        .clay-tabs__tab {
            font-size: 1.125em;
        }
    }
}

.clay-tabs__header {
    display: flex;
    border-bottom: none;
    background: var(--clay-tabs-gradient-header);
    border-radius: var(--clay-tabs-roundness) var(--clay-tabs-roundness) 0 0;
    overflow: visible;
    position: relative;
    padding: 0.5em 0.5em 0 0.5em;
    gap: 4px;
    box-shadow:
        inset 0.5em 0.5em 1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.3),
        inset -0.5em -0.5em 1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.2),
        0 0.5em 1.5em rgba(from var(--clay-tabs-color-shadow) r g b / 0.4);

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            radial-gradient(
                circle at 20% 20%,
                rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.1) 0%,
                transparent 50%
            ),
            radial-gradient(
                circle at 80% 80%,
                rgba(from var(--clay-tabs-color-shadow) r g b / 0.1) 0%,
                transparent 50%
            );
        border-radius: inherit;
        pointer-events: none;
    }
}

.clay-tabs__tab {
    background: var(--clay-tabs-gradient-tab);
    border: none;
    color: var(--clay-tabs-color-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    font-weight: 700;
    outline: none;
    padding: var(--clay-tabs-spacing);
    position: relative;
    margin: 0 0.2em;
    border-radius: var(--clay-tabs-roundness) var(--clay-tabs-roundness) 0 0;
    @include standard-tab-shadow();

    &:hover:not(.clay-tabs__tab--disabled):not(.clay-tabs__tab--active) {
        transform: scaleY(1) translateY(var(--clay-tabs-hover-lift)) scale(var(--clay-tabs-hover-scale));
        background: var(--clay-tabs-gradient-tab-hover);
        box-shadow:
            var(--clay-tabs-shadow-base),
            var(--clay-tabs-shadow-elevated),
            0 0 1em rgba(from var(--clay-tabs-color-background-hover) r g b / 0.3);
        filter: brightness(0.95);
    }

    &:focus-visible {
        outline: none;
        box-shadow:
            0 0 0.3em 0.1em rgba(from var(--clay-tabs-color-outline) r g b / 0.9),
            0 0 0.6em 0.2em rgba(from var(--clay-tabs-color-outline) r g b / 0.7),
            0 0 1em 0.3em rgba(from var(--clay-tabs-color-outline) r g b / 0.5),
            0 0 1.5em 0.4em rgba(from var(--clay-tabs-color-outline) r g b / 0.3),
            0 0 2.5em 0.6em rgba(from var(--clay-tabs-color-outline) r g b / 0.15),
            var(--clay-tabs-shadow-base),
            var(--clay-tabs-shadow-subtle);
        transform: translateY(-0.0625em) scale(1.02);
        z-index: 10;
        position: relative;
    }

    &:active:not(.clay-tabs__tab--disabled) {
        transform: scaleY(var(--clay-tabs-candy-squash)) scaleX(1.1) translateY(0.1em);
        transition: all 0.1s var(--clay-tabs-candy-bounce);
        background: linear-gradient(145deg,
            oklch(from var(--clay-tabs-color-background-active) calc(l + 0.05) calc(c * 1.2) h),
            oklch(from var(--clay-tabs-color-background-active) calc(l - 0.2) calc(c * 0.9) h));
        box-shadow:
            var(--clay-tabs-shadow-base),
            0 0.05em 0.1em -0.05em rgba(from var(--clay-tabs-color-shadow) r g b / 0.8),
            inset 0.2em 0.2em 0.4em rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.3),
            inset -0.2em -0.2em 0.4em rgba(from var(--clay-tabs-color-shadow) r g b / 0.4);
    }

    &.clay-tabs__tab--active {
        transform: scaleY(1) translateY(0);
        background: var(--clay-tabs-gradient-tab-active);
        @include active-tab-shadow();

        &:focus-visible {
            outline: none;
            box-shadow:
                0 0 0.3em 0.1em rgba(from var(--clay-tabs-color-outline) r g b / 0.9),
                0 0 0.6em 0.2em rgba(from var(--clay-tabs-color-outline) r g b / 0.7),
                0 0 1em 0.3em rgba(from var(--clay-tabs-color-outline) r g b / 0.5),
                0 0 1.5em 0.4em rgba(from var(--clay-tabs-color-outline) r g b / 0.3),
                0 0 2.5em 0.6em rgba(from var(--clay-tabs-color-outline) r g b / 0.15),
                var(--clay-tabs-shadow-glow),
                var(--clay-tabs-shadow-inset-light);
            transform: translateY(-0.0625em) scale(1.02);
            z-index: 10;
            position: relative;
        }

        &::after {
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(145deg,
                rgba(from var(--clay-tabs-color-background-active) r g b / 0.3),
                rgba(from var(--clay-tabs-color-background-active) r g b / 0.1)),
                radial-gradient(circle, var(--clay-tabs-glow-color) 0%, transparent 70%);
            border-radius: calc(var(--clay-tabs-roundness) + 2px)
                calc(var(--clay-tabs-roundness) + 2px) 0 0;
            z-index: -1;
            filter: blur(2px) brightness(1.3);
            animation: clay-tabs-squishy-pulse 8s ease-in-out infinite;
        }
    }

    &:not(.clay-tabs__tab--active):not(.clay-tabs__tab--disabled) {
        animation: clay-tabs-breathe 8s ease-in-out infinite;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        @include radial-light-effects();
        border-radius: inherit;
        pointer-events: none;
        opacity: 0.7;
    }

    &.clay-tabs__tab--disabled {
        opacity: 0.4;
        cursor: not-allowed;
        filter: grayscale(0.8);
    }
}

.clay-tabs__content {
    flex: 1;
    background: var(--clay-tabs-gradient-content);
    border-radius: 0 0 var(--clay-tabs-roundness) var(--clay-tabs-roundness);
    overflow: hidden;
    position: relative;
    box-shadow:
        inset 0.7em 0.7em 2em rgba(from var(--clay-tabs-color-shadow) r g b / 0.25),
        inset -0.5em -0.5em 1.5em rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.18),
        0 0.3em 1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.18);

    .clay-tabs--vertical & {
        border-radius: 0 var(--clay-tabs-roundness) var(--clay-tabs-roundness) 0;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            radial-gradient(
                circle at 10% 10%,
                rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.05) 0%,
                transparent 60%),
            radial-gradient(
                circle at 90% 90%,
                rgba(from var(--clay-tabs-color-shadow) r g b / 0.05) 0%,
                transparent 60%);
        border-radius: inherit;
        pointer-events: none;
    }
}

.clay-tabs__panel {
    padding: var(--clay-tabs-spacing-content);
    color: var(--clay-tabs-color-panel-text);
    min-height: 100px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 8px;
        background: linear-gradient(180deg,
            rgba(from var(--clay-tabs-color-shadow) r g b / 0.1) 0%,
            transparent 100%);
        border-radius: var(--clay-tabs-roundness) var(--clay-tabs-roundness) 0 0;

        .clay-tabs--vertical & {
            width: 8px;
            height: 100%;
            background: linear-gradient(90deg,
                rgba(from var(--clay-tabs-color-shadow) r g b / 0.1) 0%,
                transparent 100%);
            border-radius: 0 var(--clay-tabs-roundness) var(--clay-tabs-roundness) 0;
        }
    }

    animation: clay-tabs-content-bounce 0.4s var(--clay-tabs-squishy-function) forwards;
}

@keyframes clay-tabs-content-bounce {
    0% {
        transform: translateY(0.5em) scaleY(0.95);
        opacity: 0.8;
    }
    50% {
        transform: translateY(-0.1em) scaleY(1.02);
        opacity: 0.9;
    }
    100% {
        transform: translateY(0) scaleY(1);
        opacity: 1;
    }
}

@keyframes clay-tabs-initial-bounce {
    0% {
        transform: scale(0.9);
        opacity: 0;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes clay-tabs-squishy-pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.08) rotateX(8deg);
    }
}

@keyframes clay-tabs-candy-bounce {
    0% {
        transform: scaleY(var(--clay-tabs-candy-squash)) scaleX(1.1) translateY(0.1em);
    }
    50% {
        transform: scaleY(1.1) scaleX(0.95) translateY(-0.1em);
    }
    100% {
        transform: scaleY(1) scaleX(1) translateY(0);
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --clay-tabs-color-background: oklch(from var(--clay-primary-color) calc(l - 0.3) c h);
        --clay-tabs-color-background-hover: oklch(from var(--clay-tabs-color-background) calc(l + 0.1) c h);
        --clay-tabs-color-background-active: oklch(from var(--clay-tabs-color-background) calc(l + 0.2) c h);
        --clay-tabs-color-outline: oklch(
            from var(--clay-tabs-color-background)
            calc(l + 0.3)
            calc(c * 1.3)
            calc(h + 180)
        );
        --clay-tabs-color-shadow: oklch(from var(--clay-dark-color) calc(l - 0.4) c h);
        --clay-tabs-color-shadow-light: oklch(from var(--clay-tabs-color-background) calc(l + 0.1) c h);
        --clay-tabs-color-text: var(--white);
        --clay-tabs-color-text-inactive: oklch(from var(--clay-tabs-color-text) calc(l - 0.4) c h);
        --clay-tabs-color-border: oklch(from var(--clay-tabs-color-background) calc(l - 0.2) c h);
        --clay-tabs-color-panel-background: var(--dark-color);
        --clay-tabs-color-panel-text: var(--light-color);

        --clay-tabs-gradient-header: linear-gradient(
            145deg,
            oklch(from var(--clay-tabs-color-background) calc(l - 0.1) calc(c * 0.7) h),
            oklch(from var(--clay-tabs-color-background) calc(l - 0.3) calc(c * 0.4) h)
        );

        --clay-tabs-gradient-tab: linear-gradient(
            145deg,
            oklch(from var(--clay-tabs-color-background) calc(l + 0.05) calc(c * 0.8) h),
            oklch(from var(--clay-tabs-color-background) calc(l - 0.15) calc(c * 0.6) h)
        );

        --clay-tabs-gradient-tab-active: linear-gradient(
            145deg,
            oklch(from var(--clay-tabs-color-background-active) calc(l + 0.05) calc(c * 0.9) h),
            oklch(from var(--clay-tabs-color-background-active) calc(l - 0.2) calc(c * 0.7) h)
        );

        --clay-tabs-gradient-content: linear-gradient(
            145deg,
            oklch(from var(--clay-tabs-color-panel-background) calc(l + 0.02) calc(c * 0.2) h),
            oklch(from var(--clay-tabs-color-panel-background) calc(l - 0.05) calc(c * 0.1) h)
        );
    }

    .clay-tabs__header {
        background: var(--clay-tabs-gradient-header);
        box-shadow:
            inset 0.5em 0.5em 1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.2),
            inset -0.5em -0.5em 1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.4),
            0 0.5em 1.5em rgba(from var(--clay-tabs-color-shadow) r g b / 0.6);
    }

    .clay-tabs__tab {
        background: var(--clay-tabs-gradient-tab);
        box-shadow:
            inset 0.3em 0.3em 0.6em rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.2),
            inset -0.3em -0.3em 0.6em rgba(from var(--clay-tabs-color-shadow) r g b / 0.5),
            0 var(--clay-tabs-depth) calc(var(--clay-tabs-depth) * 1.5)
                rgba(from var(--clay-tabs-color-shadow) r g b / 0.8),
            0 calc(var(--clay-tabs-depth) * 0.5) calc(var(--clay-tabs-depth) * 2)
                rgba(from var(--clay-tabs-color-shadow) r g b / 0.5);

        &.clay-tabs__tab--active {
            background: var(--clay-tabs-gradient-tab-active);
            box-shadow:
                inset 0.4em 0.4em 0.8em rgba(from var(--clay-tabs-color-shadow) r g b / 0.6),
                inset -0.2em -0.2em 0.4em rgba(from var(--clay-tabs-color-shadow-light) r g b / 0.3),
                0 calc(var(--clay-tabs-depth) * 0.5) calc(var(--clay-tabs-depth) * 1.2)
                    rgba(from var(--clay-tabs-color-shadow) r g b / 0.9),
                0 0 calc(var(--clay-tabs-depth) * 2)
                    rgba(from var(--clay-tabs-color-background-active) r g b / 0.4);
        }
    }

    .clay-tabs__content {
        background: var(--clay-tabs-gradient-content);
        box-shadow:
            inset 0.5em 0.5em 1.5em rgba(from var(--clay-tabs-color-shadow) r g b / 0.3),
            inset -0.3em -0.3em 1em rgba(from var(--clay-tabs-color-shadow) r g b / 0.1),
            0 0.2em 0.8em rgba(from var(--clay-tabs-color-shadow) r g b / 0.2);
    }
}
</style>