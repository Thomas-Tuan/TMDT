import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { AuthProvider } from "../context/auth";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import UserProductDetail from "../pages/Product/ProductDetail";
import UserProductList from "../pages/Product/ProductList";
import SuccessPage from "../pages/SuccessPage";
import theme, { Colors } from "../styles/theme";

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
                        <Routes >
                            <Route path="/TMDT/" element={<HomePage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/product" element={<UserProductList />} />
                            <Route path="/product/:id" element={<UserProductDetail />} />
                            <Route path="/login" element={<SigninPage />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/success/*" element={<SuccessPage />} />
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