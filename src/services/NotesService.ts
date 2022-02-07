import api from "../http/HttpBase/ApiBase";
import {AxiosResponse} from 'axios';
import {NotesResponse} from "../models/response/NotesResponse";
import {INote} from "../models/INote";

export default class NotesService{
    //TODO: replace <any> to Note Response type
    static async getUserNotes():Promise<AxiosResponse<INote[]>> {
        return api.get('notes')
    }
}