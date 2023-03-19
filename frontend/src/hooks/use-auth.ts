import { useNavigate } from 'react-router-dom';
import { authenticated, logout, updateUser } from '../slices/auth-slice';
import { User } from '../types';
import { useAppDispatch, useAppSelector } from './use-redux';

export const useAuth = () => {
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAuthenticated = (user: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(authenticated({ user, token }));
    navigate('/home');
  };

  const onUpdateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(updateUser({ user }));
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    token,
    onAuthenticated,
    onUpdateUser,
    onLogout,
  };
};
