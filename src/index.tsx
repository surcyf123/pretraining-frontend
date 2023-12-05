import { MantineProvider, createTheme } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./routes";
import "@fontsource/adlam-display/400.css";
import "@fontsource/space-mono/400.css";

const MantineTheme = createTheme({
  fontFamily: "Space Mono, sans-serif",
  fontFamilyMonospace: 'Space Mono, Courier, monospace', // Ref : https://mantine.dev/theming/typography/#change-fonts
  headings: { fontFamily: "ADLaM Display, sans-serif" }, // Ref : https://mantine.dev/theming/typography/#change-fonts
}); // Ref: https://mantine.dev/theming/theme-object/#store-theme-override-object-in-a-variable

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <StrictMode>
    <MantineProvider theme={MantineTheme}>
      <RouterProvider router={Routers} />
    </MantineProvider>
  </StrictMode>,
);
