import { createSlice } from '@reduxjs/toolkit';
import { Toast } from '../types';

type ToastState = {
  toasts: Toast[];
};

type ToastReducer = {
  addToast: (state: ToastState, action: { payload: Toast }) => void;
  removeToast: (state: ToastState, action: { payload: string }) => void;
};

export const toastSlice = createSlice<ToastState, ToastReducer>({
  name: 'toast',
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
