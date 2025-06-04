import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayCard from "./ClayCard.vue";

interface StoryArgs {
    placeholder: string;
    size: "small" | "default" | "large";
    content: string;
}

const meta: Meta<StoryArgs> = {
    title: "ClayCard",
    component: ClayCard,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            control: { type: "select" },
            options: ["small", "default", "large"]
        }
    },
    args: {
        size: "default",
        content: "Questa è una card di esempio."
    }
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCard },
        setup: () => ({ args }),
        template: `
            <ClayCard :class="'clay-card--' + args.size">
                {{ args.content }}
            </ClayCard>
        `
    })
};

export default meta;
