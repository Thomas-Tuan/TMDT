import { ChevronRight, DeleteOutline } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Stack, TableContainer, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, clearCart, decreaseCart, getTotal, removeItem } from '../Redux/Cart/CartSlice';
import { Colors } from '../styles/theme';


const Cart = () => {
    const cartList = useSelector(state => state.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClear = () => {
        dispatch(clearCart());
    }

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleIncrease = (product) => {
        dispatch(addItem(product));
    };

    const handleDecrease = (product) => {
        dispatch(decreaseCart(product));
    };

    const handleRemove = (product) => {
        dispatch(removeItem(product));
    };

    useEffect(() => {
        dispatch(getTotal());
    }, [cartList, dispatch])

    return (
        <Container maxWidth="lg" disableGutters>
            <Typography pt={4} textTransform="uppercase" textAlign="center" fontWeight={500} variant="h5" >
                Giỏ hàng của bạn
            </Typography>
            {
                cartList.cartItems.length === 0 ?
                    (
                        <>
                            <Typography my={2} textTransform="uppercase" textAlign="center" variant="body1" >
                                Không có sản phẩm nào trong giỏ hàng !!
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                my: 2,
                            }}>
                                <Button component={Link} to="/product" sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: `${Colors.shaft}`,
                                    width: 130,
                                }} variant='subtitle1'>
                                    Mua ngay
                                    <ChevronRight />
                                </Button>
                            </Box>
                        </>
                    ) :
                    (
                        <>
                            <Stack alignItems="center" justifyContent="center" >
                                <Typography my={2} textTransform="uppercase" textAlign="center" variant="body1" >
                                    Hiện đang có {cartList.cartItems.length} sản phẩm
                                </Typography>
                                <Button
                                    onClick={() => handleClear()}
                                    sx={{
                                        width: 130,
                                        maxWidth: 1,
                                        height: 40,
                                        borderRadius: 3,
                                        letterSpacing: "1.15px",
                                        border: `0.5px solid ${Colors.shaft}`,
                                        color: `${Colors.dark_gray}`,
                                        background: "none",
                                        outline: "none",
                                        cursor: "pointer",
                                    }} >
                                    Làm mới
                                </Button>
                            </Stack>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            borderBottom: `2px solid ${Colors.shaft}`,
                                        }}>
                                            <TableCell component="th" scope="row">
                                                Sản phẩm
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                Số lượng
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                Giá tiền
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                Tổng tiền
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                Chức năng
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cartList.cartItems.map((item, idx) => (
                                            <TableRow
                                                key={item.id}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                    borderBottom: `2px solid ${Colors.shaft}`,
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center">
                                                        <img style={{ marginRight: "16px" }} src={item.imgMain} alt='Product Img' height='60' width='60' />
                                                        {item.name}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Box sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        border: `0.5px solid ${Colors.shaft} `,
                                                        alignItems: "center",
                                                        width: 130,
                                                        maxWidth: 1,
                                                        borderRadius: 4,
                                                    }}>
                                                        <Button sx={{
                                                            '&:hover': {
                                                                backgroundColor: "transparent ",
                                                                color: `${Colors.danger}`
                                                            }
                                                        }}
                                                            onClick={() => handleDecrease(item)}>
                                                            -
                                                        </Button>
                                                        <Typography sx={{
                                                            padding: "0.7rem 0"
                                                        }} variant="body1"> {item.cartQuantity}</Typography>
                                                        <Button
                                                            sx={{
                                                                '&:hover': {
                                                                    backgroundColor: "transparent ",
                                                                    color: `${Colors.success}`
                                                                }
                                                            }}
                                                            onClick={() => handleIncrease(item)}>
                                                            +
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                                {
                                                    item.discount !== 0 ?
                                                        <>
                                                            <TableCell component="th" scope="row">
                                                                {formatNumber((item.price - item.discount))}<sup>Đ</sup>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                {formatNumber((item.price - item.discount) * item.cartQuantity)} <sup>Đ</sup>
                                                            </TableCell>
                                                        </>
                                                        :
                                                        <>
                                                            <TableCell component="th" scope="row">
                                                                {formatNumber(item.price)} <sup>Đ</sup>
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                {formatNumber((item.price * item.cartQuantity))} <sup>Đ</sup>
                                                            </TableCell>
                                                        </>
                                                }
                                                <TableCell component="th" scope="row">
                                                    <IconButton onClick={() => {
                                                        handleRemove(item)
                                                    }} >
                                                        <DeleteOutline fontSize="medium" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Stack my={2} alignItems="end" >
                                <Stack mb={2} alignItems="center" direction="row" justifyContent="space-between">
                                    <Typography variant='body1' fontWeight={400}>
                                        Tổng cộng:
                                    </Typography>
                                    <Typography variant='body1' fontWeight="bolder">
                                        {formatNumber(cartList.cartTotalAmount)} <sup>Đ</sup>
                                    </Typography>
                                </Stack>
                                <Stack alignItems="center" direction="row" justifyContent="space-between">
                                    <Button onClick={() => navigate('/checkout')}
                                        sx={{
                                            maxWidth: 1,
                                            mr: 2,
                                            height: 40,
                                            borderRadius: 3,
                                            letterSpacing: "1.15px",
                                            border: `0.5px solid ${Colors.shaft}`,
                                            color: `${Colors.dark_gray}`,
                                            background: "none",
                                            outline: "none",
                                            cursor: "pointer",
                                        }}>
                                        Tiến hành đặt hàng
                                        <ChevronRight />
                                    </Button>
                                    <Button onClick={() => navigate('/product')}
                                        sx={{
                                            maxWidth: 1,
                                            height: 40,
                                            mr: 2,
                                            borderRadius: 3,
                                            letterSpacing: "1.15px",
                                            border: `0.5px solid ${Colors.shaft}`,
                                            color: `${Colors.dark_gray}`,
                                            background: "none",
                                            outline: "none",
                                            cursor: "pointer",
                                        }}>
                                        Tiếp tục mua sắm
                                        <ChevronRight />
                                    </Button>
                                </Stack>
                            </Stack>
                        </>
                    )
            }
        </Container>
    )
}

export default Cart