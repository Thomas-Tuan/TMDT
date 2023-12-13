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
import ReviewProduct from './ReviewProduct';
import favouriteProductApi from '../../api/favouriteProductApi';
import { Colors } from '../../styles/theme';


const UserProductDetail = () => {
    const { id } = useParams();
    const procId = parseInt(id);
    const [branches, setBranches] = useState([]);
    const [productDetail, setProductDetail] = useState({})

    const [matchBranch, setMatchBranch] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState('');

    const [itemCount, setItemCount] = useState(1);
    const [dataFetched, setDataFetched] = useState(false);
    const getSession = sessionStorage.getItem('userAccount')
    const accountInfo = JSON.parse(getSession);

    const [favouriteList, setFavouriteList] = useState([])
    const isProductInFavourites = favouriteList.includes(procId);

    const handleAddFavourite = async () => {
        if (!accountInfo) {
            toast.warning("Vui lòng đăng nhập trước ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            try {
                const requestData = { customerId: accountInfo.customerId, productId: procId };
                const params = {
                    customerId: accountInfo.customerId,
                    productId: procId
                };
                if (isProductInFavourites) {
                    await favouriteProductApi.remove(params);
                    toast.warning('Đã xóa sản phẩm khỏi danh sách yêu thích !',
                        {
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    await favouriteProductApi.add(requestData);
                    toast.success('Đã thêm sản phẩm vào danh sách yêu thích !',
                        {
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } catch (error) {
                console.error('Error while adding/removing from favourites:', error);
            }
        }
    };

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

    const formatNumber = (number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
        const fetchBranchList = async () => {
            try {
                const response = await branchApi.getAll();
                setBranches(response);
            } catch (error) {
                console.log("Error to fetch API: ", error.message);
            }
        }
        fetchBranchList();

        if (procId !== undefined) {
            const getProductById = async (id) => {
                try {
                    const response = await productApi.get(procId);
                    setProductDetail(response);
                    setDataFetched(true);

                } catch (error) {
                    console.error('Lỗi không lấy được dữ liệu sản phẩm:', error);
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
            getProductById(procId);
        }
        if (branches.length > 0 && productDetail.branchId !== undefined) {
            const matchingItem = branches.find(item => item.id === productDetail.branchId);
            setMatchBranch(matchingItem);
        }

        if (procId !== undefined && accountInfo) {
            const getFavouriteProductById = async (cusId) => {
                try {
                    const oldFarvouriteResponse = await favouriteProductApi.getById(cusId);
                    setFavouriteList(oldFarvouriteResponse)
                } catch (error) {
                    console.error('Lỗi không lấy được dữ liệu sản phẩm yêu thích:', error);
                }
            }
            getFavouriteProductById(accountInfo.customerId);
        }
    }, [id, matchBranch, accountInfo, navigate, procId, productDetail.branchId]);

    return (
        <>
            <MyBreadcrumb />
            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Grid spacing={3} container >
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
                                    <Typography variant="body1" fontWeight="light">
                                        {matchBranch.name}
                                    </Typography>
                                    <IconButton onClick={() => handleAddFavourite()}>
                                        {isProductInFavourites ? (
                                            <FavoriteOutlined fontSize="large" color="error" />
                                        ) : (
                                            <FavoriteOutlined fontSize="large" />
                                        )}
                                    </IconButton>
                                </Stack>
                                <Typography sx={{
                                    width: "80%",
                                }} variant="h4">
                                    {productDetail.name}
                                </Typography>
                                {productDetail.description && (
                                    <Typography sx={{
                                        ml: "-5px",
                                    }} variant="subtitle1">
                                        {parse(productDetail.description)}
                                    </Typography>
                                )}
                                <Stack mb={1} direction="row" justifyContent="space-between" alignContent="center">
                                    {
                                        productDetail.discount !== 0 ?
                                            <Stack sx={{
                                                width: "60%",
                                            }} alignproductDetails="center" justifyContent="center">
                                                <Typography sx={{
                                                    color: Colors.danger,
                                                }}
                                                    fontWeight={700}
                                                    variant="h6">
                                                    {formatNumber((productDetail.price - productDetail.discount))}<sup>Đ</sup>
                                                </Typography>
                                                <Typography mr={1} variant="h5">
                                                    <del>
                                                        {formatNumber(productDetail.price)}<sup>Đ</sup>
                                                    </del>
                                                </Typography>
                                            </Stack>
                                            :
                                            <Box sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "60%",
                                            }}>
                                                <Typography textAlign="center" variant="h5">
                                                    {formatNumber(productDetail.price)}<sup>Đ</sup>
                                                </Typography>
                                            </Box>
                                    }
                                    <Stack my={1} width="100%" direction="row" alignItems="center" justifyContent="flex-start">
                                        {productDetail.quantity === 0 ?
                                            <Typography sx={{
                                                color: Colors.danger,
                                                textTransform: "capitalize",
                                            }}
                                                variant="subtitle1">Đã hết hàng </Typography>
                                            :
                                            <>
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
                                            </>
                                        }
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
                    {
                        dataFetched &&
                        <ReviewProduct productInfo={productDetail} />
                    }
                </Grid>
            </Container>
        </>
    )
}

export default UserProductDetail