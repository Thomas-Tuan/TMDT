import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserRequireAuth = () => {
    const location = useLocation();
    const getUserSession = sessionStorage.getItem('userAccount');
    const accountInfo = JSON.parse(getUserSession);

    if (accountInfo) {
        return <Outlet />;
    }
    else {
        toast.error("Chưa đăng nhập tài khoản !!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}

export default UserRequireAuth