import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayAlert from "./ClayAlert.vue";

interface StoryArgs {
  size: "small" | "default" | "large";
  type: "success" | "error" | "warning";
  content: string;
  showCancelButton: boolean;
  showCloseButton: boolean;
}

const meta: Meta<StoryArgs> = {
    title: "Notification/ClayAlert",
    component: ClayAlert,
    tags: ["autodocs"],
    argTypes: {
        size: {
            name: "Size",
            control: { type: "select" },
            options: ["small", "default", "large"]
        },
        type: {
            name: "Type",
            control: { type: "select" },
            options: ["success", "error", "warning"]
        },
        content: {
            name: "Content",
            control: "text"
        },
        showCancelButton: {
            name: "Show Cancel Button",
            control: "boolean"
        },
        showCloseButton: {
            name: "Show Close Button",
            control: "boolean"
        }
    },
    args: {
        size: "default",
        type: "success",
        showCancelButton: false,
        showCloseButton: false
    }
};

export default meta;

export const Primary: StoryObj<StoryArgs> = {
    render: (args: StoryArgs) => ({
        components: { ClayAlert },
        setup: () => ({ args }),
        template: `
      <ClayAlert 
        :type="args.type" 
        :class="'clay-alert--' + args.size" 
        :showCancelButton="args.showCancelButton"
        :showCloseButton="args.showCloseButton"
        @close="() => console.log('Alert closed')">
        <template v-if="args.content">
          {{ args.content }}
        </template>
      </ClayAlert>
    `
    })
};
