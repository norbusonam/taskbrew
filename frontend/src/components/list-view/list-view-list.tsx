import React from 'react';
import { api } from '../../api';
import { useTasks } from '../../hooks';
import { List, Task } from '../../types';
import { TaskList } from '../task-list';

type ListViewListProps = {
  list: List;
  tasks: Task[];
};

export const ListViewList: React.FC<ListViewListProps> = props => {
  const { onCreateTask } = useTasks();

  const handleCreateTask = (title: string) => {
    api
      .createTask({
        title,
        listId: props.list.id,
        order: props.tasks.length,
      })
      .then(res => {
        onCreateTask(res.data.task);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <TaskList
      header={props.list.title}
      tasks={props.tasks.filter(task => task.listId === props.list.id)}
      onCreateTask={title => handleCreateTask(title)}
    />
  );
};
