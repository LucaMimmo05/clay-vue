import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClaySwitch from "./ClaySwitch.vue";
import { ref } from "vue";

interface StoryArgs {
    modelValue: boolean;
    theme?: boolean;
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
        modelValue: false
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
