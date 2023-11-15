import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();
    const params = location.state;
    console.log(params)
    return (
        <Container maxWidth="lg" disableGutters>
            <Box
                sx={{
                    my: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CheckCircleIcon
                    sx={{ fontSize: '64px', color: 'success.main', marginBottom: '16px' }}
                />
                <Typography variant="h5" align="center" paragraph>
                    Mã đơn hàng của bạn  là {params.orderId} đã được đặt
                </Typography>
                <Typography variant="h5" align="center" paragraph>
                    Chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất !!!
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi !!
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/product">
                    Tiếp tục mua sắm
                </Button>
            </Box>
        </Container>
    )
}

export default SuccessPage