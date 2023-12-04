import { useEffect, useState } from 'react';
import reviewApi from '../api/reviewApi';

const usePaginationReviews = (productId, page) => {
    const [reviewsPagination, setReviewsPagination] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        const fetchReviewPagination = async (productId, page) => {
            try {
                setIsLoading(true);
                const params = {
                    productId: productId,
                    page: page,
                };
                const response = await reviewApi.getListPagination(params);
                setReviewsPagination(response);
                setIsLoading(false);
                setDataFetched(true);
            } catch (error) {
                console.log("Error to fetch API: ", error.message);
                setIsLoading(false);
            }
        };
        fetchReviewPagination(productId, page);
    }, [page]);

    return {
        reviewsPagination,
        isLoading,
        dataFetched,
    };
}

export default usePaginationReviews;