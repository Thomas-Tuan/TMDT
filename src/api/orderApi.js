import axiosFile from "./axiosFile";

const orderApi = {
    create(data) {
        const url = `/Orders/CreateOrder`;
        return axiosFile.post(url, data);
    },

}
export default orderApi;