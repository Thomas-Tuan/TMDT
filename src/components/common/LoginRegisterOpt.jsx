import { Divider, Stack } from '@mui/material';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createButton } from "react-social-login-buttons";
import { toast } from 'react-toastify';
import { LoginSocialFacebook } from 'reactjs-social-login';
import loginApi from '../../api/loginApi';
import { createSvgIcon } from "react-social-login-buttons";

const fbIcon = createSvgIcon(() => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
        <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
    </svg>
));

const LoginRegisterOpt = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = async (credentialResponse) => {
        const userInfo = jwtDecode(credentialResponse.credential);
        const { name, email } = userInfo;
        const newUserInfo = { name, email, Role: 'User' }
        const response = await loginApi.signInWithGoogle(newUserInfo)
        sessionStorage.setItem('userAccount', JSON.stringify(response));
        toast.success("Đăng nhập thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate(from, { replace: true });
    }

    const handleFacebookLogin = async (response) => {
        const userInfo = response.data;
        const { name, email } = userInfo;
        const newUserInfo = { name, email, Role: 'User' }
        const result = await loginApi.signInWithGoogle(newUserInfo)
        sessionStorage.setItem('userAccount', JSON.stringify(result));
        toast.success("Đăng nhập thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        navigate(from, { replace: true });
    }

    const config = {
        text: "Đăng nhập",
        icon: createSvgIcon(fbIcon),
        iconFormat: name => `fa fa-${name}`,
        style: { background: "#3b5998", borderRadius: 5 },
        activeStyle: { background: "#293e69" }
    };
    const MyFacebookLoginButton = createButton(config);

    return (
        <>
            <Divider sx={{ my: 1 }} textAlign="center">HOẶC</Divider>
            <Stack direction="row" justifyContent="center" alignItems="center">
                <GoogleOAuthProvider clientId="631222853000-b10jbl79i9j48pdtq0085h7qb0i2idji.apps.googleusercontent.com">
                    <GoogleLogin
                        text='signin'
                        shape='rectangular'
                        theme='filled_blue'
                        onSuccess={handleGoogleLogin}
                    />
                </GoogleOAuthProvider>
                <LoginSocialFacebook
                    appId='652320020381215'
                    onResolve={handleFacebookLogin}>
                    <MyFacebookLoginButton />
                </LoginSocialFacebook>
            </Stack>
        </>
    )
}

export default LoginRegisterOpt