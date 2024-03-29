import { Decorator } from "@storybook/react";
import React from "react";
import { useDarkMode } from "storybook-dark-mode";
import { MantineProvider } from "@mantine/core";
import type { MantineProviderProps } from "@mantine/core";
import "@mantine/core/styles.css"; //Ref: https://mantine.dev/styles/global-styles/
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactQueryClient = new QueryClient();
function ThemeWrapper({ children }: MantineProviderProps): JSX.Element {
  const darkMode = useDarkMode();

  return (
    <Authenticator.Provider>
      <QueryClientProvider client={ReactQueryClient}>
        <MantineProvider forceColorScheme={darkMode === true ? "dark" : "light"}>
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </Authenticator.Provider>
  );
}

export const decorators: Decorator[] = [
  (renderStory: () => MantineProviderProps["children"]) => (
    <ThemeWrapper>
      <BrowserRouter>{renderStory()} </BrowserRouter>
    </ThemeWrapper>
  ),
];
