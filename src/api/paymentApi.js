import axiosFile from "./axiosFile";

const paymentApi = {
    create(data) {
        const url = `/Payments/CreatePayment`;
        return axiosFile.post(url, data);
    },
}
export default paymentApi;