import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClaySwitch from "./ClaySwitch.vue";
import { ref } from "vue";

interface StoryArgs {
    modelValue: boolean;
    theme?: boolean;
    size?: "small" | "medium" | "large";
    "update:modelValue": (value: boolean) => void;
}

const meta: Meta<StoryArgs> = {
    title: "ClaySwitch",
    component: ClaySwitch,
    tags: ["autodocs"],
    argTypes: {
        modelValue: {
            name: "Model Value",
            type: { name: "boolean", required: false },
            description: "The value of the switch.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: {
                type: "boolean"
            }
        },
        theme: {
            name: "Theme Mode",
            type: { name: "boolean", required: false },
            description: "Enable theme mode with sun/moon icons.",
            table: {
                category: "Component's",
                defaultValue: { summary: "false" },
                type: { summary: "boolean" }
            },
            control: {
                type: "boolean"
            }
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size of the switch.",
            table: {
                category: "Component's",
                defaultValue: { summary: "medium" },
                type: { summary: "string" }
            },
            control: {
                type: "select"
            },
            options: ["small", "medium", "large"]
        }
    }
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || false);
            return { modelValue };
        },
        template: `<ClaySwitch v-model="modelValue" />`
    }),
    args: {
        modelValue: false,
        size: "small"
    }
};

export const Checked: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || true);
            return { modelValue };
        },
        template: `<ClaySwitch v-model="modelValue" />`
    }),
    args: {
        modelValue: true
    }
};
export const Theme: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || true);
            const theme = ref(args.theme || true);
            return { modelValue, theme };
        },
        template: `<ClaySwitch v-model="modelValue" :theme="theme" />`
    }),
    args: {
        modelValue: true,
        theme: true
    }
};

export const Small: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || false);
            const size = ref(args.size || "small");
            return { modelValue, size };
        },
        template: `<ClaySwitch v-model="modelValue" :size="size" />`
    }),
    args: {
        modelValue: false,
        size: "small"
    }
};

export const Large: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || false);
            const size = ref(args.size || "large");
            return { modelValue, size };
        },
        template: `<ClaySwitch v-model="modelValue" :size="size" />`
    }),
    args: {
        modelValue: false,
        size: "large"
    }
};

export const ThemeSmall: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || true);
            const theme = ref(args.theme || true);
            const size = ref(args.size || "small");
            return { modelValue, theme, size };
        },
        template: `<ClaySwitch v-model="modelValue" :theme="theme" :size="size" />`
    }),
    args: {
        modelValue: true,
        theme: true,
        size: "small"
    }
};

export const ThemeLarge: Story = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () =>
        {
            const modelValue = ref(args.modelValue || true);
            const theme = ref(args.theme || true);
            const size = ref(args.size || "large");
            return { modelValue, theme, size };
        },
        template: `<ClaySwitch v-model="modelValue" :theme="theme" :size="size" />`
    }),
    args: {
        modelValue: true,
        theme: true,
        size: "large"
    }
};
