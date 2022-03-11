import api from '../ApiBase';
import { AxiosResponse } from 'axios';
import { UsersResponse } from '../../models/response/UserResponse';
import { INote } from '../../models/INote';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<UsersResponse>> {
    return api.get('users');
  }
  static async getUserNotes(userId: number): Promise<AxiosResponse<INote[]>> {
    return api.get(`user-notes/${userId}`);
  }
}
