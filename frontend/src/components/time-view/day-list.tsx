import React from 'react';
import { api } from '../../api';
import { useTasks } from '../../hooks';
import { Task } from '../../types';
import { TaskList } from '../task-list';
import { getDayOfWeek, isInPast, isToday, isTomorrow } from './utils';

type DayListProps = {
  date: Date;
  tasks: Task[];
  hideCompleted?: boolean;
};

export const DayList: React.FC<DayListProps> = props => {
  const { onCreateTask } = useTasks();

  const handleCreateTask = (title: string) => {
    api
      .createTask({
        title,
        due: props.date,
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
      header={getDayOfWeek(props.date)}
      subheader={props.date.toLocaleDateString()}
      tasks={props.tasks}
      onCreateTask={handleCreateTask}
      isDisabled={isInPast(props.date)}
      hideCompleted={props.hideCompleted}
      indicator={
        isToday(props.date) ? 'Today' : isTomorrow(props.date) ? 'Tomorrow' : isInPast(props.date) ? 'Past' : undefined
      }
      indicatorColor={isToday(props.date) ? 'primary' : isTomorrow(props.date) ? 'secondary' : undefined}
    />
  );
};
