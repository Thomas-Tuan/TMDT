import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import branchApi from '../api/branchApi';

const useBranches = () => {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleDeleteBranch = async (id) => {
        try {
            await branchApi.remove(id);
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
                await branchApi.add(values);
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
                await branchApi.update(values);
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
        fetchBranchList();
    }, [])

    const fetchBranchList = async () => {
        try {
            const response = await branchApi.getAll();
            setIsLoading(false);
            setBranches(response);
        } catch (error) {
            console.log("Error to fetch API: ", error.message);
        }
    }
    return {
        branches,
        setBranches,
        isLoading,
        handleSubmit,
        handleDeleteBranch
    };
}

export default useBranches;