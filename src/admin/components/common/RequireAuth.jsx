import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const getAdminSession = sessionStorage.getItem('adminAccount');
    const accountInfo = JSON.parse(getAdminSession);
    const checkedRoles = () => {
        if (auth) {
            return auth.roles?.every((role) => role.toLowerCase().includes("admin"))
        }
    };
    if (checkedRoles() === true || accountInfo) {
        return <Outlet />;
    }
    else if (checkedRoles() === undefined) {
        toast.error("Vui lòng đăng nhập trước !!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    else {
        toast.error("Tài khoản không có quyền truy cập trang quản trị !!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
}

export default RequireAuth