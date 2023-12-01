import { toast } from 'react-toastify';
import contactApi from '../api/contactApi';

const useContacts = () => {
    const handleDeleteContact = async (id) => {
        try {

            await contactApi.remove(id);
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
            await contactApi.add(values);
            toast.success('Chúng tôi sẽ liên hệ và tư vấn cho bạn sớm nhất có thể !', {
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
            }, 2000)
        }
        catch {
            toast.error('Lỗi không gửi đơn liên hệ được', {
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
        handleDeleteContact
    };
}

export default useContacts;