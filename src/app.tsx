import { Authenticator } from "@aws-amplify/ui-react";
import { AppShell, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
import { Outlet } from "react-router-dom";
import config from "./amplifyconfiguration.json"; // amplify v6 Ref: https://docs.amplify.aws/javascript/build-a-backend/auth/set-up-auth/
import { Header } from "./components/Header";
import "@mantine/core/styles.css"; // Ref: https://mantine.dev/changelog/7-0-0/#global-styles

Amplify.configure(config);
const ReactQueryClient = new QueryClient();

export function App() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isNavbarOpened, { toggle: toggleNavbar }] = useDisclosure();

  return (
    // Ref: https://ui.docs.amplify.aws/react/connected-components/authenticator/advanced
    <Authenticator.Provider>
      <AppShell
        padding="md" // It is important to use it instead of setting padding on the AppShell.Main directly because padding of the AppShell.Main is also used to offset AppShell.Header, AppShell.Navbar, AppShell.Aside and AppShell.Footer components. Ref: https://mantine.dev/core/app-shell/#padding-prop
        header={{ height: 60 }}
      >
        <Header
          colorScheme={colorScheme}
          onToggleColorScheme={toggleColorScheme}
          isNavbarOpened={isNavbarOpened}
          onToggleNavbar={toggleNavbar}
        />
        <AppShell.Main>
          <QueryClientProvider client={ReactQueryClient}>
            <Outlet />
          </QueryClientProvider>
        </AppShell.Main>
      </AppShell>
    </Authenticator.Provider>
  );
}
