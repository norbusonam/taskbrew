import { addList, removeList, setLists, updateList } from '../slices/list-slice';
import { RootState } from '../store';
import { List } from '../types';
import { useAppDispatch, useAppSelector } from './use-redux';

export const useLists = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state: RootState) => state.list.lists);

  const onGetLists = (lists: List[]) => dispatch(setLists(lists));
  const onCreateList = (list: List) => dispatch(addList(list));
  const onDeleteList = (id: string) => dispatch(removeList(id));
  const onUpdateList = (list: List) => dispatch(updateList(list));

  return { lists, onGetLists, onCreateList, onDeleteList, onUpdateList };
};
