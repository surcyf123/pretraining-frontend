import { AppShell } from "@mantine/core";
import { useDarkMode } from "storybook-dark-mode";
import { Header } from ".";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;

export const Template: StoryObj<typeof Header> = {
  render: function Wrapper() {
    const darkMode = useDarkMode();
    return (
      <AppShell>
        <Header
          onToggleColorScheme={() => {}}
          colorScheme={darkMode === true ? "dark" : "light"}
          isNavbarOpened={false}
          toggleNavbar={() => {}}
        />
      </AppShell>
    );
  },
};
