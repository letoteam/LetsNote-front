import api from "../http/HttpBase/ApiBase";
import {AxiosResponse} from 'axios';

export default class AuthService{
    static async signUp(name: string, email: string, password: string): Promise<AxiosResponse> {
        return api.post('/sign-up', {name, email, password})
    }

    static async logIn(email: string, password: string):Promise<AxiosResponse> {
        return api.post('/login',{email, password})
    }

    static async Test():Promise<AxiosResponse>{
        return api.get('https://jsonplaceholder.typicode.com/todos/1');
    }
}