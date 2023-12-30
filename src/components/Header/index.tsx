import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppShell, ActionIcon, Group, NavLink as MantineNavLink, Image } from "@mantine/core";
import { IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./logo.png";
import { SubnetsData } from "./utils";
import type { MantineColorScheme } from "@mantine/core";

export interface HeaderLinksProps {
  link: string;
  label: string;
  links?: { label: string; link: string }[];
}

export interface HeaderProps {
  colorScheme: MantineColorScheme;
  onToggleColorScheme: () => void;
}

const NavLinks: HeaderLinksProps[] = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/general",
    label: "General",
  },
  {
    link: "/dashboard",
    label: "Dashboard",
  },
  {
    link: "#",
    label: "Subnets",
    links: SubnetsData,
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
