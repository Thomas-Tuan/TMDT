import axiosFile from "./axiosFile";

const customerApi = {
    getAllCustomer(params) {
        const url = '/Customers/GetAll';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Customers/GetById/${id}`;
        return axiosFile.get(url);
    },

    update(data) {
        const url = `/Customers/Update/${data.customerId}`;
        return axiosFile.put(url, data);
    },

}
export default customerApi;