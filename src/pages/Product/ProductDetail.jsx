import { AddCircleOutlined, FavoriteOutlined, RemoveCircleOutline } from '@mui/icons-material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateQuantity } from '../../Redux/Cart/CartSlice';
import productApi from '../../api/productApi';
import MyBreadcrumb from '../../components/common/MyBreadcrumb';
import branchApi from '../../api/branchApi';


const UserProductDetail = () => {
    const { id } = useParams();
    const [branches, setBranches] = useState([]);
    const [productDetail, setProductDetail] = useState({})
    const [matchBranch, setMatchBranch] = useState({})

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState('');

    const [itemCount, setItemCount] = useState(1);

    const handleChange = (image) => {
        setMainImage(image);
    };
    const handleAddToCart = (product, quantity) => {
        dispatch(updateQuantity({ product, quantity }));
        navigate('/cart');
    };
    const handleIncrease = () => {
        if (itemCount < productDetail.quantity) {
            setItemCount(itemCount + 1);
        }
        else {
            alert('Số lượng vượt quá tồn kho !')
        }
    };
    const handleDecrease = () => {
        if (itemCount > 1) {
            setItemCount(itemCount - 1);
        }
        else {
            alert('Số lượng không nhỏ hơn bằng 0 !')
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            const getProductById = async (id) => {
                try {
                    const response = await productApi.get(id);
                    setProductDetail(response);
                    if (branches.length > 0 && productDetail.branchId !== undefined) {
                        const matchingItem = branches.find(item => item.id === productDetail.branchId);
                        setMatchBranch(matchingItem);
                    }
                } catch (error) {
                    console.error('Lỗi không được lấy dữ liệu sản phẩm:', error);
                    toast.error('Không tìm thấy sản phẩm này !', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    navigate('/product');
                }
            }
            getProductById(id);
        }
    }, [id, branches, productDetail.branchId, navigate]);

    useEffect(() => {
        fetchBranchList();
    }, [])

    const fetchBranchList = async () => {
        try {
            const response = await branchApi.getAll();
            setBranches(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }

    return (
        <>
            <MyBreadcrumb />
            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Grid spacing={1} container >
                    <Grid item xs={12} md={1.25} >
                        <Stack
                            direction={{ xs: "row", md: "column" }}
                            spacing={2}
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                        >
                            <CardMedia
                                onClick={() => handleChange(productDetail.imgMain)}
                                component="img"
                                image={productDetail.imgMain}
                                alt={productDetail.name}
                                width="100%"
                                height="100%"
                                sx={{
                                    borderRadius: 2,
                                }}
                            />
                            {productDetail.image2 &&
                                <CardMedia
                                    onClick={() => handleChange(productDetail.image2)}
                                    component="img"
                                    image={productDetail.image2}
                                    alt={productDetail.name}
                                    width="100%"
                                    height="100%"
                                    sx={{
                                        borderRadius: 2,
                                    }}
                                />
                            }
                            {productDetail.image3 &&
                                <CardMedia
                                    onClick={() => handleChange(productDetail.image3)}
                                    component="img"
                                    image={productDetail.image3}
                                    alt={productDetail.name}
                                    width="100%"
                                    height="100%"
                                    sx={{
                                        borderRadius: 2,
                                    }}
                                />
                            }
                        </Stack >
                    </Grid>
                    <Grid item xs={12} md={5.75} >
                        <Paper>
                            <CardMedia
                                height={400}
                                image={mainImage.trim() === "" ? productDetail.imgMain : mainImage}
                                component="img"
                                alt={productDetail.name}
                                sx={{
                                    borderRadius: 2,
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5} >
                        <Card >
                            <CardContent >
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Stack alignItems="center">
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: 1,
                                        }}>
                                            <Typography variant="subtitle1">
                                                Thương hiệu
                                            </Typography>
                                            <Typography variant="h5">
                                                {matchBranch.name}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                    <IconButton>
                                        <FavoriteOutlined fontSize="large" />
                                    </IconButton>
                                </Stack>
                                <Typography variant="h3">
                                    {productDetail.name}
                                </Typography>
                                {productDetail.description && (
                                    <Typography variant="subtitle1">
                                        {parse(productDetail.description)}
                                    </Typography>
                                )}
                                <Stack mt={1} direction="row" justifyContent="space-between" alignContent="center">
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "50%",
                                    }}>
                                        <Typography variant="h5">
                                            {productDetail.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} <sup>Đ</sup>
                                        </Typography>
                                    </Box>
                                    <Stack my={1} width="100%" direction="row" alignItems="center" justifyContent="flex-start">
                                        <IconButton onClick={(e) => {
                                            handleDecrease()
                                        }}>
                                            <RemoveCircleOutline />
                                        </IconButton>
                                        <Typography variant="body1">{itemCount}</Typography>
                                        <IconButton onClick={(e) => {
                                            handleIncrease()
                                        }}>
                                            <AddCircleOutlined />
                                        </IconButton>
                                        <Typography variant="subtitle1">còn {productDetail.quantity} sản phẩm</Typography>
                                    </Stack>
                                </Stack>
                                <Button sx={{
                                    width: "100%",
                                    alignItems: "center",
                                    display: "flex",
                                }} variant="contained"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAddToCart(productDetail, itemCount)
                                    }} >
                                    <ShoppingBagOutlinedIcon sx={{
                                        mr: 1,
                                    }} />
                                    Mua ngay
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Paper sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: 1,
                        }}>
                            <Typography textAlign="center" variant="subtitle1">
                                Đánh giá sản phẩm
                            </Typography>
                            <Typography variant="subtitle1">
                                New
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default UserProductDetail