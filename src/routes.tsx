import { createBrowserRouter } from "react-router-dom";
import { App } from "./app";
import { Dashboard } from "./pages/Dashboard";
import { ErrorPage } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
            <Home />
        ),
      },
      {
        path: "dashboard",
        element: (
            <Dashboard />
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
