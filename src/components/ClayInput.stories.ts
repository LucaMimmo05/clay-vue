import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayInput from "./ClayInput.vue";

const meta: Meta<typeof ClayInput> = {
    title: "Inputs/ClayInput",
    component: ClayInput,
    parameters: {
        layout: "centered"
    },
    argTypes: {
        placeholder: {
            control: "text"
        },
        small: {
            control: "boolean"
        },
        large: {
            control: "boolean"
        }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "Enter text here..."
    }
};

export const Small: Story = {
    args: {
        placeholder: "Small input",
        small: true
    }
};

export const Large: Story = {
    args: {
        placeholder: "Large input",
        large: true
    }
};
