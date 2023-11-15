import { PanoramaHorizontalOutlined } from '@mui/icons-material';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import LabelIcon from '@mui/icons-material/Label';
import OtherHousesOutlined from '@mui/icons-material/OtherHousesOutlined';
import { Box, Divider, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ImagesBg } from '../../../../../asset';
import { Colors } from '../../../../../styles/theme';

const drawerWidth = 240;

const itemsMenu = [
    {
        title: "Dashboard",
        icon: <OtherHousesOutlined />,
        state: "dashboard",
        link: "/admin/dashboard"

    },
    {
        title: "User",
        icon: <AccountTreeRounded />,
        state: "user",
        link: "/admin/user"
    },
    {
        title: "Category",
        icon: <CategoryOutlined />,
        state: "category",
        link: "/admin/category"
    },
    {
        title: "Branch",
        icon: <PanoramaHorizontalOutlined />,
        state: "branch",
        link: "/admin/branch"
    },
    {
        title: "Product",
        icon: <LabelIcon />,
        state: "product",
        link: "/admin/product"
    },
]

const Sidebar = (props) => {
    const { window } = props;
    const matches = useMediaQuery('(min-width:900px)');

    const { open, handleDrawerClose, activeState } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
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
                            bgcolor: isActive ? Colors.light_gray : "",
                            color: isActive ? Colors.white : "",
                            "&:hover": {
                                bgcolor: isActive ? Colors.light_gray : "",
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

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: Colors.shaft,
                },
            }}
            variant={matches ? 'persistent' : 'temporary'}
            anchor="left"
            open={open}
            container={container}
            onClose={handleDrawerClose}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        backgroundImage: `url(${ImagesBg.logoBg})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100px',
                        height: '100px',
                    }}
                ></Box>
            </Toolbar>
            <List>
                {itemsMenu.map((item, idx) => (
                    <MyMenuItem
                        key={idx}
                        item={item}
                        isActive={item.state === activeState}>
                    </MyMenuItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
