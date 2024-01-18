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
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown, IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./logo.png";
import { NavLinks } from "./utils";
import type { MantineColorScheme } from "@mantine/core";

export interface HeaderProps {
  colorScheme: MantineColorScheme;
  onToggleColorScheme: () => void;
  isNavbarOpened: boolean;
  toggleNavbar: () => void;
}

export function Header({
  colorScheme,
  onToggleColorScheme,
  isNavbarOpened,
  toggleNavbar,
}: HeaderProps): JSX.Element {
  const location = useLocation();
  const currentPathName = location.pathname;
  const { authStatus, signOut } = useAuthenticator((context) => [context.authStatus]);
  const { breakpoints } = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width:${breakpoints.md})`);
  return (
    <AppShell.Header p="xs">
      <Group justify="space-between" align="center">
        <Image {...Logo} h={30} alt="Openpretrain logo" />
        {isMobile === true ? (
          // Ref: https://mantine.dev/app-shell/?e=BasicAppShell&s=code
          <AppShell.Navbar p="md">
            {NavLinks?.map(({ label, link, links }) =>
              Array.isArray(links) ? (
                // Ref: https://mantine.dev/core/nav-link/#nested-navlinks
                <MantineNavLink
                  label={<Text fw={500}>{label}</Text>}
                  noWrap
                  rightSection={<IconChevronDown size="1rem" />}
                >
                  <ScrollArea h="50vh">
                    {links.map((item) => (
                      <MantineNavLink
                        key={item.link}
                        component={NavLink}
                        active={currentPathName === item.link}
                        to={item.link}
                        label={<Text>{item.label}</Text>}
                        onClick={toggleNavbar}
                      />
                    ))}
                  </ScrollArea>
                </MantineNavLink>
              ) : (
                <MantineNavLink
                  key={link}
                  component={NavLink}
                  active={currentPathName === link}
                  to={link}
                  label={<Text fw={500}>{label}</Text>}
                  noWrap
                  title={`Go to ${label}`}
                  onClick={toggleNavbar}
                />
              ),
            )}
          </AppShell.Navbar>
        ) : (
          <Group wrap="nowrap">
            {NavLinks?.map(({ label, link, links }) =>
              Array.isArray(links) ? (
                <Menu key={link} trigger="hover">
                  <Menu.Target>
                    <MantineNavLink
                      component={NavLink}
                      active={
                        links.findIndex((linkItem) => linkItem.link === currentPathName) !== -1
                      }
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
        )}
        <Group>
          <ActionIcon onClick={onToggleColorScheme} variant="default">
            {colorScheme === "dark" ? <IconSun /> : <IconMoonStars />}
          </ActionIcon>
          <Burger opened={isNavbarOpened} onClick={toggleNavbar} hiddenFrom="md" size="sm" />
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
