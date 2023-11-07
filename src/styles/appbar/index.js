import { IconButton, List } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Colors, DrawerWidth } from "../theme";


export const AppbarContainer = styled(Box)(() => ({
  display: 'flex',
  marginTop: 4,
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2px 8px'
}));


export const ActionIconsContainerMobile = styled(Box)(() => ({
  display: 'flex',
  background: Colors.shaft,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: '100%',
  alignItems: 'center',
  zIndex: 99,
  borderTop: `1px solid ${Colors.border}`
}));

export const ActionIconsContainerDesktop = styled(Box)(() => ({
  flexGrow: 0,
}));

export const MyList = styled(List)(({ type }) => ({
  display: type === "row" ? "flex" : "block",
  flexGrow: 2,
  color: Colors.light,
  textTransform: "uppercase",
  justifyContent: "center",
  alignItems: "center",
}));



export const DrawerCloseButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 10,
  left: DrawerWidth,
  zIndex: 1999,
}));