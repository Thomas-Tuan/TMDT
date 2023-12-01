import axiosFile from "./axiosFile";

const paymentApi = {
    createPaymentWithVnPay(data) {
        const url = `/Payments/CreatePaymentWithVnPay`;
        return axiosFile.post(url, data);
    },
    createPaymentWithPaypal(data) {
        const url = `/Payments/CreatePaymentWithPaypal`;
        return axiosFile.post(url, data);
    },
}
export default paymentApi;