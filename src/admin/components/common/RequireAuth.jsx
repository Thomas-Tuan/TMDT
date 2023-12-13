import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const RequireAuth = () => {
    const location = useLocation();
    const getAdminSession = sessionStorage.getItem('adminAccount');
    const accountInfo = JSON.parse(getAdminSession);

    if (accountInfo && !accountInfo.isLock) {
        return <Outlet />;
    }
    else if (accountInfo === null) {
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
    else {
        toast.warning("Tài khoản đang bị khóa !!!", {
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