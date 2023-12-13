import axiosFile from "./axiosFile";

const favouriteProductApi = {
    getListPagination(params) {
        const url = '/FavouriteProducts/GetList';
        return axiosFile.get(url, { params });
    },
    getById(id) {
        const url = `/FavouriteProducts/GetById/${id}`;
        return axiosFile.get(url);
    },
    add(data) {
        const url = `/FavouriteProducts/AddNew`;
        return axiosFile.post(url, data);
    },
    remove(params) {
        const url = `/FavouriteProducts/Delete`;
        return axiosFile.delete(url, { params });
    },
}
export default favouriteProductApi;