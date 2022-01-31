 import axios
    // , {AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType}
     from 'axios';
 import {AuthResponse} from "../../models/response/AuthResponse";

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
});

api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if(error.response.state == 401) {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        }catch (e) {
            console.log(e);
        }
    }
});

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