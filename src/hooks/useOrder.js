import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import orderApi from '../api/orderApi';

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleDeleteOrder = async (id) => {
        try {

            await orderApi.remove(id);
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
            await orderApi.update(values);
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
        fetchOrderList();
    }, [])

    const fetchOrderList = async () => {
        try {
            const response = await orderApi.getAll();
            setIsLoading(false);
            setOrders(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    return {
        orders,
        isLoading,
        setOrders,
        handleSubmit,
        handleDeleteOrder
    };
}

export default useOrders;