import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice';
import notesReducer from './slices/notesSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    users: usersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
