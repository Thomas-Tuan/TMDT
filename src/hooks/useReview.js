import { toast } from 'react-toastify';
import reviewApi from '../api/reviewApi';

const useReviews = () => {

    const handleSubmit = async (values) => {
        try {
            await reviewApi.add(values);
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

    return {
        handleSubmit,
    };
}

export default useReviews;