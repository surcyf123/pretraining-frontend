import { AppShell, useMantineColorScheme } from "@mantine/core";
import { Amplify } from "aws-amplify";
import { Outlet } from "react-router-dom";
import config from "./amplifyconfiguration.json"; // amplify v6 Ref: https://docs.amplify.aws/javascript/build-a-backend/auth/set-up-auth/
import { Header } from "./components/Header";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles

Amplify.configure(config);

export function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <AppShell
      padding="md" // It is important to use it instead of setting padding on the AppShell.Main directly because padding of the AppShell.Main is also used to offset AppShell.Header, AppShell.Navbar, AppShell.Aside and AppShell.Footer components. Ref: https://mantine.dev/core/app-shell/#padding-prop
      header={{ height: 60 }}
    >
      <Header colorScheme={colorScheme} onToggleColorScheme={toggleColorScheme} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
