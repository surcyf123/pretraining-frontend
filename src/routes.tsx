import { createBrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Dashboard } from "./pages/Dashboard";
import { ErrorPage } from "./pages/ErrorPage";
import { General } from "./pages/General";
import { Home } from "./pages/Home";
import { Subnet } from "./pages/Subnet";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "general",
        element: <General />,
      },
      {
        path: "login",
        element: <Dashboard />,
      },
      {
        path: "subnet/:netuid", // Ref: https://reactrouter.com/en/main/route/route
        element: <Subnet />,
      },
    ],
  },
]);
