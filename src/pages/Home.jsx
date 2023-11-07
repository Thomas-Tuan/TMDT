import { AdsClickOutlined, DeliveryDiningOutlined, PhoneAndroidOutlined } from "@mui/icons-material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Banner from '../components/banner';
import Branch from "../components/common/Branch";
import { SliderCarousel } from "../components/common/SliderCarousel";
import useProducts from "../hooks/useProducts";
import { Colors } from '../styles/theme';
import { useDispatch } from "react-redux";
import { addItem } from "../hooks/useReducer";

const Home = () => {
    const productData = [
        {
            Id: "candle",
            Title: "nến thơm",
            Image: require("../asset/images/Home/decorate.jpg"),
        },
        {
            Id: "vase",
            Title: "bình hoa",
            Image: require("../asset/images/Home/vase.jpg"),
        },
        {
            Id: "frame",
            Title: "khung hình ",
            Image: require("../asset/images/Home/frame.jpg"),
        },
        {
            Id: "crystal",
            Title: "Đồ pha lê",
            Image: require("../asset/images/Home/crystal.jpg"),
        },
        {
            Id: "bathroomDecorate",
            Title: "Đồ nhà tắm",
            Image: require("../asset/images/Home/bathroom.jpg"),
        },
        {
            Id: "decorate",
            Title: "Đồ trang trí",
            Image: require("../asset/images/Home/decorate12.jpg"),
        },
        {
            Id: "plate",
            Title: "Khay",
            Image: require("../asset/images/Home/plate.jpg"),
        },
        {
            Id: "lamp",
            Title: "Đèn",
            Image: require("../asset/images/Home/lamp12.jpg"),
        },
    ]
    const { products } = useProducts();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigateToCart = (proDetail) => {
        dispatch(addItem(proDetail));
        navigate('/cart');
    };

    return (
        <>
            <Banner />
            <Grid my={2} container spacing={1} >
                {products.map((item, idx) => (
                    < Grid key={item.name} item xs={6} md={6} lg={3} >
                        <Card component={Link} to={`product/${item.id}`}
                            sx={{
                                maxWidth: 345,
                            }} >
                            <CardMedia
                                component="img"
                                image={item.imgMain}
                                alt={item.name}
                                height="250"
                                sx={{
                                    objectFit: "contain",
                                    borderRadius: 2,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scaleY(1.04)',
                                    },
                                }}
                            />
                            <CardContent >
                                <Typography textAlign="center" fontWeight="bold" variant="h5">
                                    {item.name}
                                </Typography>
                                <Typography textAlign="center" variant="body1">
                                    {item.price}Đ
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <Button sx={{
                                    width: "80%"

                                }} onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigateToCart(item)
                                }} variant="contained" >
                                    Mua ngay
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid >
            <SliderCarousel />
            <Branch />
            <Grid container >
                {productData.map((item, idx) => (
                    <Grid key={item.Id} item lg={3} md={3} xs={12} >
                        <Box sx={{
                            height: "250px",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
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
                                backgroundImage: `url(${item.Image})`,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scaleY(1.04)',
                                },
                            }} />
                            <Stack justifyContent="center"
                                alignItems="center"
                                mb={5}
                                spacing={2}>
                                <Typography sx={{
                                    color: Colors.white,
                                    marginBottom: "8px",
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                    fontSize: "30px",
                                    letterSpacing: 2.25,
                                    zIndex: 1,
                                }}>
                                    {item.Title}
                                </Typography>
                                <Typography sx={{
                                    color: Colors.white,
                                    textTransform: "uppercase",
                                    marginBottom: "8px",
                                    zIndex: 1,
                                }}>
                                    Xem tất cả
                                </Typography>
                            </Stack>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Grid container >
                <Grid sx={{
                    minWidth: 275,
                    minHeight: 180,
                }} item xs={12} sm={6} lg={3} >
                    <Card sx={{
                        display: 'flex',
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 1,
                    }} >
                        <CardContent sx={{
                            pointerEvents: 'none',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'space-evenly',
                            alignItems: "center",
                        }}>
                            <CreditCardIcon fontSize="large" />
                            <Typography mt={2} fontWeight="bold" variant="body2">
                                THANH TOÁN DỄ DÀNG VÀ BẢO MẬT
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid sx={{
                    minWidth: 275,
                    minHeight: 180,
                }} item xs={12} sm={6} lg={3} >
                    <Card sx={{
                        display: 'flex',
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 1,
                    }} >
                        <CardContent sx={{
                            pointerEvents: 'none',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'space-evenly',
                            alignItems: "center",
                        }}>
                            <DeliveryDiningOutlined fontSize="large" />
                            <Typography mt={2} fontWeight="bold" variant="body2">
                                GIAO HÀNG ĐẢM BẢO TOÀN QUỐC
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid sx={{
                    minWidth: 275,
                    minHeight: 180,
                }} item xs={12} sm={6} lg={3} >
                    <Card sx={{
                        display: 'flex',
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 1,
                    }} >
                        <CardContent sx={{
                            pointerEvents: 'none',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'space-evenly',
                            alignItems: "center",
                        }}>
                            <PhoneAndroidOutlined fontSize="large" />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: "column",
                                justifyContent: 'center',
                                alignItems: "center",
                            }}>
                                <Typography mt={2} fontWeight="bold" variant="body2">
                                    HOTLINE 0914938844
                                </Typography>
                                <Typography mt={1} fontWeight="bold" variant="body2">
                                    (10:00 - 19:00)
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid sx={{
                    minWidth: 275,
                    minHeight: 180,
                }} item xs={12} sm={6} lg={3} >
                    <Card sx={{
                        display: 'flex',
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 1,
                    }} >
                        <CardContent sx={{
                            pointerEvents: 'none',
                            display: 'flex',
                            flexDirection: "column",
                            justifyContent: 'space-evenly',
                            alignItems: "center",
                        }}>
                            <AdsClickOutlined fontSize="large" />
                            <Typography mt={2} fontWeight="bold" variant="body2">
                                CAM KẾT SẢN PHẨM CHÍNH HÃNG
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Home