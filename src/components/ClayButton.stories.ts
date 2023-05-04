import type { Meta, StoryObj } from "@storybook/vue3";

import ClayButton from "./ClayButton.vue";

type ClayButtonType = typeof ClayButton;
type Story = StoryObj<ClayButtonType>;

interface Args
{
    label: string;
    size: "small" | "default" | "large";
}

const meta: Meta<ClayButtonType> = {
    title: "ClayButton",
    component: ClayButton
};

export const Primary: Story = {
    args: {
        label: "Click me!",
        size: "default"
    },
    argTypes: {
        label: {
            name: "Text",
            type: { name: "string", required: true },
            description: "The text to display inside the button.",
            table: {
                category: "Component's",
                defaultValue: { summary: "Click me!" },
                type: { summary: "string" }
            },
            control: "text"
        },
        size: {
            name: "Size",
            type: { name: "string", required: false },
            description: "The size used to display the button.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" }
            },
            control: {
                type: "select",
                labels: {
                    "small": "Small",
                    "default": "Default",
                    "large": "Large"
                }
            },
            options: ["small", "default", "large"]
        }
    },
    render: (args: Args) => ({
        components: { ClayButton },
        setup: () => ({ args }),
        template: `
            <ClayButton :small="args.size === 'small'"
                        :large="args.size === 'large'">
                {{ args.label }}
            </ClayButton>
        `
    })
};

export default meta;
