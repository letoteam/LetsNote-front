import axios
    // , {AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType}
     from 'axios';

export const API_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
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