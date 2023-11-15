import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import {
    Link,
    Route,
    Routes,
    useLocation
} from 'react-router-dom';
import productApi from '../../api/productApi';
import { Colors } from '../../styles/theme';
import { ImagesBg } from '../../asset';


function LinkRouter(props) {
    return <Typography variant='h6' {...props} component={Link} />;
}

function Page() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const hasId = pathnames[1] ? pathnames[1] : undefined;

    const dynamicBreadcrumbKey = hasId ? `/product/${hasId}` : null;
    const [productDetail, setProductDetail] = useState({})

    const breadcrumbNameMap = {
        '/contact': 'Liên hệ',
        '/about': 'Giới thiệu',
        '/cart': 'Giỏ hàng',
        '/product': 'Danh sách sản phẩm',
        [dynamicBreadcrumbKey]: productDetail.name,
    };

    useEffect(() => {
        if (hasId !== undefined) {
            const getProductById = async (id) => {
                try {
                    const response = await productApi.get(id);
                    setProductDetail(response);
                } catch (error) {
                    console.error('Lỗi không được lấy dữ liệu sản phẩm:', error);
                }
            }
            getProductById(hasId);
        }
    }, [hasId]);

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter underline="hover" color="inherit" to="/">
                Trang chủ
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return last ? (
                    <Typography variant='h6' color="text.primary" key={to}>
                        {breadcrumbNameMap[to] ? breadcrumbNameMap[to] : null}
                    </Typography>
                ) :
                    (
                        <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                            {breadcrumbNameMap[to] ? breadcrumbNameMap[to] : null}
                        </LinkRouter>
                    );
            })}
        </Breadcrumbs>
    );
}

const bannerData = [
    {
        Id: "contact",
        Title: "Liên hệ",
        Image: ImagesBg.contactBg
    },
    {
        Id: "about",
        Title: "Giới thiệu",
        Image: ImagesBg.aboutBg
    },
    {
        Id: "product",
        Title: "Sản phẩm ",
        Image: ImagesBg.productBg
    },

]
export default function MyBreadcrumb() {
    const location = useLocation();
    const isHomePage = location.pathname !== '/' && location.pathname !== '/home' && location.pathname !== '/TMDT';
    const isCartPage = location.pathname !== '/cart';
    const isLoginPage = location.pathname !== '/login';
    const isSuccessPage = location.pathname !== '/success';
    const pathnames = location.pathname.split('/').filter((x) => x);
    if (pathnames[1] !== undefined) {
        return (
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                <Routes>
                    <Route path="*" element={<Page />} />
                </Routes>
            </Box>
        )
    }
    const newBanner = bannerData.filter(x => x.Id === pathnames[0])
    return (
        <>
            {isHomePage && isCartPage && isLoginPage && isSuccessPage &&
                <Box sx={{
                    height: "250px",
                    position: 'relative',
                }} >
                    {
                        newBanner.length !== 0 && newBanner.map((item, idx) => (
                            <Box key={idx} sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundImage: `url(${item.Image})`,
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
                                    {item.Title}
                                </Typography>
                            </Box>
                        ))
                    }
                </Box>
            }
            {isHomePage && isLoginPage && isSuccessPage &&
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                    <Routes>
                        <Route path="*" element={<Page />} />
                    </Routes>
                </Box>
            }
        </>
    );
}