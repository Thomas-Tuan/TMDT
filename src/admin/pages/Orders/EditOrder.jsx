import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Fade, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from '@mui/material';

import React, { useEffect, useState } from 'react';

import { CloseOutlined } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Field, Form, Formik } from 'formik';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../../../api/orderApi';
import useOrders from '../../../hooks/useOrder';
import useTable from '../../../hooks/useTable';
import { Colors } from '../../../styles/theme';

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

const orderStatus = [
    {
        Id: 0,
        Title: "Đang chờ duyệt",
    },
    {
        Id: 1,
        Title: "Đã thanh toán",
    },
    {
        Id: 2,
        Title: "Đã duyệt",
    },
    {
        Id: -1,
        Title: "Đã hủy",
    },
]

const EditOrder = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [getOrderDetail, setGetOrderDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const params = location.state;
    const itemGet = useTable();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { handleSubmit } = useOrders();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

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
                navigate('/admin/order');
            }
        };

        if (id !== undefined) {
            fetchData();
        }
    }, [id, navigate]);

    const CustomizedSelectForFormik = ({ children, form, field }) => {
        const { name, value } = field;
        const { setFieldValue } = form;
        if (children) {
            return (
                <Select
                    value={value || 0}
                    name={name}
                    fullWidth
                    onChange={e => {
                        setFieldValue(name, e.target.value);
                    }}
                >
                    {children}
                </Select>
            );
        }
    };

    const EditOrderForm = (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalOpen}
            onClose={closeModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={isModalOpen} position="relative">
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        sm: "350px",
                        md: "500px",
                    },
                    bgcolor: Colors.white,
                    border: `3px solid ${Colors.light}`,
                    boxShadow: 24,
                    p: 4,
                    marginTop: 4
                }}>
                    <Typography position="relative" variant="h5" mb={2} align="center" fontWeight="bold">
                        Cập nhật đơn hàng
                        <CloseOutlined sx={{
                            cursor: "pointer",
                            position: "absolute",
                            right: {
                                xs: -25,
                                sm: -10,
                            },
                            top: -20,
                            "&:hover": {
                                borderRadius: 4,
                                color: Colors.light,
                                bgcolor: Colors.shaft,
                            },
                        }} onClick={closeModal} />
                    </Typography>
                    <Formik initialValues={{ Id: params.orderId ? params.orderId : 0, Status: params.status ? params.status : 0 }} onSubmit={handleSubmit} >
                        {({ values, handleChange, handleBlur, }) => {
                            return (
                                <Form>
                                    <InputLabel>Trạng thái</InputLabel>
                                    <Field
                                        component={CustomizedSelectForFormik}
                                        fullWidth
                                        value={values.Status}
                                        name="Status"
                                        label="Trạng thái"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {orderStatus.map((item, idx) => (
                                            <MenuItem key={idx} value={item.Id}>
                                                {item.Title}
                                            </MenuItem>
                                        ))
                                        }
                                    </Field>
                                    <Box height={14} />
                                    <Button color="primary" variant="contained" fullWidth type="submit">
                                        Cập nhật trạng thái
                                    </Button>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                </Box>
            </Fade>
        </Modal >
    )

    return (
        <>
            {EditOrderForm}
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
                                                {formatNumber(item.productPrice)}<sup>Đ</sup>
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
                            <Box sx={{
                                mr: 2,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: 'center',
                            }}>
                                <Typography mr={5} variant='body1'>
                                    Trạng thái đơn hàng
                                </Typography>
                                <Typography variant='body1' fontWeight="bold">
                                    {itemGet.getStatusText(params.status)}
                                </Typography>
                            </Box>
                            <IconButton
                                size="large"
                                edge="start"
                                disabled={params.status === -1 || params.status === 1 || params.status === 2}
                                color="inherit"
                                onClick={openModal}
                            >
                                <EditIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
            <Box mt={2}>
                <Button variant="contained" color="primary" component={Link} to='/admin/order'>
                    Trở về trang danh sách đơn đặt hàng
                </Button>
            </Box>
        </>
    );
};


export default EditOrder;
