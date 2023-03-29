import React, { useEffect, useState } from 'react';
import { useLists, useNumLists } from '../../hooks';
import { Task } from '../../types';
import { LeftNav } from './left-nav';
import { RightNav } from './right-nav';
import { ListViewList } from './list-view-list';

type ListViewProps = {
  tasks: Task[];
};

export const ListView: React.FC<ListViewProps> = props => {
  const { lists, getAllLists, createList } = useLists();
  const [hideCompleted, setHideCompleted] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const { numLists } = useNumLists();

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
      {lists && lists.length === 0 ? (
        <div>No lists 😢</div>
      ) : (
        <div className="flex flex-row w-full gap-2 p-2">
          <LeftNav onLeftClicked={() => setStartIndex(prev => Math.max(prev - 1, 0))} onCreateList={handleCreateList} />
          {[...Array(numLists)].map((_, i) => {
            const list = lists[startIndex + i];
            return (
              <div className="flex-1" key={list.id}>
                <ListViewList
                  list={list}
                  hideCompleted={hideCompleted}
                  tasks={props.tasks.filter(task => task.listId === list.id)}
                />
              </div>
            );
          })}
          <RightNav
            onRightClicked={() => setStartIndex(prev => Math.min(prev + 1, lists.length - numLists))}
            hideCompleted={hideCompleted}
            setHideCompleted={setHideCompleted}
          />
        </div>
      )}
    </div>
  );
};
