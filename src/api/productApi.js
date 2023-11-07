import axiosFile from "./axiosFile";

const productApi = {
    getAll(params) {
        const url = '/Products/GetList';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Products/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/Products/AddNew`;
        return axiosFile.post(url, data);
    },
    update(data) {
        const url = `/Products/Update/${data.Id}`;
        return axiosFile.put(url, data);
    },
    remove(id) {
        const url = `/Products/Delete/${id}`;
        return axiosFile.delete(url);
    },
}
export default productApi;