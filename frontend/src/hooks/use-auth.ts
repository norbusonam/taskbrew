import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from './use-toast';
import { authenticated, logout, updateUser } from '../slices/auth-slice';
import { User } from '../types';
import { useAppDispatch, useAppSelector } from './use-redux';

export const useAuth = () => {
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { makeToast } = useToast();

  const onAuthenticated = (user: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(authenticated({ user, token }));
    makeToast({
      id: uuidv4(),
      title: 'Hi ' + user.name + ' 👋',
      description: 'You have been logged in successfully',
      type: 'success',
      duration: 5000,
    });
    navigate('/home');
  };

  const onUpdateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(updateUser({ user }));
    makeToast({
      id: uuidv4(),
      title: 'User Updated 👍',
      description: 'User has been updated successfully',
      type: 'info',
      duration: 5000,
    });
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
