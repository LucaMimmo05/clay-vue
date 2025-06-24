import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayToast from "./ClayToast.vue";

interface StoryArgs {
    type?: "success" | "error" | "warning" | "information";
    content?: string;
    variant?: "default" | "glass";
    duration?: number;
    relative?: boolean;
}

const meta: Meta<StoryArgs> = {
    title: "Notification/ClayToast",
    component: ClayToast,
    argTypes: {
        type: {
            name: "Type",
            control: { type: "select" },
            options: ["success", "error", "warning", "information"]
        },
        content: {
            name: "Content",
            control: "text"
        },
        variant: {
            name: "Variant",
            control: { type: "select" },
            options: ["default", "glass"]
        },
        duration: {
            name: "Duration",
            control: "number"
        },
        relative: {
            name: "Relative",
            control: "boolean"
        }
    },
    args: {
        type: "success",
        content: "Operazione completata! Questo è un toast.",
        variant: "default",
        duration: 3000,
        relative: false
    }
};

export default meta;

export const Default: StoryObj<StoryArgs> = {
    args: {
        type: "success",
        content: "",
        variant: "default",
        duration: 3000,
        relative: false
    },
    render: (args) => ({
        components: { ClayToast },
        setup: () => ({ args }),
        template: `
            <div style="position:relative; min-height:200px;">
                <ClayToast
                    :type="args.type"
                    :content="args.content"
                    :duration="args.duration"
                    :variant="args.variant"
                    :relative="args.relative"
                    @close="() => console.log('Toast closed')"
                />
            </div>
        `
    })
};

export const Glass: StoryObj<StoryArgs> = {
    args: {
        type: "success",
        content: "",
        variant: "glass",
        duration: 3000,
        relative: true
    },
    render: (args) => ({
        components: { ClayToast },
        setup: () => ({ args }),
        template: `
         <div style="background-image: url('https://picsum.photos/1920/1080');
                background-size: cover;
                background-position: center;
                width: 100vw;
                height: 100vh;
                margin: 0;
                padding: 0;
            ">
            <div style="position:relative; min-height:200px;">
                <ClayToast
                    :type="args.type"
                    :content="args.content"
                    :duration="args.duration"
                    :variant="args.variant"
                    :relative="args.relative"
                    @close="() => console.log('Toast closed')"
                />
            </div>
        `
    })
};