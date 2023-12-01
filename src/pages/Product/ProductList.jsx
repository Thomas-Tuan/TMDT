import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputBase, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Slider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../Redux/Cart/CartSlice";
import branchApi from '../../api/branchApi';
import categoryApi from '../../api/categoryApi';
import { ImagesBg } from '../../asset';
import MyBreadcrumb from '../../components/common/MyBreadcrumb';
import usePaginationProducts from '../../hooks/usePaginationProduct';
import { Colors } from "../../styles/theme";


const UserProductList = () => {
    const [page, setPage] = useState(0);
    const { productsPagination, isLoading, dataFetched } = usePaginationProducts(page);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const totalPages = Math.ceil(productsPagination.totalCount / 10);

    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedBranch, setSelectedBranch] = useState(0);

    const [minPrice, setMinPrice] = useState(1000000);
    const [maxPrice, setMaxPrice] = useState(500000000);
    const [sortOption, setSortOption] = useState('az');

    useEffect(() => {
        fetchBranchList();
        fetchCategoryList();
    }, [])

    const fetchBranchList = async () => {
        try {
            const response = await branchApi.getAll();
            setBranches(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.getAll();
            setCategories(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }


    useEffect(() => {
        if (!isLoading && dataFetched) {
            const filterProducts = (selectedCategory, selectedBranch, query, minPrice, maxPrice, sortOption) => {
                let updatedProducts = [...productsPagination.products];
                if (selectedCategory !== 0) {
                    updatedProducts = updatedProducts.filter((product) => product.categoryId === selectedCategory);
                }

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

                switch (sortOption) {
                    case 'za':
                        updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                    case 'priceAsc':
                        updatedProducts.sort((a, b) => a.price - b.price);
                        break;
                    case 'priceDesc':
                        updatedProducts.sort((a, b) => b.price - a.price);
                        break;
                    default:
                        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                }

                return updatedProducts;
            };
            const updatedProducts = filterProducts(selectedCategory, selectedBranch, query, minPrice, maxPrice, sortOption);
            setFilteredProducts(updatedProducts);
        }
    }, [isLoading, dataFetched, productsPagination, selectedCategory, selectedBranch, query, minPrice, maxPrice, sortOption]);

    const handleNavigateToCart = (proDetail) => {
        dispatch(addItem(proDetail));
        navigate('/cart');
    };

    const handleNavigateToNextPage = (event, selectedPage) => {
        setPage(selectedPage);
        navigate(`/product?page=${selectedPage}`);
    };

    const handlePriceChange = (event, newValue) => {
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(parseInt(event.target.value));
    };

    const handleBranchChange = (event) => {
        setSelectedBranch(parseInt(event.target.value));
    };

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
    };

    const handleResetFilter = () => {
        setSelectedCategory(0);
        setSelectedBranch(0);
        setQuery('');
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        setPage(1);
        navigate('/product');
    };

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
                    backgroundImage: `url(${ImagesBg.productBg})`,
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
                        Sản phẩm
                    </Typography>
                </Box>
            </Box>
            <MyBreadcrumb />
            <Container maxWidth='lg' disableGutters>
                <Grid my={2} container  >
                    <Grid item xs={12} md={3} sm={12} >
                        <Stack sx={{ mb: 2 }}>
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
                                            <FormControlLabel key={idx} value={item.id} control={<Radio />} label={item.title} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Thương hiệu</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={selectedBranch}
                                    onChange={handleBranchChange}
                                >
                                    <FormControlLabel value={0} control={<Radio />} label="Tất cả" />
                                    {
                                        branches.map((item, idx) => (
                                            <FormControlLabel key={item.name} value={item.id} control={<Radio />} label={item.name} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                            <Box>
                                <FormLabel>Giá tiền</FormLabel>
                                <Slider
                                    value={[minPrice, maxPrice]}
                                    color="warning"
                                    valueLabelDisplay="auto"
                                    step={1000000}
                                    marks
                                    min={productsPagination?.minPrice}
                                    max={productsPagination?.maxPrice}
                                    onChange={handlePriceChange}
                                />
                            </Box>
                            <Button sx={{
                                borderRadius: '4px',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }} variant="contained" color="primary"
                                onClick={() => { handleResetFilter() }} >
                                Làm mới
                            </Button>
                        </Stack>
                    </Grid>
                    {isLoading === true ?
                        <Grid item xs={12} md={9} sm={12} >
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
                        </Grid> :
                        <Grid item xs={12} md={9} sm={12} >
                            <Box sx={{ width: 1, mb: 2 }}>
                                <Box sx={{
                                    display: "flex",
                                    width: 1,
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <Box>
                                        <FormControl>
                                            <InputLabel id="sort-select-label">Sắp xếp theo</InputLabel>
                                            <Select
                                                labelId="sort-select-label"
                                                id="sort-select"
                                                value={sortOption}
                                                onChange={(event) => setSortOption(event.target.value)}
                                            >
                                                <MenuItem value="az">Tên tăng dần</MenuItem>
                                                <MenuItem value="za">Tên giảm dần</MenuItem>
                                                <MenuItem value="priceAsc">Giá tăng dần</MenuItem>
                                                <MenuItem value="priceDesc">Giá giảm dần</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: 'center',
                                            borderRadius: '4px',
                                            padding: '4px',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <InputBase
                                            value={query}
                                            onChange={handleSearchChange}
                                            placeholder="Tìm kiếm..."
                                            sx={{ width: 1, fontWeight: 'bold' }}
                                        />
                                        <IconButton sx={{ color: `${Colors.black}` }} >
                                            <SearchIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            {
                                filteredProducts.length === 0 ?
                                    <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                                        Không có sản phẩm nào khớp với bộ lọc.
                                    </Typography>
                                    :
                                    <Grid container spacing={1} sx={{ mt: 2 }}>
                                        {
                                            filteredProducts.length !== 0 && filteredProducts.map((item, idx) => {
                                                return (
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
                                                                    e.preventDefault()
                                                                    handleNavigateToCart(item)
                                                                }} variant="contained" >
                                                                    Mua ngay
                                                                </Button>
                                                            </CardActions>
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
                                    </Grid>
                            }
                        </Grid>
                    }
                </Grid >
            </Container >
        </>
    )
}

export default UserProductList