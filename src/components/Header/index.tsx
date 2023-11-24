import { useAuthenticator } from "@aws-amplify/ui-react";
import { AppShell, ActionIcon, Group, NavLink as MantineNavLink, Title } from "@mantine/core";
import { IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  const { authStatus, signOut } = useAuthenticator((context) => [context.authStatus]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      navigate("/login");
    }
  }, [authStatus, navigate]);

  return (
    <AppShell.Header p="xs">
      <Group justify="space-between" align="center">
        <Title order={3}>[τ, τ]</Title>
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
