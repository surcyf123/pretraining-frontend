import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  AppShell,
  ActionIcon,
  Group,
  NavLink as MantineNavLink,
  Image,
  Menu,
  Grid,
} from "@mantine/core";
import { IconLogout, IconMoonStars, IconSun, IconChevronDown } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./logo.png";
import { SubnetsData } from "./utils";
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
              <Menu key={path} trigger="hover">
                <Menu.Target>
                  <MantineNavLink
                    rightSection={<IconChevronDown size={20} />}
                    to="#"
                    component={NavLink}
                    label="Subnets"
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Grid
                    maw={900}
                    p={4}
                    mah={{ base: 500, md: "auto" }}
                    style={{ overflowY: "auto" }}
                    gutter={0}
                  >
                    {SubnetsData.map((subnet, index) => (
                      <Grid.Col
                        key={subnet.path}
                        span={{
                          md: 6,
                          lg: 4,
                        }}
                        order={{
                          /* calculate grid position by dividing links into tow columns each containing 17 items */
                          md:
                            (index % Math.ceil(SubnetsData.length / 2)) * 2 +
                            Math.ceil(index / Math.ceil(SubnetsData.length / 2)), // TODO : reafactor calculation so it can work on any size arrays

                          /* calculate grid position by dividing links into tow columns each containing 11 items */
                          lg:
                            (index % Math.ceil(SubnetsData.length / 3)) * 3 +
                            Math.ceil(index / Math.ceil(SubnetsData.length / 3)), // TODO : reafactor calculation so it can work on any size arrays
                        }}
                      >
                        <Menu.Item>
                          <MantineNavLink
                            style={{ padding: 0, background: "transparent" }}
                            to={subnet.path}
                            component={NavLink}
                            label={subnet.label}
                          />
                        </Menu.Item>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Menu.Dropdown>
              </Menu>
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
