import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputBase, Radio, RadioGroup, Slider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useBranches from "../../hooks/useBranches";
import useCategories from "../../hooks/useCategories";
import useProducts from "../../hooks/useProducts";
import { addItem } from "../../hooks/useReducer";
import { Colors } from "../../styles/theme";


const UserProductList = () => {
    const { products } = useProducts();
    const navigate = useNavigate();
    const { categories } = useCategories();
    const { branches } = useBranches();

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedBranch, setSelectedBranch] = useState(0);

    const [minPrice, setMinPrice] = useState(10000);
    const [maxPrice, setMaxPrice] = useState(50000);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filterProducts = (products, selectedCategory, selectedBranch, query, minPrice, maxPrice) => {
            let updatedProducts = [...products];
            if (selectedCategory !== 0) {
                updatedProducts = updatedProducts.filter((product) => product.categoryId === selectedCategory);
            }
            console.log(updatedProducts)
            if (selectedBranch !== 0) {
                updatedProducts = updatedProducts.filter((product) => product.branchId === selectedBranch);
            }

            if (query) {
                updatedProducts = updatedProducts.filter((product) =>
                    product.name.toLowerCase().includes(query.toLowerCase())
                );
            }

            if (minPrice && maxPrice) {
                updatedProducts = updatedProducts.filter((product) =>
                    product.price >= minPrice && product.price <= maxPrice
                );
            }

            return updatedProducts;
        };

        const updatedProducts = filterProducts(products, selectedCategory, selectedBranch, query, minPrice, maxPrice);
        setFilteredProducts(updatedProducts);
    }, [selectedCategory, selectedBranch, query, minPrice, maxPrice, products]);


    const handleNavigateToCart = (proDetail) => {
        dispatch(addItem(proDetail));
        navigate('/cart');
    };

    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(parseInt(event.target.value));
    };
    const handleBranchChange = (id) => {
        setSelectedBranch(id)
    };
    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <Container maxWidth='lg' disableGutters>
            <Grid my={2} container  >
                <Grid item xs={12} md={3} sm={12} >
                    <Stack>
                        <FormControl>
                            <FormLabel>Danh mục</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Tất cả" />
                                {
                                    categories.map((item, idx) => (
                                        <FormControlLabel key={item.title} value={item.id} control={<Radio />} label={item.title} />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        <Box sx={{ width: "80%", my: 2 }}>
                            <FormLabel>Giá tiền</FormLabel>
                            <Slider
                                value={[minPrice, maxPrice]}
                                color="warning"
                                valueLabelDisplay="auto"
                                step={20000}
                                marks
                                min={10000}
                                max={50000}
                                onChange={handlePriceChange}
                            />
                        </Box>
                        <Button sx={{
                            width: "80%",
                            borderRadius: '4px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }} variant="contained" color="primary" >
                            Làm mới
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={9} sm={12} spacing={1} container>
                    <Box
                        sx={{
                            display: {
                                md: 'none',
                                sm: "block",
                            },
                            m: "8px auto",
                            borderRadius: '4px',
                            padding: '4px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <InputBase
                            value={query}
                            onChange={handleSearchChange}
                            placeholder="Tìm kiếm..."
                            sx={{ marginRight: 1, fontWeight: 'bold' }}
                        />
                        <IconButton sx={{ color: `${Colors.black}` }} >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        width: 1,
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Box>
                            <Typography variant="h5" sx={{
                                textAlign: "center",
                                mb: 2,
                            }} >Thương hiệu</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="flex-start">
                                {
                                    branches.map((item, idx) => (
                                        <Button key={item.name} onClick={() => { handleBranchChange(item.id) }} sx={{
                                            borderRadius: '4px',
                                            mr: 1,
                                            px: 3,
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        }} variant="contained" color="primary" value={selectedBranch} >
                                            {item.name}
                                        </Button>
                                    ))
                                }
                            </Stack>
                        </Box>
                        <Box
                            sx={{
                                display: {
                                    md: 'flex',
                                    xs: "none",
                                },
                                alignItems: 'center',
                                borderRadius: '4px',
                                padding: '4px',
                                mr: 2,
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <InputBase
                                value={query}
                                onChange={handleSearchChange}
                                placeholder="Tìm kiếm..."
                                sx={{ marginRight: 1, fontWeight: 'bold' }}
                            />
                            <IconButton sx={{ color: `${Colors.black}` }} >
                                <SearchIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {
                        filteredProducts.length === 0 ?
                            <>
                                {products.map((item, idx) => (
                                    <Grid key={item.name} item xs={6} md={4} lg={3} >
                                        <Card component={Link} to={`${item.id}`}
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
                                                    e.preventDefault()
                                                    handleNavigateToCart(item)
                                                }} variant="contained" >
                                                    Mua ngay
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </>
                            :
                            <>
                                {filteredProducts.map((item, idx) => (
                                    <Grid key={item.name} item xs={6} md={4} lg={3} >
                                        <Card component={Link} to={`${item.id}`}
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
                                                    e.preventDefault()
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
                </Grid>
            </Grid >
        </Container >
    )
}

export default UserProductList