import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import UserService from '../../http/services/UserService';
import { RootState } from '../store';

type UserData = IUser & { notesNumber: number };

type InitialState = {
  data: (IUser[] & { notesNumber: number }) | [];
  status: 'idle' | 'loading' | 'succeeded';
};

const initialState: InitialState = {
  data: [],
  status: 'idle',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUsers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload?.data) {
        const users = action.payload?.data.users;
        state.data = users;
      } else {
        state.data = [];
      }
      state.status = 'succeeded';
    });
  },
});

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  try {
    return await UserService.getUsers();
  } catch (e) {
    console.log(e);
  }
});

export const selectUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: number) =>
  state.users.data.find((user) => user.id === userId);
export default usersSlice.reducer;
