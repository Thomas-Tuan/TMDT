import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from '@mui/material';

import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../../api/orderApi';
import useTable from '../../hooks/useTable';

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

const UserOrderDetail = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [getOrderDetail, setGetOrderDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const params = location.state;
    const itemGet = useTable();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await orderApi.get(id);
                setGetOrderDetail(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                toast.error('Không tìm thấy đơn hàng này !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/customer/orderList');
            }
        };

        if (id !== undefined) {
            fetchData();
        }
    }, [id, navigate]);


    return (
        <>
            <Typography mb={2} variant='h5' textAlign="center" fontWeight="bolder">
                Chi tiết đơn hàng {params.orderId}
            </Typography>
            <Paper>
                {isLoading === true ?
                    <Box
                        textAlign='center' mt={3}
                        sx={{
                            minHeight: '200px',
                        }}
                    >
                        <CircularProgress sx={{
                            m: 2
                        }} />
                        <Typography>Loading data...</Typography>
                    </Box>
                    :
                    <TableContainer >
                        <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
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
                                                {item.productPrice?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
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
                }
            </Paper>
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
                    {params.customerId !== null &&
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Typography mr={5} variant='body1'>
                                    Mã khách hàng
                                </Typography>
                                <Typography variant='body1' fontWeight="bold">
                                    {params.customerId}
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
                                    {params.gender === 0 ? 'Anh' : 'Chị'}
                                </Typography>
                                <Typography variant='body1' fontWeight="bold">
                                    {params.cusName}
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
                                {params.phone}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            {params.email !== '' &&
                                <>
                                    <Typography mr={5} variant='body1'>
                                        Email
                                    </Typography>
                                    <Typography variant='body1' fontWeight="bold">
                                        {params.email}
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
                                {itemGet.getStatusText(params.status)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
            <Box mt={2}>
                <Button variant="contained" color="primary" component={Link} to='/customer/orderList'>
                    Trở về trang danh sách đơn đặt hàng
                </Button>
            </Box>
        </>
    );
};


export default UserOrderDetail;
