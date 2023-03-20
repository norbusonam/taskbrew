import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth-slice';
import todoReducer from '../slices/todo-slice';
import toastReducer from '../slices/toast-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
