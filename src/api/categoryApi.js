import axiosFile from "./axiosFile";

const categoryApi = {
    getAll(params) {
        const url = '/Categories/GetList';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Categories/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/Categories/AddNew`;
        return axiosFile.post(url, data);
    },
    update(data) {
        const url = `/Categories/Update/${data.Id}`;
        return axiosFile.put(url, data);
    },
    remove(id) {
        const url = `/Categories/Delete/${id}`;
        return axiosFile.delete(url);
    },
}
export default categoryApi;