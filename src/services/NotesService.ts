import api from "../http/HttpBase/ApiBase";
import {AxiosResponse} from 'axios';
import {NotesResponse} from "../models/response/NotesResponse";
import {INote} from "../models/INote";

export default class NotesService{
    //TODO: replace <any> to Note Response type
    static async getUserNotes():Promise<AxiosResponse<INote[]>> {
        return api.get('notes')
    }
    static async getUserLabels():Promise<AxiosResponse<string[]>>{
        return api.get('labels')
    }
    static async toggleNotePrivacy(noteId: number):Promise<AxiosResponse<INote>>{
        return api.put('toggle-privacy',{noteId})
    }
}