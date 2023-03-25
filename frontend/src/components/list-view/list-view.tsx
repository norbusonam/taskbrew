import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { useLists } from '../../hooks';
import { Task } from '../../types';
import { CreateListButton } from './create-list-button';
import { ListViewList } from './list-view-list';

type ListViewProps = {
  tasks: Task[];
};

export const ListView: React.FC<ListViewProps> = props => {
  const { lists, onGetLists, onCreateList } = useLists();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllLists = () => {
    setIsLoading(true);
    api
      .getLists()
      .then(res => {
        onGetLists(res.data.lists);
      })
      .catch(() => {
        console.log('Could not get lists');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateList = (title: string) => {
    api
      .createList({
        title,
        order: lists.length,
      })
      .then(res => {
        onCreateList(res.data.list);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : lists && lists.length === 0 ? (
        <div>No lists 😢</div>
      ) : (
        <div className="flex flex-row w-full gap-2 p-2">
          {lists && lists.map(list => <ListViewList key={list.id} list={list} tasks={props.tasks} />)}
        </div>
      )}
      <CreateListButton onCreateList={handleCreateList} />
    </div>
  );
};
