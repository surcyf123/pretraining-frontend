import { Authenticator, ThemeProvider, useAuthenticator } from "@aws-amplify/ui-react";
import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Theme } from "@aws-amplify/ui-react";
import type { ComponentProps } from "react";
import "@aws-amplify/ui-react/styles.css";

const FormFields: ComponentProps<typeof Authenticator>["formFields"] = {
  signUp: {
    name: {
      order: 1,
      isRequired: true,
      placeholder: "Name",
    },
    email: {
      order: 2,
      placeholder: "Enter your Email",
    },
    phone_number: {
      order: 3,
      placeholder: "Enter your Phone Number",
    },
    password: {
      order: 4,
    },
    confirm_password: {
      order: 5,
    },
  },
};

export function Login() {
  const mantineTheme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { authStatus, signOut } = useAuthenticator((context) => [context.authStatus]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "authenticated") {
      navigate("/dashboard");
    }
  }, [authStatus, navigate, signOut]);

  const theme: Theme = useMemo(
    () => ({
      name: "Manufac Amplify UI Theme",
      tokens: {
        colors: {
          brand: {
            primary: {
              "10": mantineTheme.colors[mantineTheme.primaryColor][1],
              "20": mantineTheme.colors[mantineTheme.primaryColor][2],
              "40": mantineTheme.colors[mantineTheme.primaryColor][4],
              "60": mantineTheme.colors[mantineTheme.primaryColor][6],
              "80": mantineTheme.colors[mantineTheme.primaryColor][7], // consistent color with rest of app.
              "90": mantineTheme.colors[mantineTheme.primaryColor][9],
            },
          },
        },
      },
      // Ref:https://ui.docs.amplify.aws/react/theming/dark-mode
      overrides: [
        {
          colorMode: "dark",
          tokens: {
            colors: {
              background: {
                primary: { value: mantineTheme.colors.dark[7] },
                secondary: { value: mantineTheme.colors.dark[6] },
              },
              font: {
                primary: { value: mantineTheme.colors.dark[0] },
                secondary: { value: mantineTheme.colors.dark[0] },
                focus: {
                  value: mantineTheme.colors[mantineTheme.primaryColor][7],
                },
              },
              border: {
                active: { value: mantineTheme.colors.dark[0] },
                hover: { value: mantineTheme.colors.dark[0] },
                focus: { value: mantineTheme.colors.dark[0] },
              },
            },
            components: {
              passwordfield: {
                button: {
                  _hover: {
                    backgroundColor: { value: "transparent" },
                    color: { value: mantineTheme.colors.dark[0] },
                  },
                  _focus: {
                    backgroundColor: { value: "transparent" },
                    color: { value: mantineTheme.colors.dark[0] },
                  },
                  _active: {
                    backgroundColor: { value: "transparent" },
                    color: { value: mantineTheme.colors.dark[0] },
                  },
                },
              },
              button: {
                link: {
                  _hover: {
                    backgroundColor: { value: "transparent" },
                  },
                  _focus: {
                    backgroundColor: { value: "transparent" },
                    color: { value: mantineTheme.colors[mantineTheme.primaryColor][7] },
                  },
                  _active: {
                    backgroundColor: { value: "transparent" },
                  },
                },
              },
            },
          },
        },
      ],
    }),
    [mantineTheme.colors, mantineTheme.primaryColor],
  );

  return (
    <ThemeProvider theme={theme} colorMode={colorScheme === "auto" ? "system" : colorScheme}>
      <Authenticator formFields={FormFields} />
    </ThemeProvider>
  );
}
