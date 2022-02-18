import api from '../http/HttpBase/ApiBase';
import { AxiosResponse } from 'axios';
import { NotesResponse } from '../models/response/NotesResponse';
import { INote } from '../models/INote';

export default class NotesService {
  //TODO: replace <any> to Note Response type
  static async getUserNotes(): Promise<AxiosResponse<INote[]>> {
    return api.get('notes');
  }
  static async getUserLabels(): Promise<AxiosResponse<string[]>> {
    return api.get('labels');
  }
  static async toggleNotePrivacy(
    noteId: number
  ): Promise<AxiosResponse<INote>> {
    return api.put('toggle-privacy', { noteId });
  }
  static async createNote(
    title: string,
    content: string,
    isPrivate: boolean,
    labels: string[]
  ): Promise<AxiosResponse<INote>> {
    return api.post('create-note', {
      title,
      content,
      isPrivate,
      labels,
    });
  }
  static async updateNote(
    noteId: number,
    title: string,
    content: string,
    isPrivate: boolean,
    labels: string[]
  ): Promise<AxiosResponse<INote>> {
    return api.put('update-note', {
      noteId,
      title,
      content,
      isPrivate,
      labels,
    });
  }
  static async deleteNote(noteId: number): Promise<AxiosResponse> {
    return api.delete(`delete-note/:${noteId}`);
  }
}
