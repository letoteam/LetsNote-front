import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/auth/authSlice';
import notesReducer from '../components/dashboard/notesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
