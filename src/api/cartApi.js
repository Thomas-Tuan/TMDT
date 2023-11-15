import axiosFile from "./axiosFile";

const cartApi = {
    addToCart(data) {
        const url = `/Carts/AddToCart`;
        return axiosFile.post(url, data);
    },
    getById(id) {
        const url = `/Carts/GetById/${id}`;
        return axiosFile.get(url);
    },
}
export default cartApi;