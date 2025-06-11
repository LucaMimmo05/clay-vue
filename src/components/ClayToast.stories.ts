import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayToast from "./ClayToast.vue";

interface StoryArgs {
  type: "success" | "error" | "warning";
  content: string;
}

const meta: Meta<StoryArgs> = {
    title: "Notification/ClayToast",
    component: ClayToast,
    argTypes: {
        type: {
            name: "Type",
            control: { type: "select" },
            options: ["success", "error", "warning"]
        },
        content: {
            name: "Content",
            control: "text"
        }
    },
    args: {
        type: "success",
        content: "Operazione completata! Questo è un toast."
    }
};

export default meta;

export const Primary: StoryObj<StoryArgs> = {
    render: (args) => ({
        components: { ClayToast },
        setup: () => ({ args }),
        template: `
            <div style="position:relative; min-height:200px;">
                <ClayToast
                    :type="args.type"
                    :message="args.content"
                    :duration="3000"
                    :relative="true"
                    @close="() => console.log('Toast closed')"
                />
            </div>
        `
    })
};