import axiosFile from "./axiosFile";

const orderApi = {
    getAll(params) {
        const url = '/Orders/GetList';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Orders/GetById/${id}`;
        return axiosFile.get(url);
    },
    create(data) {
        const url = `/Orders/CreateOrder`;
        return axiosFile.post(url, data);
    },
    update(data) {
        const url = `/Orders/Update/${data.Id}`;
        return axiosFile.put(url, data);
    },
    remove(id) {
        const url = `/Orders/Delete/${id}`;
        return axiosFile.delete(url);
    },

}
export default orderApi;