import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../admin/components/common/RequireAuth";
import MainLayout from "../admin/components/layout/MainLayout/MainLayout";
import BranchList from "../admin/pages/Branches/BranchList";
import CategoriesList from "../admin/pages/Categories/CategoriesList";
import DashboardPage from "../admin/pages/Dashboard/DashboardPage";
import AdminLogin from "../admin/pages/Login/LoginAdmin";
import AddEditProduct from "../admin/pages/Products/AddEditProduct";
import ProductsList from "../admin/pages/Products/ProductList";
import AddEditUser from "../admin/pages/Users/AddEditUser";
import UsersList from "../admin/pages/Users/UserList";
import { AuthProvider } from "../context/auth";
import NotFound from "../pages/NotFound";
import OrdersList from "../admin/pages/Orders/OrderList";
import EditOrder from "../admin/pages/Orders/EditOrder";

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
                        <Route path="/user" element={<MainLayout />} >
                            < Route index element={<UsersList />} />
                            <Route path="create" element={<AddEditUser />} />
                            <Route path="edit/:id" element={<AddEditUser />} />
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
                        <Route path="/order" element={<MainLayout />}>
                            <Route index element={<OrdersList />} />
                            <Route path="edit/:id" element={<EditOrder />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default AdminRoutes