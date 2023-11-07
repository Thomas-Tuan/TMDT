import axiosFile from "./axiosFile";

const branchApi = {
    getAll(params) {
        const url = '/Branches/GetList';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Branches/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/Branches/AddNew`;
        return axiosFile.post(url, data);
    },
    update(data) {
        const url = `/Branches/Update/${data.Id}`;
        return axiosFile.put(url, data);
    },
    remove(id) {
        const url = `/Branches/Delete/${id}`;
        return axiosFile.delete(url);
    },
}
export default branchApi;