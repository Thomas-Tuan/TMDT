import { ChevronRight, DeleteOutline } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, Stack, TableContainer, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, clearCart, decreaseCart, getTotal, removeItem } from '../hooks/useReducer';
import { Colors } from '../styles/theme';


const Cart = () => {
    const cartList = useSelector(state => state.carts);
    const dispatch = useDispatch();

    const handleClear = () => {
        dispatch(clearCart());
    }

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
        <>
            <Typography my={2} textTransform="uppercase" textAlign="center" variant="h3" >
                Giỏ hàng của bạn
            </Typography>
            {cartList.cartItems.length === 0 ?
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
                        <Typography my={2} textTransform="uppercase" textAlign="center" variant="body1" >
                            Hiện đang có {cartList.cartItems.length} sản phẩm
                        </Typography>
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
                                            <TableCell component="th" scope="row">
                                                {item.price}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {item.price * item.cartQuantity}
                                            </TableCell>
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
                        <Stack sx={{
                            width: 1,
                            borderTop: `1px solid ${Colors.shaft}`,
                            paddingTop: "2rem",
                        }}
                            direction="row" justifyContent="space-between" alignItems="flex-start"  >
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
                            <Paper sx={{
                                width: 270,
                                mx: 2,
                                maxWidth: 1,
                            }} >
                                <Stack direction="row" justifyContent="space-evenly">
                                    <Typography variant='body1'>
                                        Tổng cộng:
                                    </Typography>
                                    <Typography variant='body1'>
                                        {cartList.cartTotalAmount}Đ
                                    </Typography>
                                </Stack>
                                <Button sx={{
                                    width: 1,
                                    height: 40,
                                    borderRadius: 3,
                                    marginTop: "1rem",
                                    letterSpacing: "1.15px",
                                    border: `0.5px solid ${Colors.shaft}`,
                                    color: `${Colors.dark_gray}`,
                                    background: "none",
                                    outline: "none",
                                    cursor: "pointer",
                                }} >
                                    Thanh toán ngay
                                </Button>
                                <Typography component={Link} to="/product" sx={{
                                    m: "0.75rem 0.75rem",
                                    color: `${Colors.shaft}`,
                                    display: "flex",
                                    alignItems: "center",

                                }} variant='subtitle1'>
                                    Tiếp tục mua sắm
                                    <ChevronRight />
                                </Typography>
                            </Paper>
                        </Stack>
                    </>
                )
            }

        </>
    )
}

export default Cart