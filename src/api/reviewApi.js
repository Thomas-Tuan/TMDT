import axiosFile from "./axiosFile";

const reviewApi = {
    getListPagination(params) {
        const url = '/Reviews/GetList';
        return axiosFile.get(url, { params });
    },
    get(id) {
        const url = `/Reviews/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/Reviews/AddNew`;
        return axiosFile.post(url, data);
    },
}
export default reviewApi;