import { useEffect, useState } from 'react';
import productApi from '../api/productApi';

const usePaginationProducts = (page) => {
    const [productsPagination, setProductsPagination] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchProductListPagination(page);
    }, [page])

    const fetchProductListPagination = async (page) => {
        try {
            const params = {
                page: page,
            };
            const response = await productApi.getListPagination(params);
            setIsLoading(false);
            setProductsPagination(response);
            setDataFetched(true);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }

    return {
        productsPagination,
        isLoading,
        dataFetched,
    };
}

export default usePaginationProducts;