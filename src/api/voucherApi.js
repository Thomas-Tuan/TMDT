import axiosFile from "./axiosFile";

const voucherApi = {
    getAll(params) {
        const url = '/Vouchers/GetList';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Vouchers/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/Vouchers/AddNew`;
        return axiosFile.post(url, data);
    },
    update(data) {
        const url = `/Vouchers/Update/${data.Id}`;
        return axiosFile.put(url, data);
    },
    remove(id) {
        const url = `/Vouchers/Delete/${id}`;
        return axiosFile.delete(url);
    },
    apply(data) {
        const url = `/Vouchers/ApplyVoucher`;
        return axiosFile.post(url, data);
    },
}
export default voucherApi;