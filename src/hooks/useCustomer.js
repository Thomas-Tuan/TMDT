import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerApi from '../api/customerApi';

const useCustomers = () => {

    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            await customerApi.update(values);
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
            if (values.isUser) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
            else
                navigate('/admin/customer');
        }
        catch (err) {
            const errorMessage = err.response.data.errorMessage;
            toast.error(errorMessage, {
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

export default useCustomers;