import api from '../ApiBase';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../../models/response/AuthResponse';

export default class AuthService {
  static async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/sign-up', { name, email, password });
  }

  static async logIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/login', { email, password });
  }

  static async logOut(): Promise<void> {
    return api.post('/logout');
  }

  static async sendResetLink(email: string): Promise<AxiosResponse> {
    return api.put('/recover/forgot-password', { email });
  }

  static async resetPassword(
    resetLink: string,
    newPassword: string
  ): Promise<AxiosResponse> {
    return api.put('/recover/reset-password', { resetLink, newPassword });
  }
}
