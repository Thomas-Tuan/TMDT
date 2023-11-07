import { useEffect, useState } from 'react';
import categoryApi from '../api/categoryApi';
import { toast } from 'react-toastify';
import useProducts from './useProducts';

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { products } = useProducts();
    const checkCates = (Id) => {
        const getProductList = products.filter((product) => product.categoryId === Id);
        const productName = getProductList.map((product) => product.name);
        if (getProductList) {
            return productName;
        }
    };


    const handleDeleteCate = async (id) => {
        try {

            await categoryApi.remove(id);
            toast.info('Xóa thành công', {
                position: "top-right",
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
            }, 1000)
        }
        catch {
            toast.error('Xóa thất bại do kết nối không ổn định', {
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
    }

    const handleSubmit = async (values) => {
        try {
            if (parseInt(values.Id) === 0) {

                await categoryApi.add(values);
                toast.success('Thêm thành công', {
                    position: "top-right",
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
                }, 1000)
            }
            else {
                await categoryApi.update(values);
                toast.warning('Cập nhật thành công', {
                    position: "top-right",
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
                }, 1000)
            }
        }
        catch {
            toast.error('Lỗi kết nối không ổn định', {
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

    };

    useEffect(() => {
        setIsLoading(true);
        fetchCategoryList();
    }, [])

    const fetchCategoryList = async () => {
        try {
            const response = await categoryApi.getAll();
            setIsLoading(false);
            setCategories(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    return {
        checkCates,
        categories,
        isLoading,
        setCategories,
        handleSubmit,
        handleDeleteCate
    };
}

export default useCategories;