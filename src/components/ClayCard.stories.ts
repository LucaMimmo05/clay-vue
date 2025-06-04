import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayCard from "./ClayCard.vue";

interface StoryArgs {
size: "small" | "default" | "large";
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
        } }
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
