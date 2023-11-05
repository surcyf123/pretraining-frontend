import { createBrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Dashboard } from "./pages/Dashboard";
import { ErrorPage } from "./pages/ErrorPage";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
