import SearchIcon from "@mui/icons-material/Search";
import {
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText, Menu, MenuItem
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUIContext } from "../../context/ui";
import { Colors } from "../../styles/theme";

const Navbar = () => {
    const { setShowSearchBox } = useUIContext();
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const navigate = useNavigate();

    const handleNavigateToCart = () => {
        navigate('/product')
    }

    const handleClose = () => {
        setAnchorEl1(null);
        setAnchorEl2(null);
    };

    const proArr = [
        'Nến thơm',
        'Bình hoa',
        'Khay đèn',
        'Đồ pha lê',
        'Đồ nhà tắm',
        'Đồ nhà bếp',
        'Đồ trang trí'
    ];

    const branchArr = [
        'cire trvdon',
        'saint louis',
        'arcahorn   ',
        'riviere',
        'ralph lauren',
    ];

    function handleClick(e) {
        let value1 = "sản phẩm";
        let value2 = "thương hiệu";
        const innerText = e.currentTarget.innerText.toLowerCase();

        if (innerText.includes(value1)) {
            if (anchorEl1 !== e.currentTarget) {
                setAnchorEl1(e.currentTarget);
            }
            setAnchorEl2(null);
        } else if (innerText.includes(value2)) {
            if (anchorEl2 !== e.currentTarget) {
                setAnchorEl2(e.currentTarget);
            }
            setAnchorEl1(null);
        }
    }


    return (
        <>
            <ListItem component={Link} to="/">
                <ListItemText primary="Trang chủ" />
            </ListItem>
            <ListItem >
                <ListItemText onClick={handleClick}>
                    Sản phẩm
                    <Menu
                        anchorEl={anchorEl1}
                        open={Boolean(anchorEl1)}
                        onClose={handleClose}
                    >
                        {
                            proArr.map((item, idx) => {
                                return (
                                    <MenuItem
                                        sx={{
                                            textTransform: "uppercase", width: 200,
                                            borderBottom: item === proArr[proArr.length - 1] ? 0 : "1px solid #d9d9d9",
                                            fontWeight: "bold",
                                            p: 2,
                                        }}
                                        key={idx} onClick={() => {
                                            handleNavigateToCart();
                                            handleClose();
                                        }}>{item}</MenuItem>
                                );
                            })
                        }
                    </Menu>
                </ListItemText >
            </ListItem>
            <ListItem>
                <ListItemText onClick={handleClick}>
                    Thương hiệu
                    <Menu
                        anchorEl={anchorEl2}
                        open={Boolean(anchorEl2)}
                        onClose={handleClose}
                    >
                        {
                            branchArr.map((item, idx) => {
                                return (
                                    <MenuItem
                                        sx={{
                                            textTransform: "uppercase", width: 200,
                                            borderBottom: item === proArr[proArr.length - 1] ? 0 : "1px solid #d9d9d9",
                                            fontWeight: "bold",
                                            p: 2,
                                        }}
                                        key={idx} onClick={handleClose}>{item}</MenuItem>
                                );
                            })
                        }
                    </Menu>
                </ListItemText >
            </ListItem>
            <ListItem component={Link} to="/about"
            >
                <ListItemText primary="Giới thiệu" />
            </ListItem>
            <ListItem component={Link} to="/contact"
            >
                <ListItemText primary="Liên hệ" />
            </ListItem>
            <ListItemButton
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClick={() => setShowSearchBox(true)}>
                <ListItemIcon sx={{
                    minWidth: 1,
                    color: Colors.white,
                }}>
                    <SearchIcon />
                </ListItemIcon>
            </ListItemButton>
        </>


    );
};

export default Navbar;
