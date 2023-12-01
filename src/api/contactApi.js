import axiosFile from "./axiosFile";

const contactApi = {
    getAll(params) {
        const url = '/Contacts/GetList';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Contacts/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/Contacts/CreateNew`;
        return axiosFile.post(url, data);
    },
    remove(id) {
        const url = `/Contacts/Delete/${id}`;
        return axiosFile.delete(url);
    },
}
export default contactApi;