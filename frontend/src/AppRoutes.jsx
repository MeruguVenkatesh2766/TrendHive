import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const ECommerceDashboard = lazy(() => import("./components/dashboard"));
const DefualtDashboard = lazy(() =>
  import("./components/dashboard/index").then((mod) => ({
    default: mod.DefualtDashboard,
  }))
);
const Products = lazy(() => import("./components/products"));
const SignIn = lazy(() => import("./components/sign-In"));
const SignUp = lazy(() => import("./components/sign-up"));

const AppRoutes = () =>
  useRoutes([
    // Routes outside the dashboard
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },

    // Dashboard routes
    {
      path: "/",
      element: <ECommerceDashboard />,
      children: [
        { index: true, element: <DefualtDashboard /> },
        { path: "products", element: <Products /> },
      ],
    },

    // Catch-all for undefined routes
    { path: "*", element: <div>Page Not Found</div> },
  ]);

export default function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
  );
}
