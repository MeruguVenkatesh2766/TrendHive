import React, { lazy, Suspense } from "react";
import { Navigate, BrowserRouter as Router, useRoutes } from "react-router-dom";

const Layout = lazy(() => import("./components/dashboard"));
const DefaultDashboard = lazy(() =>
  import("./components/dashboard/index").then((mod) => ({
    default: mod.DefaultDashboard,
  }))
);
const Products = lazy(() => import("./components/products"));
const SignIn = lazy(() => import("./components/sign-In"));
const SignUp = lazy(() => import("./components/sign-up"));

const AppRoutes = ({ isLoggedIn, authAdmin }) =>
  useRoutes([
    // Routes outside the dashboard
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },

    // Dashboard routes
    {
      path: "/",
      element: isLoggedIn ? <Layout /> : <Navigate to="/sign-in" replace />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        { path: "products", element: <Products /> },
      ],
    },

    // Catch-all for undefined routes
    { path: "*", element: <div>Page Not Found</div> },
  ]);

export default AppRoutes;
