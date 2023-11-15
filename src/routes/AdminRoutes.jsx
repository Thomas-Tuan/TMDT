import React from "react";
import { Route, Routes } from "react-router-dom";
import BranchList from "../admin/pages/Branch/BranchList";
import CategoriesList from "../admin/pages/Categories/CategoriesList";
import DashboardPage from "../admin/pages/Dashboard/DashboardPage";
import AddEditProduct from "../admin/pages/Product/AddEditProduct";
import NotFound from "../pages/NotFound";
import MainLayout from "../admin/components/layout/MainLayout/MainLayout";
import ProductsList from "../admin/pages/Product/ProductList";
import AdminLogin from "../admin/pages/Login/LoginAdmin";
import RequireAuth from "../admin/components/common/RequireAuth";
import { AuthProvider } from "../context/auth";

const AdminRoutes = () => {
    return (
        <div>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<AdminLogin />} />
                    <Route element={<RequireAuth />} >
                        <Route path="/" element={<MainLayout />} >
                            < Route index element={<DashboardPage />} />
                        </Route>
                        <Route path="/dashboard" element={<MainLayout />} >
                            < Route index element={<DashboardPage />} />
                        </Route>
                        <Route path="/branch" element={<MainLayout />} >
                            < Route index element={<BranchList />} />
                        </Route>
                        <Route path="/category" element={<MainLayout />} >
                            <Route index element={<CategoriesList />} />
                        </Route>
                        <Route path="/product" element={<MainLayout />}>
                            <Route index element={<ProductsList />} />
                            <Route path="create" element={<AddEditProduct />} />
                            <Route path="edit/:id" element={<AddEditProduct />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default AdminRoutes