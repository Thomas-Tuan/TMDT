import axios from "axios";
import queryString from "query-string";
const axiosFile = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'content-type': 'application/json' },
    paramsSerializer: params => queryString.stringify(params),
});
axiosFile.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
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