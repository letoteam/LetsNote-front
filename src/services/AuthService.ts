import api from "../http/HttpBase/ApiBase";
import {AxiosResponse} from 'axios';

export default class AuthService{
    static async signUp(email: string, name: string, password: string): Promise<AxiosResponse> {
        return api.post('/login', {email, name, password})
    }
}