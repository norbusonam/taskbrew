import { createSlice } from '@reduxjs/toolkit';
import { List } from '../types';

type ListState = {
  lists: List[];
};

type ListReducer = {
  setLists: (state: ListState, action: { payload: List[] }) => void;
  addList: (state: ListState, action: { payload: List }) => void;
  removeList: (state: ListState, action: { payload: string }) => void;
  updateList: (state: ListState, action: { payload: List }) => void;
};

export const listSlice = createSlice<ListState, ListReducer>({
  name: 'list',
  initialState: {
    lists: [],
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    updateList: (state, action) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id);
      state.lists[index] = action.payload;
    },
  },
});

export const { setLists, addList, removeList, updateList } = listSlice.actions;

export default listSlice.reducer;
