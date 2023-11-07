import { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";
import Loadable from "../admin/components/common/Loading/Loadable";
import AppLayout from "../admin/components/layout/AppLayout";
import MainLayout from '../admin/components/layout/MainLayout/';
import BranchList from '../admin/pages/Branch/BranchList';
import CategoriesList from '../admin/pages/Categories/CategoriesList';
import DashboardPage from "../admin/pages/Dashboard/DashboardPage";
import AddEditProduct from '../admin/pages/Product/AddEditProduct';
import ProductList from '../admin/pages/Product/ProductList';
import NotFound from "../components/layout/NotFound";
import UserLayout from "../components/layout/UserLayout";
import About from "../pages/About";
import Cart from '../pages/Cart';
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import UserProductDetail from '../pages/Product/ProductDetail';
import UserProductList from '../pages/Product/ProductList';
const AdminLogin = Loadable(lazy(() => import('../admin/pages/Login/LoginAdmin')));


export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "product",
                element: <UserProductList />,
            },
            {
                path: 'product/:id',
                element: <UserProductDetail />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "cart",
                element: <Cart />
            },
        ]
    },

    {
        path: "/admin",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <AdminLogin />,
                name: "adminLogin"
            },
            {
                path: "dashboard",
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                        name: "dashboard"
                    }
                ]
            },
            {
                path: "category",
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <CategoriesList />,
                        name: "category"
                    },
                ]
            },
            {
                path: "branch",
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <BranchList />,
                        name: "branch"
                    },
                ]
            },
            {
                path: "product",
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <ProductList />
                    },
                    {
                        path: 'add',
                        element: <AddEditProduct />,
                        name: "add"
                    },
                    {
                        path: 'edit/:id',
                        element: <AddEditProduct />,
                        name: "edit"
                    },
                ]
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
])