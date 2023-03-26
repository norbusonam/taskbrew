import { api, CreateListBody, UpdateListBody } from '../api';
import { listActions } from '../slices/list-slice';
import { RootState } from '../store';
import { useAppDispatch, useAppSelector } from './use-redux';

export const useLists = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state: RootState) => state.list.lists);

  const getAllLists = () => {
    api
      .getLists()
      .then(res => {
        dispatch(listActions.setLists(res.data.lists));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createList = (list: CreateListBody) => {
    api
      .createList(list)
      .then(res => {
        dispatch(listActions.addList(res.data.list));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteList = (id: string) => {
    api
      .deleteList(id)
      .then(() => {
        dispatch(listActions.removeList(id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateList = (id: string, list: UpdateListBody) => {
    api
      .updateList(id, list)
      .then(res => {
        dispatch(listActions.updateList(res.data.list));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return { lists, getAllLists, createList, deleteList, updateList };
};
