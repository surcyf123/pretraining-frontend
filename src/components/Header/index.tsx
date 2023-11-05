import { AppShell, ActionIcon, Group, NavLink as MantineNavLink, Title } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import type { MantineColorScheme } from "@mantine/core";

export interface HeaderProps {
  colorScheme: MantineColorScheme;
  onToggleColorScheme: () => void;
}

const NavLinks: { path: string; label: string }[] = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
  },
];

export function Header({ colorScheme, onToggleColorScheme }: HeaderProps): JSX.Element {
  const location = useLocation();

  return (
    <AppShell.Header p="xs">
      <Group justify="space-between" align="center">
        <Title order={5}>Header</Title>
        <Group wrap="nowrap">
          {NavLinks.map(({ path, label }) => (
            <MantineNavLink
              key={path}
              component={NavLink}
              active={location.pathname === path}
              to={path}
              label={label}
            />
          ))}
        </Group>
        <ActionIcon onClick={onToggleColorScheme} variant="default">
          {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>
      </Group>
    </AppShell.Header>
  );
}
