import { FavoriteOutlined } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Badge, Divider, ListItemButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList } from "../../styles/appbar";
import { Colors } from "../../styles/theme";

export default function Actions({ matches }) {
  const Component = matches ? ActionIconsContainerMobile : ActionIconsContainerDesktop;
  const { cartTotalQuantity } = useSelector(state => state.carts)
  const navigate = useNavigate();

  const getSession = sessionStorage.getItem('userAccount')
  const accountInfo = JSON.parse(getSession);

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    sessionStorage.removeItem('userAccount');
    toast.success("Đăng xuất thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate('/');
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Thông tin tài khoản</MenuItem>
      <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
    </Menu>
  );

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
        {accountInfo ?
          <ListItemButton
            onClick={handleProfileMenuOpen}
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
              <Stack direction="row" justifyContent="center" alignItems="center">
                <AccountCircleRoundedIcon />
                <Typography>
                  {accountInfo.name}
                </Typography>
              </Stack>
            </ListItemIcon>
          </ListItemButton>
          : <ListItemButton
            component={Link} to='/login'
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
              <Stack direction="row" justifyContent="center" alignItems="center">
                <AccountCircleRoundedIcon />
              </Stack>
            </ListItemIcon>
          </ListItemButton>
        }
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
      {renderMenu}
    </Component >
  );
}
