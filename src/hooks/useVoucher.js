import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import voucherApi from '../api/voucherApi';

const useVoucher = () => {
    const navigate = useNavigate();

    const handleDeleteVoucher = async (id) => {
        try {
            await voucherApi.remove(id);
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
                if (values.amountDiscount === '' || values.amountDiscount === 0) {
                    const newValues = { ...values, amountDiscount: 0, discountType: 1 }
                    await voucherApi.add(newValues);
                }
                else {
                    const newValues = { ...values, percentageDiscount: 0, discountType: 0 }
                    await voucherApi.add(newValues);
                }
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
                navigate('/admin/voucher');
            }
            else {
                if (values.amountDiscount === '' || values.amountDiscount === 0) {
                    const newValues = { ...values, amountDiscount: 0, discountType: 1 }
                    await voucherApi.update(newValues);
                }
                else {
                    const newValues = { ...values, percentageDiscount: 0, discountType: 0 }
                    await voucherApi.update(newValues);
                }
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
                navigate('/admin/voucher');
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

    return {
        handleSubmit,
        handleDeleteVoucher,
    };
}

export default useVoucher;