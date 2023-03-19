import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
};

type AuthReducer = {
  authenticated: (state: AuthState, action: { payload: { user: User; token: string } }) => void;
  updateUser: (state: AuthState, action: { payload: { user: User } }) => void;
  logout: (state: AuthState) => void;
};

export const authSlice = createSlice<AuthState, AuthReducer>({
  name: 'auth',
  initialState: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
      };
    }
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  },
  reducers: {
    authenticated: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authenticated, updateUser, logout } = authSlice.actions;

export default authSlice.reducer;
