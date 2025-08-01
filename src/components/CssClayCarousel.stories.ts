import type { Meta, StoryObj } from "@storybook/vue3-vite";
import CssClayCarousel from "./CssClayCarousel.vue";

const meta: Meta<typeof CssClayCarousel> = {
  title: "Components/CssClayCarousel",
  component: CssClayCarousel,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CssClayCarousel>;

export const Default: Story = {
  args: {
    images: [
      "https://picsum.photos/id/1011/800/400",
      "https://picsum.photos/id/1012/800/400",
      "https://picsum.photos/id/1013/800/400"
    ]
  }
};
