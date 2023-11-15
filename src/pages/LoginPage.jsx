import { Box, Grid, colors } from '@mui/material';
import React, { useState } from 'react';
import { ImagesBg } from '../asset';
import SignInForm from '../components/common/SigninForm';
import SignUpForm from '../components/common/SignupForm';

export const ScreenMode = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP"
};

const SigninPage = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState("unset");
  const [width, setWidth] = useState(0);

  const [backgroundImage, setBackgroundImage] = useState(ImagesBg.LoginBg);
  const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);

  const onSwitchMode = (mode) => {
    setWidth(100);

    const timeout1 = setTimeout(() => {
      setCurrMode(mode);
      setBackgroundImage(mode === ScreenMode.SIGN_IN ? ImagesBg.LoginBg : ImagesBg.RegisterBg);
    }, 1100);

    const timeout2 = setTimeout(() => {
      setLeft("unset");
      setRight(0);
      setWidth(0);
    }, 1200);

    const timeout3 = setTimeout(() => {
      setRight("unset");
      setLeft(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4} sx={{ position: "relative", padding: 3 }}>
        {
          currMode === ScreenMode.SIGN_IN ? (
            <SignInForm onSwitchMode={onSwitchMode} />
          ) : (
            <SignUpForm onSwitchMode={onSwitchMode} />
          )
        }
        <Box sx={{
          position: "absolute",
          top: 0,
          left: left,
          right: right,
          width: `${width}%`,
          height: "100%",
          bgcolor: colors.grey[800],
          transition: "all 1s ease-in-out"
        }} />
      </Grid>
      <Grid item xs={12} md={8} sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <Box sx={{
          position: "absolute",
          top: 0,
          left: left,
          right: right,
          width: `${width}%`,
          height: "100%",
          bgcolor: colors.common.white,
          transition: "all 1s ease-in-out"
        }} />
      </Grid>
    </Grid>
  );
};

export default SigninPage;