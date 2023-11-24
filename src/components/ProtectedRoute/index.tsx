import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

export function ProtectedRoute({ children }: PropsWithChildren): JSX.Element {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  let output: JSX.Element;

  console.log("authStatus", authStatus);

  if (authStatus === "authenticated") {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    output = <>{children}</>;
  } else {
    output = <Navigate to="/login" />;
  }
  return output;
}
