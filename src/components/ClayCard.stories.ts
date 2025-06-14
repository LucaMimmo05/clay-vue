import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayCard from "./ClayCard.vue";

interface StoryArgs
{
    elevation: "none" | "low" | "default" | "high";
}

const meta: Meta<StoryArgs> = {
    title: "ClayCard",
    component: ClayCard,
    tags: ["autodocs"],
    argTypes: {
        elevation: {
            name: "Elevation",
            type: { name: "string", required: false },
            description: "The elevation used to display the card.",
            table: {
                category: "Component's",
                defaultValue: { summary: "default" },
                type: { summary: "none | low | default | high" }
            },
            control: {
                type: "select",
                labels: {
                    none: "None",
                    low: "Low",
                    default: "Default",
                    high: "High"
                }
            },
            options: ["none", "low", "default", "high"]
        }
    },
    args: { elevation: "default" }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCard },
        setup: () => ({ args }),
        template: `
            <ClayCard :elevation="args.elevation"
                      style="aspect-ratio: 32/9;" />
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCard },
        setup: () => ({ args }),
        template: `
            <ClayCard :elevation="args.elevation"
                      glass
                      style="aspect-ratio: 32/9;" />
        `
    })
};

export default meta;
