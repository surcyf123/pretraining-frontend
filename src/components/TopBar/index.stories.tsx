import { AppShell } from "@mantine/core";
import { TopBar } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Topbar",
  component: TopBar,
  args: {
    properties: {
      averageLoss: 120,
      averageVTrust: 23456,
      bestUID: 123,
      minLoss: 0,
      subnetEmission: 3456,
    },
  },
} as Meta<typeof TopBar>;

export const Template: StoryObj<typeof TopBar> = {
  render: function Wrapper(args) {
    return (
      <AppShell>
        <TopBar {...args} />
      </AppShell>
    );
  },
};
