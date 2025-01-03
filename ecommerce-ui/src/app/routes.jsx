import { useRoutes, Outlet } from "react-router-dom";
import Home from "../pages/client/Home";
import Login from "../pages/client/Login";
import Signup from "../pages/client/Signup";
import { ProductList, ProductShow } from "../pages/client/Product";
import {
    CheckoutCart,
    CheckoutShipping,
    CheckoutPayment,
} from "../pages/client/Checkout";
import { OrderList, OrderShow, Profile } from "../pages/client/Settings";
import {
    Dashboard,
    ProductList as AdminProducts,
    OrderList as AdminOrders,
    CategoryList,
    UserList,
    CategoryAddForm,
    CategoryEditForm,
    ProductAddForm,
    ProductEditForm,
    OrderDetails,
} from "../pages/admin";

export default function AppRoutes({ authAdmin }) {
    return useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Signup />,
        },
        {
            path: "/products",
            element: <ProductList />,
        },
        {
            path: "/products/:productId",
            element: <ProductShow />,
        },
        {
            path: "/checkout/cart",
            element: <CheckoutCart />,
        },
        {
            path: "/checkout/shipping",
            element: <CheckoutShipping />,
        },
        {
            path: "/checkout/payment",
            element: <CheckoutPayment />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/orders",
            element: <OrderList />,
        },
        {
            path: "/orders/:orderId",
            element: <OrderShow />,
        },
        {
            path: "/admin/dashboard",
            element: <Dashboard authAdmin={authAdmin} />,
        },
        {
            path: "/admin/products",
            element: <AdminProducts authAdmin={authAdmin} />,
        },
        {
            path: "/admin/orders",
            element: <AdminOrders authAdmin={authAdmin} />,
        },
        {
            path: "/admin/categories",
            element: <CategoryList authAdmin={authAdmin} />,
        },
        {
            path: "/admin/users",
            element: <UserList authAdmin={authAdmin} />,
        },
        {
            path: "/admin/categories/add",
            element: <CategoryAddForm authAdmin={authAdmin} />,
        },
        {
            path: "/admin/products/add",
            element: <ProductAddForm authAdmin={authAdmin} />,
        },
        {
            path: "/admin/categories/edit/:categoryId",
            element: <CategoryEditForm authAdmin={authAdmin} />,
        },
        {
            path: "/admin/products/edit/:productId",
            element: <ProductEditForm authAdmin={authAdmin} />,
        },
        {
            path: "/admin/orders/edit/:orderId",
            element: <OrderDetails authAdmin={authAdmin} />,
        },
    ]);
}
