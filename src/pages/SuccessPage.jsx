import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { PriorityHigh } from '@mui/icons-material';

const SuccessPage = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    let match, isSuccess;
    if (location.state === null) {
        const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
        const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
        const regex = /Don hang (\S+) co tong cong la:\d+/;
        match = vnp_OrderInfo.match(regex);

        isSuccess = /^00$/.test(vnp_ResponseCode);
    }
    const params = location.state === null ? match[1] : location.state;
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
                {isSuccess ?
                    <>
                        <CheckCircleIcon
                            sx={{ fontSize: '64px', color: 'success.main', marginBottom: '16px' }}
                        />
                        <Typography variant="h5" align="center" paragraph>
                            Mã đơn hàng của bạn là {params.orderId ? params.orderId : params} đang được duyệt
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
                    </>
                    :
                    <>
                        <PriorityHigh sx={{ fontSize: '64px', color: 'error.main', marginBottom: '16px' }} />
                        <Typography variant="h5" align="center" paragraph>
                            Đã xảy ra lỗi trong quá trình xử lý hóa đơn
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