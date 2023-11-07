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
                Home
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                return last ? (
                    <Typography variant='h6' color="text.primary" key={to}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) :
                    (
                        <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                            {breadcrumbNameMap[to]}
                        </LinkRouter>
                    );
            })}
        </Breadcrumbs>
    );
}

export default function MyBreadcrumb() {
    const location = useLocation();
    const isHomePage = location.pathname !== '/';
    return (
        isHomePage &&
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
            <Routes>
                <Route path="*" element={<Page />} />
            </Routes>
        </Box>
    );
}