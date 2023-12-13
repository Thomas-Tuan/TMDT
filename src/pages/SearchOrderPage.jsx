import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import orderApi from '../api/orderApi'
import MyBreadcrumb from '../components/common/MyBreadcrumb'
import { Colors } from '../styles/theme'

const headCells = [
    {
        Id: "stt",
        Title: "STT",
    },
    {
        Id: "productName",
        Title: "Tên sản phẩm",
    },
    {
        Id: "productPrice",
        Title: "Giá tiền",
    },
    {
        Id: "Quantity",
        Title: "Số lượng đặt",
    },
]

const SearchOrderPage = () => {
    const [orderInfo, setOrderInfo] = useState('');
    const [getOrderDetail, setGetOrderDetail] = useState({})

    const handleCheckOrderId = async (value) => {
        try {
            if (
                value.trim() === ""
            ) {
                alert("vui lòng nhập mã đơn hàng trước !!");
                return;
            }
            const response = await orderApi.get(value.trim());
            setGetOrderDetail(response);
        }
        catch (err) {
            if (err.response && err.response.data !== undefined) {
                toast.error(err.response.data.errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(`Error to check orderId with ${err.response.data.errorMessage}`);
            }
        }
    };

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <Container disableGutters maxWidth="lg">
            <Box my={2}>
                <MyBreadcrumb />
                <Typography my={2} textTransform="uppercase" textAlign="center" fontWeight={500} variant="h6" >
                    Tra cứu thông tin đơn hàng
                </Typography>
                <Container disableGutters maxWidth="sm">
                    <Stack spacing={3} direction="row" justifyContent="center" alignItems="center">
                        <TextField label="Mã đơn hàng"
                            fullWidth
                            onChange={(e) => {
                                setGetOrderDetail({});
                                setOrderInfo(e.target.value);
                            }}
                            name="orderId" />
                        <Button sx={{
                            width: 150,
                            borderRadius: 1,
                            letterSpacing: "1.15px",
                            border: `0.5px solid ${Colors.shaft}`,
                            color: `${Colors.dark_gray}`,
                            background: "none",
                            outline: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                            onClick={() => handleCheckOrderId(orderInfo)}
                        >
                            <SearchIcon fontSize="medium" />
                            Kiểm tra
                        </Button>
                    </Stack>
                </Container>
                {(Object.keys(getOrderDetail).length !== 0) &&
                    <>
                        <Typography mt={2} variant="h5" align="center" paragraph fontWeight="bold">
                            Chi tiết đơn hàng {orderInfo}
                        </Typography>
                        <TableContainer >
                            <Table sx={{
                                minWidth: 650,
                                overflow: "auto",
                                padding: '20px',
                                border: '2px solid #2196F3',
                                backgroundColor: '#E3F2FD',
                            }}
                                aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((item, idx) => (
                                            <TableCell key={item.Id}>
                                                {item.Title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getOrderDetail.orderDetails && (
                                        getOrderDetail.orderDetails.map((item, idx) => (
                                            <TableRow
                                                key={idx}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="left">{idx + 1}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="center">
                                                        <img style={{ marginRight: "16px" }} src={item.image} alt='Product Img' height='60' width='60' />
                                                        {item.productName}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {formatNumber(item.productPrice)} <sup>Đ</sup>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {item.quantity}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography my={2} variant='h5' textAlign="center" fontWeight="bold">
                            Thông tin đơn hàng
                        </Typography>
                        <Paper elevation={3}
                            sx={{
                                padding: '20px',
                                border: '2px solid #2196F3',
                                backgroundColor: '#E3F2FD',
                            }}>
                            <Grid container spacing={2}>
                                {getOrderDetail.customerId !== null &&
                                    <Grid item xs={12}>
                                        <Stack direction="row" justifyContent="center" alignItems="center">
                                            <Typography mr={5} variant='body1'>
                                                Mã khách hàng
                                            </Typography>
                                            <Typography variant='body1' fontWeight="bold">
                                                {getOrderDetail.customerId}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                }
                                <Grid item xs={12}  >
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Typography mr={5} variant='body1'>
                                            Tên người nhận
                                        </Typography>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: 'center',
                                            flexDirection: "column"
                                        }}>
                                            <Typography mr={5} variant='body1'>
                                                {getOrderDetail.gender === 0 ? 'Anh' : 'Chị'}
                                            </Typography>
                                            <Typography variant='body1' fontWeight="bold">
                                                {getOrderDetail.cusName}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}  >
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Typography mr={5} variant='body1'>
                                            Số điện thoại
                                        </Typography>
                                        <Typography variant='body1' fontWeight="bold">
                                            {getOrderDetail.phone}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        {getOrderDetail.email !== '' &&
                                            <>
                                                <Typography mr={5} variant='body1'>
                                                    Email
                                                </Typography>
                                                <Typography variant='body1' fontWeight="bold">
                                                    {getOrderDetail.email}
                                                </Typography>
                                            </>
                                        }
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <Typography mr={5} variant='body1'>
                                            Trạng thái đơn hàng
                                        </Typography>
                                        <Typography variant='body1' fontWeight="bold">
                                            {getOrderDetail.status === 0 ? "Đang chờ duyệt"
                                                : getOrderDetail.status === 1 ? "Đã thanh toán"
                                                    : getOrderDetail.status === 2 ? "Đã duyệt"
                                                        : "Đã hủy"
                                            }
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
                }
            </Box>
        </Container>
    )
}

export default SearchOrderPage