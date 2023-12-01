import { FavoriteOutlined, Logout, Settings } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Avatar, Badge, Divider, ListItemButton, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
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
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
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


  return (
    <Component>
      <MyList type="row">
        {accountInfo ?
          <ListItemButton
            sx={{
              justifyContent: "center",
            }}
          >
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={() => { navigate("/customer/info") }}>
                <Stack direction="row" justifyContent="space-around" alignItems="center">
                  <Avatar sx={{ bgcolor: Colors.warning, mr: 1 }} />
                  {accountInfo.name}
                </Stack>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Cài đặt
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Menu>
            <ListItemIcon
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{
                justifyContent: "center",
                color: Colors.white,
              }}
            >
              <AccountCircleRoundedIcon />
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
            <FavoriteOutlined />
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </MyList>
    </Component >
  );
}
