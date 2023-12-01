import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';


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

const UserMainLayout = () => {

  const activeState = "information";
  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth='lg' disableGutters>
        <Grid my={2} container  >
          <Grid item xs={12} md={3} sm={12} >
            <Sidebar
              activeState={activeState}
            />
          </Grid>
          <Grid item xs={12} md={9} sm={12} >
            <Main>
              <Outlet />
            </Main>
          </Grid>
        </Grid >
      </Container >
    </Box>
  );
}

export default UserMainLayout;
