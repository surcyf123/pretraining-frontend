import { Heatmap } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Heatmap",
  args: {
    loading: false,
    theme: "dark",
    title: "Heatmap",
    style: { height: "100vh" },
  },
  component: Heatmap,
} as Meta<typeof Heatmap>;

export const Template: StoryObj<typeof Heatmap> = {};
