import { Card, CardContent, CardMedia, Grid, Pagination, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import favouriteProductApi from '../../api/favouriteProductApi';
import { Colors } from '../../styles/theme';

const FavouritePage = () => {
    const getSession = sessionStorage.getItem('userAccount')
    const accountInfo = JSON.parse(getSession);
    const [page, setPage] = useState(0);
    const [favouriteProductsPagination, setFavouriteProductsPagination] = useState({});
    const [newProductList, setNewProductList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const totalPages = Math.ceil(favouriteProductsPagination.totalCount / 8);

    useEffect(() => {
        setIsLoading(true);
        const fetchProductListPagination = async (id, page) => {
            try {
                const params = {
                    customerId: id,
                    page: page,
                };
                const response = await favouriteProductApi.getListPagination(params);
                setIsLoading(false);
                setFavouriteProductsPagination(response);
                setNewProductList([...response.products])
            } catch (error) {
                console.log("Error to fetch API: ", error.message);
            }
        }
        fetchProductListPagination(accountInfo.customerId, page);
    }, [accountInfo.customerId, page])

    const handleNavigateToNextPage = (event, selectedPage) => {
        setPage(selectedPage);
    };

    const formatNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    return (
        <>
            {
                isLoading ?
                    <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                        Loading data ...
                    </Typography>
                    : newProductList.length === 0 ?
                        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                            Danh sách sản phẩm yêu thích chưa có thêm vào  !
                        </Typography>
                        : !isLoading && favouriteProductsPagination.products.length !== 0 &&
                        < Grid container spacing={1} sx={{ mt: 2 }}>
                            {
                                newProductList.map((item, idx) => {
                                    return (
                                        <Grid key={item.name} item xs={6} md={4} lg={3} >
                                            <Card component={Link} to={`/product/${item.id}`}
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
                                                    <Typography textAlign="center" fontWeight="bold" variant="body1">
                                                        {item.name}
                                                    </Typography>
                                                    {
                                                        item.discount !== 0 ?
                                                            <Stack alignItems="center" justifyContent="center">
                                                                <Typography sx={{
                                                                    color: Colors.danger,
                                                                }}
                                                                    fontWeight={700}
                                                                    variant="h6">
                                                                    {formatNumber((item.price - item.discount))}<sup>Đ</sup>
                                                                </Typography>
                                                                <Typography mr={1} textAlign="center" variant="body1">
                                                                    <del>
                                                                        {formatNumber(item.price)}<sup>Đ</sup>
                                                                    </del>
                                                                </Typography>
                                                            </Stack>
                                                            :
                                                            <Typography textAlign="center" variant="body1">
                                                                {formatNumber(item.price)}<sup>Đ</sup>
                                                            </Typography>
                                                    }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                            <Grid item xs={12}
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                <Pagination
                                    color="warning"
                                    count={totalPages}
                                    page={page}
                                    onChange={handleNavigateToNextPage}
                                />
                            </Grid>
                        </Grid >
            }
        </>
    )
}

export default FavouritePage