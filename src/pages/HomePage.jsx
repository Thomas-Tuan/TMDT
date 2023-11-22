import { AdsClickOutlined, DeliveryDiningOutlined, PhoneAndroidOutlined } from "@mui/icons-material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../Redux/Cart/CartSlice";
import { ImagesBg } from "../asset";
import Banner from '../components/banner';
import Branch from "../components/common/Branch";
import { SliderCarousel } from "../components/common/SliderCarousel";
import usePaginationProducts from "../hooks/usePaginationProduct";
import { Colors } from '../styles/theme';

const HomePage = () => {
    const productData = [
        {
            Id: "candle",
            Title: "nến thơm",
            Image: ImagesBg.candleBg,
        },
        {
            Id: "vase",
            Title: "bình hoa",
            Image: ImagesBg.vaseBg,
        },
        {
            Id: "frame",
            Title: "khung hình ",
            Image: ImagesBg.frameBg,
        },
        {
            Id: "crystal",
            Title: "Đồ pha lê",
            Image: ImagesBg.crystalBg,
        },
        {
            Id: "bathroomDecorate",
            Title: "Đồ nhà tắm",
            Image: ImagesBg.bathroomBg
        },
        {
            Id: "decorate",
            Title: "Đồ trang trí",
            Image: ImagesBg.decorateBg
        },
        {
            Id: "plate",
            Title: "Khay",
            Image: ImagesBg.plateBg
        },
        {
            Id: "lamp",
            Title: "Đèn",
            Image: ImagesBg.lampBg
        },
    ]

    const { productsPagination, isLoading, dataFetched } = usePaginationProducts(0);
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading && dataFetched) {
            setProductList(productsPagination.products);
        }
    }, [isLoading, dataFetched, productsPagination]);

    const handleNavigateToCart = (proDetail) => {
        dispatch(addItem(proDetail));
        navigate('/cart');
    };

    return (
        <>
            <Banner />
            <Box>
                <Typography my={2} textTransform="uppercase" textAlign="center" variant="h3" >
                    Bán chạy nhất
                </Typography>
                <Typography my={2} textTransform="uppercase" textAlign="center" variant="body1" >
                    <Link to="/product">
                        Xem tất cả
                    </Link>
                </Typography>
            </Box>
            <Grid my={2} container spacing={1} >
                {isLoading &&
                    <Grid item xs={12} >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress sx={{
                                m: 2
                            }} />
                            <Typography align='center' variant='h5'>Loading data...</Typography>
                        </Box>
                    </Grid>
                }
                {
                    productList.length !== 0 &&
                    <>
                        {productList.slice(-4).reverse().map((item, idx) => (
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
                                                boxShadow: '10px 10px 40px 15px grey;',
                                            },
                                        }}
                                    />
                                    <CardContent >
                                        <Typography textAlign="center" fontWeight="bold" variant="h5">
                                            {item.name}
                                        </Typography>
                                        <Typography textAlign="center" variant="body1">
                                            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}<sup>Đ</sup>
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
                    </>
                }
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

export default HomePage