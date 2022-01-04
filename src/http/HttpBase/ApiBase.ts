 import axios
    // , {AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType}
     from 'axios';

export const API_URL = 'http://localhost:5000/api/';

const api = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config:any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default api;

// export class ApiBase {
//     instance: AxiosInstance;
//     defaultHeaders: any = {
//         'Access-Control-Allow-Origin': '*',
//     };
//     responseType: ResponseType = 'json';
//
//     constructor(baseUrl: string = API_URL) {
//         this.instance = axios.create({
//             baseURL: baseUrl,
//             headers: this.defaultHeaders,
//             responseType: this.responseType
//         })
//     }
//
// }