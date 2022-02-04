import api from "../http/HttpBase/ApiBase";
import {AxiosResponse} from 'axios';

export default class NotesService{
    //TODO: replace <any> to Note Response type
    static async getUserNotes():Promise<AxiosResponse<any>> {
        return api.get('all-notes')
    }
}