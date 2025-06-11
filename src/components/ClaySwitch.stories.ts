import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClaySwitch from "./ClaySwitch.vue";

interface StoryArgs {
    size: "small" | "default" | "large";
    click: () => void;
}

const meta: Meta<StoryArgs> = {
    title: "ClaySwitch",
    component: ClaySwitch,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size used to display the switch.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" }
            },
            control: {
                type: "select",
                labels: {
                    small: "Small",
                    default: "Default",
                    large: "Large"
                }
            },
            options: ["small", "default", "large"]
        },
        click: {
            name: "Click",
            type: { name: "function", required: false },
            description: "Function to call when the switch is clicked.",
            table: {
                category: "Component's",
                type: { summary: "function" }
            }
        }
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClaySwitch },
        setup: () => ({ args }),
        template: `<ClaySwitch :size="args.size" @click="args.click" />`
    })
};

export default meta;
