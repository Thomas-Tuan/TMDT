import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import FBChat from "../components/common/FBChat";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import UserMainLayout from "../components/layout/UserMainLayout";
import { AuthProvider } from "../context/auth";
import About from "../pages/About";
import AccountPage from "../pages/AccountInfo/AccountPage";
import FavouritePage from "../pages/AccountInfo/FavouritePage";
import OrderList from "../pages/AccountInfo/OrderList";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import ChangePassword from "../pages/ForgotPass/ChangePassword";
import ConfirmOtp from "../pages/ForgotPass/ConfirmOtp";
import ForgotPassword from "../pages/ForgotPass/ForgotPassword";
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import UserProductDetail from "../pages/Product/ProductDetail";
import UserProductList from "../pages/Product/ProductList";
import SuccessPage from "../pages/SuccessPage";
import UserRequireAuth from "../pages/UserRequireAuth";
import theme, { Colors } from "../styles/theme";
import UserOrderDetail from "../pages/AccountInfo/UserOrderDetail";
import ResetPass from "../pages/AccountInfo/ResetPass";
import CheckoutPage from "../pages/CheckoutPage";

const CustomerRoutes = () => {
    return (
        <div>
            <AuthProvider>
                <div>
                    <Header />
                </div>
                <ThemeProvider theme={theme}>
                    <Container
                        disableGutters
                        maxWidth="xl"
                        sx={{
                            background: Colors.light_gray,
                        }}
                    >
                        <div>
                            <FBChat />
                        </div>
                        <Routes >
                            <Route path="/TMDT/" element={<HomePage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/about" element={<About />} />

                            <Route path="/contact" element={<Contact />} />
                            <Route path="/product" element={<UserProductList />} />
                            <Route path="/product/:id" element={<UserProductDetail />} />
                            <Route path="/login" element={<SigninPage />} />

                            <Route path="/resetPass" element={<ForgotPassword />} />
                            <Route path="/confirmOTP" element={<ConfirmOtp />} />
                            <Route path="/confirmPass" element={<ChangePassword />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route element={<UserRequireAuth />} >
                                <Route path="/customer" element={<UserMainLayout />} >
                                    <Route path="info" element={<AccountPage />} />
                                    <Route path="favourite" element={<FavouritePage />} />
                                    <Route path="resetPass" element={<ResetPass />} />
                                    <Route path="orderList" element={<OrderList />} />
                                    <Route path="orderList/edit/:id" element={<UserOrderDetail />} />
                                </Route>
                            </Route>
                            <Route path="/success" element={<SuccessPage />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                </ThemeProvider>
                <div>
                    <Footer />
                </div>
            </AuthProvider>
        </div>
    )
}

export default CustomerRoutes