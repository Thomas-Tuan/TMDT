import axios from "axios";
import queryString from "query-string";

const axiosFile = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosFile.interceptors.request.use((config) => {
    const storedToken = sessionStorage.getItem('adminAccount');
    const accountInfo = JSON.parse(storedToken);

    if (accountInfo?.token) {
        config.headers.Authorization = `Bearer ${accountInfo.token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    });

// Add a response interceptor
axiosFile.interceptors.response.use(function (response) {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosFile;