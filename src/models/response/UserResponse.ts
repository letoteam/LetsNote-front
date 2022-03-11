import { IUser } from '../IUser';

export type UsersResponse = {
  users: IUser[] & { notesNumber: number };
};
