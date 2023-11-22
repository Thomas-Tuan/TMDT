import { ChevronRight, DeleteOutline } from '@mui/icons-material';
import { Box, Button, Container, FormControl, FormControlLabel, Grid, IconButton, InputLabel, Paper, Radio, RadioGroup, Stack, TableContainer, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { addItem, clearCart, decreaseCart, getTotal, removeItem } from '../Redux/Cart/CartSlice';
import orderApi from '../api/orderApi';
import { Colors } from '../styles/theme';

const initialValues = {
    cusName: "",
    Gender: 0,
    Email: "",
    Phone: "",
};

const Cart = () => {
    const cartList = useSelector(state => state.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getSession = sessionStorage.getItem('userAccount');
    const newAccountObject = JSON.parse(getSession);

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

    const validationSchema = Yup.object().shape({
        cusName: Yup.string().required('Không được bỏ trống'),
        Phone: Yup.string().required('Không được bỏ trống')
            .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các ký tự số'),
        Email: Yup.string(),
        Gender: Yup.number(),
    });
    const handleSubmit = async (values) => {
        var currentDate = new Date();
        const newOrder =
        {
            ...values,
            Status: 0,
            customerId: newAccountObject ? newAccountObject.customerId : null,
            Total: cartList.cartTotalAmount,
            Date: currentDate.toISOString(),
            Products: cartList.cartItems
        }
        try {
            const orderResult = await orderApi.create(newOrder);
            toast.success('Đặt hàng thành công', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            handleClear();
            const params = { orderId: orderResult.id, status: 'success' };

            navigate('/success', { state: params });
        }
        catch (err) {
            console.log(`Lỗi đặt hàng :${err}`)
        }
    }

    useEffect(() => {
        dispatch(getTotal());
    }, [cartList, dispatch])


    return (
        <Container maxWidth="lg" disableGutters>
            <Typography my={2} textTransform="uppercase" textAlign="center" variant="h3" >
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
                                                <TableCell component="th" scope="row">
                                                    {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {(item.price * item.cartQuantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
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
                        </>
                    )
            }
            {cartList.cartItems.length !== 0 &&
                <Grid my={2} container spacing={1}>
                    <Grid item xs={6}>
                        <Paper  >
                            <Typography mb={2} textAlign="center" variant='h5'>
                                Thông tin đặt hàng
                            </Typography>
                            <Typography variant='body1'>
                                Thông tin người đặt
                            </Typography>
                            <Formik validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={handleSubmit} >
                                {({ values, handleChange, handleBlur }) => {
                                    return (
                                        <Form>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            name="Gender"
                                                            value={values.Gender}
                                                            onChange={handleChange}
                                                        >
                                                            <Stack direction="row" justifyContent="flex-start" alignItems="center">
                                                                {
                                                                    ['Anh', "Chị"].map((item, idx) => (
                                                                        <FormControlLabel key={idx} value={idx} control={<Radio />} label={item} />
                                                                    ))
                                                                }
                                                            </Stack>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}  >
                                                    <InputLabel >Tên khách hàng</InputLabel>
                                                    <Field
                                                        fullWidth
                                                        value={values.Name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="cusName"
                                                        as={TextField}>
                                                    </Field>
                                                    <Typography variant='body1' style={{ color: 'red' }}>
                                                        <ErrorMessage name="cusName" component="span" />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={6}  >
                                                    <InputLabel >Số điện thoại</InputLabel>
                                                    <Field
                                                        fullWidth
                                                        value={values.Phone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="Phone"
                                                        as={TextField}>
                                                    </Field>
                                                    <Typography variant='body1' style={{ color: 'red' }}>
                                                        <ErrorMessage name="Phone" component="span" />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={12}  >
                                                    <InputLabel sx={{ letterSpacing: '1px' }} >Email(Không bắt buộc)</InputLabel>
                                                    <Field
                                                        fullWidth
                                                        value={values.Email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="Email"
                                                        as={TextField}>
                                                    </Field>
                                                    <Typography variant='body1' style={{ color: 'red' }}>
                                                        <ErrorMessage name="Email" component="span" />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={12} alignItems="center">
                                                    <Button color="primary" variant="contained" fullWidth type="submit">
                                                        Tiến hành đặt hàng
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )
                                }
                                }
                            </Formik>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}>

                        <Box sx={{
                            width: 270,
                            mx: 2,
                            maxWidth: 1,
                        }} >
                            <Stack direction="row" justifyContent="space-evenly">
                                <Typography variant='body1' fontWeight={400}>
                                    Tổng cộng:
                                </Typography>
                                <Typography variant='body1' fontWeight="bolder">
                                    {isNaN(cartList.cartTotalAmount) ? 'Loading...' : cartList.cartTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
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
                        </Box>
                    </Grid>

                </Grid>
            }
        </Container>
    )
}

export default Cart