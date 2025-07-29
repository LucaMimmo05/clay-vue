import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayCarosel from "./ClayCarosel.vue";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StoryArgs { }

const meta: Meta<StoryArgs> = {
    title: "ClayCarosel",
    component: ClayCarosel,
    tags: ["autodocs"]
};

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCarosel },
        template: `
            <div style="max-width: 600px; margin: auto;">
                <ClayCarosel />
            </div>
        `
    })
};

export const Vertical: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCarosel },
        template: `
            <div style="max-width: 600px; height: 600px; margin: auto;">
                <ClayCarosel vertical />
            </div>
        `
    })
};

export const WithButtons: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayCarosel },
        template: `
            <div style="max-width: 600px; height: 600px; margin: auto;">
                <ClayCarosel with-buttons />
            </div>
        `
    })
};

export default meta;
