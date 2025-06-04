import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayInput from "./ClayInput.vue";

interface StoryArgs {
    placeholder: string;
    size: "small" | "default" | "large";
}

const meta: Meta<StoryArgs> = {
    title: "ClayInput",
    component: ClayInput,
    tags: ["autodocs"],
    argTypes: {
        placeholder: {
            name: "Text",
            type: { name: "string", required: false },
            description: "Text of the input placeholder.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Enter text here..." },
                type: { summary: "string" }
            },
            control: "text"
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "Size of input.",
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
        }
    },
    args: {
        placeholder: "Enter text here...",
        size: "default"
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayInput },
        setup: () => ({ args }),
        template: `
            <ClayInput :placeholder="args.placeholder"
                       :small="args.size === 'small'"
                       :large="args.size === 'large'" />
        `
    })
};

export default meta;
