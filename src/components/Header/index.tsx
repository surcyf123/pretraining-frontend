import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  AppShell,
  ActionIcon,
  Group,
  NavLink as MantineNavLink,
  Image,
  Menu,
  Text,
  ScrollArea,
} from "@mantine/core";
import { IconChevronDown, IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react";
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
  const currentPathName = location.pathname;
  const { authStatus, signOut } = useAuthenticator((context) => [context.authStatus]);

  return (
    <AppShell.Header p="xs">
      <Group justify="space-between" align="center">
        <Image {...Logo} h={30} alt="Openpretrain logo" />
        <Group wrap="nowrap">
          {NavLinks?.map(({ label, link, links }) =>
            Array.isArray(links) ? (
              <Menu key={link} trigger="hover">
                <Menu.Target>
                  <MantineNavLink
                    component={NavLink}
                    active={links.findIndex((linkItem) => linkItem.link === currentPathName) !== -1}
                    to={link}
                    label={<Text fw={500}>{label}</Text>}
                    noWrap
                    rightSection={<IconChevronDown size="1rem" />}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <ScrollArea h="50vh">
                    {links.map((item) => (
                      <Menu.Item key={item.link}>
                        <MantineNavLink
                          component={NavLink}
                          active={currentPathName === item.link}
                          to={item.link}
                          label={<Text>{item.label}</Text>}
                        />
                      </Menu.Item>
                    ))}
                  </ScrollArea>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <MantineNavLink
                key={link}
                component={NavLink}
                active={currentPathName === link}
                to={link}
                label={<Text fw={500}>{label}</Text>}
                noWrap
                title={`Go to ${label}`}
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
