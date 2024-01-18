import { AppShell, ScrollArea, Text, NavLink as MantineNavLink } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import { NavLinks } from "../Header/utils";

interface NavbarProps {
  onToggleNavbar: () => void;
}

export function Navbar({ onToggleNavbar }: NavbarProps): JSX.Element {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
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
                  onClick={onToggleNavbar}
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
            onClick={onToggleNavbar}
          />
        ),
      )}
    </AppShell.Navbar>
  );
}
