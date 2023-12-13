import axiosFile from "./axiosFile";

const userApi = {
    getAllUserCount(params) {
        const url = '/Users/GetAllUserCount';
        return axiosFile.get(url, { params });
    },
    getAllUser(params) {
        const url = '/Users/GetAllUsers';
        return axiosFile.get(url, { params });
    },
    getAllRole(params) {
        const url = '/Users/GetAllRoles';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Users/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/Users/AddNew`;
        return axiosFile.post(url, data);
    },
    update(data) {
        const url = `/Users/Update/${data.Id}`;
        return axiosFile.put(url, data);
    },
    remove(id) {
        const url = `/Users/Delete/${id}`;
        return axiosFile.delete(url);
    },
}
export default userApi;