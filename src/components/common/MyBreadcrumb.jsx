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
import { Container } from '@mui/material';


function LinkRouter(props) {
    return <Typography variant='body1' {...props} component={Link} />;
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
        '/searchOrder': 'Tra cứu',
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
                    <Typography fontWeight={500} variant='body1' color="text.primary" key={to}>
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

export default function MyBreadcrumb() {
    return (
        <Container maxWidth="lg" disableGutters>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: "flex-start", alignItems: "center" }}>
                <Routes>
                    <Route path="*" element={<Page />} />
                </Routes>
            </Box>
        </Container>
    );
}