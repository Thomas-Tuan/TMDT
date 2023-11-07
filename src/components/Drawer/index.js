import CloseIcon from "@mui/icons-material/Close";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  styled
} from "@mui/material";
import { useUIContext } from "../../context/ui";
import { DrawerCloseButton } from "../../styles/appbar";
import { Colors } from "../../styles/theme";
import { Link } from "react-router-dom";

const MiddleDivider = styled((props) => (
  <Divider variant="middle" {...props} />
))``;


export default function AppDrawer() {
  const { drawerOpen, setDrawerOpen } = useUIContext();

  return (
    <>
      {drawerOpen && (
        <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: "2.5rem",
              color: Colors.light,
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer open={drawerOpen}>
        <List>
          <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/">
            <ListItemText >Home</ListItemText>
          </ListItemButton>
          <MiddleDivider />
          <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/product">
            <ListItemText>Sản phẩm</ListItemText>
          </ListItemButton>
          <MiddleDivider />
          <MiddleDivider />
          <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/about">
            <ListItemText>Giới thiệu</ListItemText>
          </ListItemButton>
          <MiddleDivider />
          <ListItemButton onClick={() => setDrawerOpen(false)} component={Link} to="/contact">
            <ListItemText>Liên hệ</ListItemText>
          </ListItemButton>
          <MiddleDivider />
        </List>
      </Drawer>
    </>
  );
}
