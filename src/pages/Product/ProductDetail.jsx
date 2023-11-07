import { AddCircleOutlined, FavoriteOutlined, RemoveCircleOutline } from '@mui/icons-material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import productApi from '../../api/productApi';
import useBranches from '../../hooks/useBranches';
import { updateQuantity } from '../../hooks/useReducer';


const UserProductDetail = () => {
    const { id } = useParams();
    const { branches } = useBranches();
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
                }
            }
            getProductById(id);
        }
    }, [id, branches, productDetail.branchId]);



    return (
        <Container maxWidth="lg">
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
                                <Typography variant="subtitle1">
                                    {matchBranch.name}
                                </Typography>
                                <IconButton>
                                    <FavoriteOutlined fontSize="large" />
                                </IconButton>
                            </Stack>
                            <Typography variant="h3">
                                {productDetail.name}
                            </Typography>
                            <Typography variant="body1" my={2}>
                                {productDetail.price} Đ
                            </Typography>
                            {productDetail.description && (
                                <Paper >
                                    {parse(productDetail.description)}
                                </Paper>
                            )}
                        </CardContent>
                        <CardActions sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
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
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserProductDetail