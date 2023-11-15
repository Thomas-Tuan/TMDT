import { ArrowLeftOutlined } from '@mui/icons-material';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
const NotFound = () => (
    <>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            mb: 3,
                            textAlign: 'center'
                        }}
                    >
                        <img
                            alt="Under development"
                            src={require('../asset/images/error-404.png')}
                            style={{
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 400
                            }}
                        />
                    </Box>
                    <Typography
                        align="center"
                        sx={{ mb: 3 }}
                        variant="h3"
                    >
                        Lỗi không tìm thấy trang này
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        variant="body1"
                    >
                        Vui lòng trở về lại trang chủ !!!
                    </Typography>
                    <Button
                        href="/"
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <ArrowLeftOutlined />
                            </SvgIcon>
                        )}
                        sx={{ mt: 3 }}
                        variant="contained"
                    >
                        Trở về trang chủ
                    </Button>
                </Box>
            </Container>
        </Box>
    </>
);

export default NotFound;
