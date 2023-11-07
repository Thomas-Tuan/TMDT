import { FavoriteOutlined } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Badge, Divider, ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
import { Colors } from "../../styles/theme";

export default function Actions({ matches }) {
  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  const { cartTotalQuantity } = useSelector(state => state.carts)


  return (
    <Component>
      <MyList type="row">
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              color: Colors.white,
            }}
          >
            <Badge component={Link} to="/cart" badgeContent={cartTotalQuantity} color="primary">
              <ShoppingBagOutlinedIcon />
            </Badge>
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              color: Colors.white,
            }}
          >
            <AccountCircleRoundedIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
        <ListItemButton
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              color: Colors.white,
            }}
          >
            <FavoriteOutlined />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
    </Component >
  );
}
