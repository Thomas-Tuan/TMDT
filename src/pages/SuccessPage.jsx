import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../api/orderApi';

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

const SuccessPage = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    let order_id, checkVnPayIsSuccess, checkPaypalIsSuccess, getVnPayInfo;
    const params = location.state === null ? null : location.state;

    const [getOrderDetail, setGetOrderDetail] = useState({})
    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    if (params === null) {
        order_id = searchParams.get('order_id');
        getVnPayInfo = searchParams.get('vnp_OrderInfo');
        const VnPayregex = /Don hang (\S+) co tong cong la:\d+/;

        if (getVnPayInfo !== null) {
            getVnPayInfo = getVnPayInfo.match(VnPayregex);
        }
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
        const success = searchParams.get('success');
        checkVnPayIsSuccess = vnp_ResponseCode !== null ? /^00$/.test(vnp_ResponseCode) : 'Disabled';
        checkPaypalIsSuccess = success !== null ? /^1$/.test(success) : 'Disabled';
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (order_id !== null && order_id !== undefined) {
                    const responsePaypal = await orderApi.get(order_id);
                    setGetOrderDetail(responsePaypal);
                }

                if (getVnPayInfo !== undefined) {
                    const responseVnPay = await orderApi.get(getVnPayInfo[1]);
                    setGetOrderDetail(responseVnPay);
                }

                if (params !== null) {
                    const response = await orderApi.get(params.orderId);
                    setGetOrderDetail(response);
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        fetchData();
        if (params !== null) {
            toast.success('Đặt hàng thành công !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (checkVnPayIsSuccess && checkPaypalIsSuccess === 'Disabled') {
            toast.success('Thanh toán qua VNPAY thành công !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (!checkVnPayIsSuccess && checkPaypalIsSuccess === 'Disabled') {
            toast.error('Đã hủy thanh toán qua VNPAY !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (checkPaypalIsSuccess && checkVnPayIsSuccess === 'Disabled') {
            toast.success('Thanh toán qua PAYPAL thành công !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error('Đã hủy thanh toán qua PAYPAL !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }, [order_id, checkVnPayIsSuccess, checkPaypalIsSuccess, params]);

    return (
        <Container maxWidth="lg" disableGutters>
            <Box sx={{
                my: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {params === null ? (
                    !checkVnPayIsSuccess || !checkPaypalIsSuccess ?
                        <Box
                            textAlign='center' mt={3}
                            sx={{
                                minHeight: '200px',
                            }}
                        >
                            <Typography variant="body1" align="center" paragraph>
                                Không tìm thấy đơn hàng !!
                            </Typography>
                            <Button variant="contained" color="primary" component={Link} to="/product">
                                Tiếp tục mua sắm
                            </Button>
                        </Box>
                        :
                        <>
                            <CheckCircleIcon
                                sx={{ fontSize: '64px', color: 'success.main', marginBottom: '16px' }}
                            />
                            <Typography variant="h5" align="center" paragraph>
                                Mã đơn hàng của bạn là {order_id ? order_id : getVnPayInfo[1]} đang được duyệt
                            </Typography>
                            <Typography variant="h5" align="center" paragraph>
                                Chi tiết đơn hàng
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
                            <Typography mt={1} variant="h5" align="center" paragraph>
                                Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất !!!
                            </Typography>
                            <Typography variant="body1" align="center" paragraph>
                                Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi !!
                            </Typography>
                            <Button variant="contained" color="primary" component={Link} to="/product">
                                Tiếp tục mua sắm
                            </Button>
                        </>
                )
                    : <>
                        <CheckCircleIcon
                            sx={{ fontSize: '64px', color: 'success.main', marginBottom: '16px' }}
                        />
                        <Typography variant="h5" align="center" paragraph>
                            Mã đơn hàng của bạn là {params.orderId} đang được duyệt
                        </Typography>
                        <Typography variant="h5" align="center" paragraph>
                            Chi tiết đơn hàng
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
                        <Typography mt={1} variant="h5" align="center" paragraph>
                            Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất !!!
                        </Typography>
                        <Typography variant="body1" align="center" paragraph>
                            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi !!
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/product">
                            Tiếp tục mua sắm
                        </Button>
                    </>
                }
            </Box>
        </Container>
    )
}

export default SuccessPage