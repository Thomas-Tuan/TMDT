import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../api/userApi';

const useUsers = () => {

    const navigate = useNavigate();

    const handleDeleteUser = async (id) => {
        try {
            await userApi.remove(id);
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
            if (values.Id === '') {
                await userApi.add(values);
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
                navigate('/admin/user');
            }
            else {
                await userApi.update(values);
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
                navigate('/admin/user');
            }
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
        handleDeleteUser,
    };
}

export default useUsers;