import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppShell, ActionIcon, Group, NavLink as MantineNavLink, Image } from "@mantine/core";
import { IconChevronDown, IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./logo.png";
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
    path: "/general",
    label: "General",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "#",
    label: "Subnets",
  },
];

export function Header({ colorScheme, onToggleColorScheme }: HeaderProps): JSX.Element {
  const location = useLocation();
  const { authStatus, signOut } = useAuthenticator((context) => [context.authStatus]);
  return (
    <AppShell.Header p="xs">
      <Group justify="space-between" align="center">
        <Image {...Logo} h={30} alt="Openpretrain logo" />
        <Group wrap="nowrap">
          {NavLinks.map(({ path, label }) =>
            label === "Subnets" ? (
              <MantineNavLink
                rightSection={<IconChevronDown size={20} />}
                to="#"
                component={NavLink}
                label="Subnets"
              />
            ) : (
              <MantineNavLink
                key={path}
                component={NavLink}
                active={location.pathname === path}
                to={path}
                label={label}
              />
            ),
          )}
        </Group>
        <Group>
          <ActionIcon onClick={onToggleColorScheme} variant="default">
            {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
          </ActionIcon>
          {authStatus === "authenticated" ? (
            <ActionIcon onClick={signOut} variant="default">
              <IconLogout />
            </ActionIcon>
          ) : null}
        </Group>
      </Group>
    </AppShell.Header>
  );
}
