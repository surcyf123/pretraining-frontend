import { MantineProvider, createTheme } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./routes";
import "@fontsource/adlam-display";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";

const MantineTheme = createTheme({
  fontFamily: "Space Mono, sans-serif",
  fontFamilyMonospace: "Space Mono, Courier, monospace", // Ref : https://mantine.dev/theming/typography/#change-fonts
  headings: { fontFamily: "ADLaM Display, sans-serif" }, // Ref : https://mantine.dev/theming/typography/#change-fonts
  fontSizes: { xs: "14px", sm: "16px", md: "18px", lg: "20px", xl: "22px" },
}); // Ref: https://mantine.dev/theming/theme-object/#store-theme-override-object-in-a-variable

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <StrictMode>
    <MantineProvider theme={MantineTheme} defaultColorScheme="dark">
      <RouterProvider router={Routers} />
    </MantineProvider>
  </StrictMode>,
);
