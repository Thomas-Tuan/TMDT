import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Colors } from '../styles/theme'
import { ImagesBg } from '../asset'
import MyBreadcrumb from '../components/common/MyBreadcrumb'

const About = () => {
    return (
        <>
            <Box sx={{
                height: "250px",
                position: 'relative',
            }} >
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${ImagesBg.aboutBg})`,
                }} >
                    <Typography sx={{
                        color: Colors.white,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 1,
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        fontSize: "30px",
                        letterSpacing: 2.25,
                        zIndex: 1,
                    }}>
                        Giới thiệu
                    </Typography>
                </Box>
            </Box>
            <MyBreadcrumb />
            <Container maxWidth='lg' disableGutters>
                <Stack my={1} direction="column" justifyContent="center" alignItems="center">
                    <Box sx={{ width: "62%" }}>
                        <Typography mb={2} fontWeight="bold" textTransform="uppercase" textAlign="center" variant="h5">
                            GIỚI THIỆU VỀ Nine-Home
                        </Typography>
                        <Typography fontWeight="light" variant="body1">
                            Hướng đến mục tiêu tạo điều kiện cho khách hàng trải nghiệm
                            các sản phẩm cao cấp một cách thuận tiện, và nhanh chóng.
                            Bên cạnh việc mua hàng trực tiếp tại các showroom,
                            Tại đây, quý khách sẽ có trải nghiệm mua sắm những sản phẩm cao cấp dễ dàng hơn bao giờ hết,
                            với các hình thức thanh toán nhanh chóng, bảo mật
                        </Typography>
                        <Typography fontWeight="light" mt={2} variant="body1">
                            Tất cả các sản phẩm đều được tuyển chọn và
                            đảm bảo về chất lượng và thẩm mỹ vượt trội với: vật liệu cao cấp,
                            thiết kế tinh xảo và chất lượng thi công hoàn hảo.
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default About