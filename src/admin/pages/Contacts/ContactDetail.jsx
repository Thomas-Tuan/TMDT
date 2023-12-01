import { Box, Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import contactApi from '../../../api/contactApi';



const ContactDetail = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [getOrderDetail, setGetOrderDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await contactApi.get(id);
                setGetOrderDetail(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                toast.error('Không tìm thấy đơn liên hệ này !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/admin/contact');
            }
        };

        if (id !== undefined) {
            fetchData();
        }
    }, [id, navigate]);

    return (
        <>
            <Typography mb={2} variant='h5' textAlign="center" fontWeight="bolder">
                Chi tiết đơn liên hệ
            </Typography>
            <Paper elevation={3}
                sx={{
                    padding: '20px',
                    border: '2px solid #2196F3',
                    backgroundColor: '#E3F2FD',
                }}>
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
                    <Grid container spacing={3}>
                        <Grid item xs={12}  >
                            <Stack direction="row" justifyContent="center" alignItems="center">
                                <Typography mr={5} variant='body1'>
                                    Tên khách hàng
                                </Typography>
                                <Typography variant='body1' fontWeight="bold">
                                    {getOrderDetail.name}
                                </Typography>
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
                                <Typography mr={5} variant='body1'>
                                    Email
                                </Typography>
                                <Typography variant='body1' fontWeight="bold">
                                    {getOrderDetail.email}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack justifyContent="center" alignItems="center">
                                <Stack mb={2} direction="row" justifyContent="center" alignItems="center">
                                    <Typography mr={5} variant='body1'>
                                        Tiêu đề
                                    </Typography>
                                    <Typography variant='body1' fontWeight="bold">
                                        {getOrderDetail.title}
                                    </Typography>
                                </Stack>
                                <Stack justifyContent="center" alignItems="center">
                                    <Typography variant='body1'>
                                        Nội dung
                                    </Typography>
                                    <Typography variant='body1' fontWeight="bold">
                                        {getOrderDetail.description}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                }
            </Paper>
            <Box mt={2}>
                <Button variant="contained" color="primary" component={Link} to='/admin/contact'>
                    Trở về trang danh sách liên hệ
                </Button>
            </Box>
        </>
    );
};


export default ContactDetail;
