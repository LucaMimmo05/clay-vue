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
            name: "Segnaposto",
            type: { name: "string", required: false },
            description: "Testo visualizzato come segnaposto nell'input.",
            table: {
                category: "Props",
                defaultValue: { summary: "Inserisci testo..." },
                type: { summary: "string" }
            },
            control: "text"
        },
        size: {
            name: "Dimensione",
            type: { name: "string", required: false },
            description: "Dimensione dell'input.",
            table: {
                category: "Props",
                defaultValue: { summary: "default" },
                type: { summary: "small | default | large" }
            },
            control: {
                type: "select",
                labels: {
                    small: "Piccolo",
                    default: "Default",
                    large: "Grande"
                }
            },
            options: ["small", "default", "large"]
        }
    },
    args: {
        placeholder: "Inserisci testo...",
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
