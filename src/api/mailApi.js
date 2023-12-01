import axiosFile from "./axiosFile";

const mailApi = {
    sendMail(data) {
        const url = `/SendMail/SendMail`;
        return axiosFile.post(url, data);
    },
    confirmOtp(data) {
        const url = `/SendMail/ConfirmOtp`;
        return axiosFile.post(url, data);
    },
    resetPassword(data) {
        const url = `/SendMail/ResetPassword`;
        return axiosFile.post(url, data);
    },

}
export default mailApi;