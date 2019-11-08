import axios from 'axios';
import qs from 'qs';
import router from '../router/router';
import { Message } from 'element-ui';
// axios 配置
axios.defaults.timeout = 120000;
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
axios.interceptors.request.use(
    request => {
        if (request.data) {
            request.data = qs.stringify(request.data, {arrayFormat: 'brackets'});
        }
        return request;
    }
    // config => {
    //     if (localStorage.token) { //判断token是否存在
    //         config.headers.Authorization = localStorage.token;  //将token设置成请求头
    //     }
    //     return config;
    // },
    // err => {
    //     return Promise.reject(err);
    // }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === -1) {
            router.push({
                path: '/login',
            });
        } else if (response.data.code === 1) {
            Message.warning(response.data.msg);
        }  else if (response.data.code === 555) {
            Message.warning(response.data.msg);
        } else {
            return Promise.resolve(response.data);
        }
        
    },
    error => {
        return Promise.reject(error);
    }
);
export default axios;