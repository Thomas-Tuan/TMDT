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
                    background: "#000",
                }}
            >
                <Stack>
                    <UIProvider>
                        (
                        <Appbar />
                        <AppDrawer />
                        )
                    </UIProvider>
                </Stack>
            </Container>
        </ThemeProvider>
    )
}

export default Header