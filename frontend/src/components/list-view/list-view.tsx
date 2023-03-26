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
  const { lists, getAllLists, createList } = useLists();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateList = (title: string) => {
    createList({
      title,
      order: lists.length,
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
          {lists &&
            lists
              .sort((a, b) => a.order - b.order)
              .map(list => <ListViewList key={list.id} list={list} tasks={props.tasks} />)}
        </div>
      )}
      <CreateListButton onCreateList={handleCreateList} />
    </div>
  );
};
