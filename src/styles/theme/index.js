import { createTheme } from "@mui/material/styles";

export const DrawerWidth = 250;

export const Colors = {
  primary: "#5f2c3e",
  secondary: "#d1adcc",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  ///////////////
  // Grays
  ///////////////
  dim_grey: "#696969",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  light_gray: "rgb(230,230,230)",
  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.dark,
    },
    secondary: {
      main: Colors.light,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          "&:hover": {
            color: Colors.white,
            backgroundColor: Colors.warning,
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          background: Colors.dark,
        },
        arrow: {
          color: Colors.light,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: DrawerWidth,
          background: Colors.dark,
          color: Colors.light,
          borderRadius: '0px 100px 0px 0px',
          borderRight: `3px solid ${Colors.black}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: Colors.white
        }
      }
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 5
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          position: "relative",
          cursor: "pointer",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: "100%",
            borderBottom: "1px solid transparent",
            transition: "all 0.3s ease-in-out",
          },
          "&:hover": {
            color: Colors.white,
          },
          "&:hover::before": {
            borderColor: Colors.muted,
            width: "80%",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: Colors.muted,
          },
          "&:active": {
            backgroundColor: Colors.muted,
          },
        },
      },
    },
    MyShopButton: {
      styleOverrides: {
        root: {
          color: Colors.white,
        },
        primary: {
          background: Colors.primary,
          "&:hover": {
            background: Colors.primary
          },
        },
        secondary: {
          background: Colors.secondary,
          "&:hover": {
            background: Colors.primary
          },
        },
      },
    },
  },
});

export default theme;
