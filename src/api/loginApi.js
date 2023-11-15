import axiosFile from "./axiosFile";

const loginApi = {
    signIn(data) {
        const url = `/Accounts/Login`;
        return axiosFile.post(url, data);
    },
    userRegister(data) {
        const url = `/Accounts/Register`;
        return axiosFile.post(url, data);
    },

}
export default loginApi;