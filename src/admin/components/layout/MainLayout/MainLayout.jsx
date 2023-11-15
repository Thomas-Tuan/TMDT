import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Appbar from './Appbar';
import Sidebar from './Sidebar';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const MainLayout = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const activeState = "dashboard";
  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        activeState={activeState}
      />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}

export default MainLayout;
