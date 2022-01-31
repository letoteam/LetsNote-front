import api from "../http/HttpBase/ApiBase";
import {AxiosResponse} from 'axios';

export default class NotesService{
    static async getUserNotes():Promise<AxiosResponse<any>> {
        return api.get('user-notes')
    }
}