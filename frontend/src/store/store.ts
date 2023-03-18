import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth-slice';
import todoReducer from '../slices/todo-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
