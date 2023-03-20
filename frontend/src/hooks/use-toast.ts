import { Toast } from '../types';
import { useAppDispatch, useAppSelector } from './use-redux';
import { addToast, removeToast } from '../slices/toast-slice';

export const useToast = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(state => state.toast.toasts);

  const makeToast = (toast: Toast) => {
    dispatch(addToast(toast));
    setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, toast.duration);
  };

  const deleteToast = (id: string) => {
    dispatch(removeToast(id));
  };

  return { toasts, makeToast, deleteToast };
};
