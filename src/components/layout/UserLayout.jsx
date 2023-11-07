import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import theme, { Colors } from '../../styles/theme';
import Footer from '../common/Footer';
import Header from '../common/Header';
import MyBreadcrumb from '../common/MyBreadcrumb';

const UserLayout = () => {
    return (
        <>
            <Header />
            <ThemeProvider theme={theme}>
                <Container
                    disableGutters
                    maxWidth="xl"
                    sx={{
                        background: Colors.light_gray,
                    }}
                >
                    <MyBreadcrumb />
                    <Outlet />
                </Container>
            </ThemeProvider>

            <Footer />
        </>
    )
}

export default UserLayout