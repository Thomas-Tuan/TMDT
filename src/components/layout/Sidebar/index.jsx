import { AccountCircleRounded, FavoriteOutlined, FilterFrames, LockOutlined, Logout } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Colors } from '../../../styles/theme';
import { toast } from 'react-toastify';


const itemsMenu = [
    {
        title: "Thông tin chi tiết",
        icon: <AccountCircleRounded />,
        state: "information",
        link: "/customer/info"
    },
    {
        title: "Yêu thích",
        icon: <FavoriteOutlined />,
        state: "liked",
        link: "/customer/favourite"
    },
    {
        title: "Đơn hàng",
        icon: <FilterFrames />,
        state: "order",
        link: "/customer/orderList"
    },
    {
        title: "Cập nhật mật khẩu",
        icon: <LockOutlined />,
        state: "user",
        link: "/customer/resetPass"
    },
]

const Sidebar = (props) => {
    const navigate = useNavigate();
    const { activeState } = props;
    const MyMenuItem = (props) => {
        const location = useLocation();
        const isActive = location.pathname === props.item.link;
        return (
            <>
                <Divider sx={{ my: 1 }} />
                <NavLink to={props.item.link}>
                    <ListItem key={props.index} disableGutters disablePadding sx={{
                        px: 0.5
                    }}>
                        <ListItemButton sx={{
                            borderRadius: "10px",
                            bgcolor: isActive ? Colors.warning : "",
                            color: isActive ? Colors.white : "",
                            "&:hover": {
                                bgcolor: isActive ? "#1de9b6" : "#1de9b6",
                                color: isActive ? Colors.white : "",
                            }
                        }}>
                            <ListItemIcon sx={{
                                minWidth: "40px",
                                color: Colors.white,

                            }}>
                                {props.item.icon}
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography fontWeight={600} sx={{
                                    color: Colors.white
                                }}>
                                    {props.item.title}
                                </Typography>
                            } />
                        </ListItemButton>
                    </ListItem>
                </NavLink >
            </>
        )
    }

    const handleLogOut = () => {
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
        <List sx={{
            borderRadius: 2,
            bgcolor: "#ff9100"
        }}>
            {itemsMenu.map((item, idx) => (
                <MyMenuItem
                    key={idx}
                    item={item}
                    isActive={item.state === activeState}>
                </MyMenuItem>
            ))}
            <Divider sx={{ my: 1 }} />
            <ListItem disableGutters disablePadding sx={{
                px: 0.5
            }}>
                <ListItemButton sx={{
                    borderRadius: "10px",
                    color: Colors.white,
                    "&:hover": {
                        bgcolor: "#1de9b6",
                        color: Colors.white,
                    }
                }}
                    onClick={() => handleLogOut()}>
                    <ListItemIcon sx={{
                        minWidth: "40px",
                        color: Colors.white,

                    }}>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography fontWeight={600} sx={{
                            color: Colors.white
                        }}>
                            Đăng xuất
                        </Typography>
                    } />
                </ListItemButton>
            </ListItem>
        </List>
    );
}

export default Sidebar;
