import React from 'react';
import { useTasks } from '../../hooks';
import { List, Task } from '../../types';
import { TaskList } from '../task-list';

type ListViewListProps = {
  list: List;
  hideCompleted: boolean;
  tasks: Task[];
};

export const ListViewList: React.FC<ListViewListProps> = props => {
  const { createTask } = useTasks();

  const handleCreateTask = (title: string) => {
    createTask({
      title,
      listId: props.list.id,
      order: props.tasks.length,
    });
  };

  return (
    <TaskList
      header={props.list.title}
      tasks={props.tasks.filter(task => task.listId === props.list.id)}
      hideCompleted={props.hideCompleted}
      onCreateTask={title => handleCreateTask(title)}
    />
  );
};
