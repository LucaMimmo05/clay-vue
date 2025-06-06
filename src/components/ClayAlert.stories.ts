import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ClayAlert from "./ClayAlert.vue";

interface StoryArgs {
  size: "small" | "default" | "large";
  type: "success" | "error" | "warning";
  content: string;
}

const meta: Meta<StoryArgs> = {
  title: "ClayAlert",
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
    }
  },
  args: {
    size: "default",
    type: "success",
    content: "Operazione completata con successo!"
  }
};

export const Primary: StoryObj<StoryArgs> = {
  render: (args: StoryArgs) => ({
    components: { ClayAlert },
    setup: () => ({ args }),
    template: `
      <ClayAlert :type="args.type" :class="'clay-alert--' + args.size">
        {{ args.content }}
      </ClayAlert>
    `
  })
};

export default meta;
