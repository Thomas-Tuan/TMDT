import { Container, Stack, ThemeProvider } from '@mui/material';
import React from 'react';
import { UIProvider } from "../../context/ui";
import theme from "../../styles/theme";
import AppDrawer from '../Drawer';
import Appbar from "../appbar";

const Header = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container
                disableGutters
                maxWidth="xl"
                sx={{
                    height: 100,
                }}
            >
                <Stack sx={{
                    width: 1,
                    background: "#000",
                    position: { md: 'fixed', xs: 'static' },
                    zIndex: { md: 5, xs: 'auto' },
                }}>
                    <UIProvider>
                        <Appbar />
                        <AppDrawer />
                    </UIProvider>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Header