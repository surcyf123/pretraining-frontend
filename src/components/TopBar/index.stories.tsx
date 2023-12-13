import { AppShell } from "@mantine/core";
import { TopBar } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Topbar",
  component: TopBar,
} as Meta<typeof TopBar>;

export const Template: StoryObj<typeof TopBar> = {
  render: function Wrapper() {
    return (
      <AppShell>
        <TopBar />
      </AppShell>
    );
  },
};
