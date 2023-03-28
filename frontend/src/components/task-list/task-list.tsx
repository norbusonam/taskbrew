import React, { useState } from 'react';
import { Task } from '../../types';
import { TaskListHeader } from './task-list-header';
import { TaskListItem } from './task-list-item';

type TaskListProps = {
  header: string;
  subheader?: string;
  tasks: Task[];
  onCreateTask: (title: string) => void;
  indicatorColor?: 'primary' | 'secondary';
  hideCompleted?: boolean;
  indicator?: string;
  isDisabled?: boolean;
};

export const TaskList: React.FC<TaskListProps> = props => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isNewTaskFocused, setIsNewTaskFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const onCreateTask = () => {
    setIsNewTaskFocused(false);
    if (newTaskTitle) {
      props.onCreateTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const checkForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCreateTask();
    }
  };

  return (
    <div className="mb-4">
      <TaskListHeader
        header={props.header}
        subheader={props.subheader}
        isDisabled={props.isDisabled}
        indicatorColor={props.indicatorColor}
        indicator={props.indicator}
      />
      <div
        className="card card-compact bg-base-200 shadow-md min-h-[32rem]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}>
        <div className="card-body gap-0">
          {props.tasks
            .sort((a, b) => a.order - b.order)
            .filter(task => !props.hideCompleted || !task.completed)
            .map(task => (
              <TaskListItem key={task.id} task={task} />
            ))}
          <div className={`flex transition-opacity ${!isHovering && !isNewTaskFocused && 'opacity-0'}`}>
            <input
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              type="text"
              className="input input-ghost w-full flex-shrink text-xs p-2 focus:outline-none"
              onBlur={onCreateTask}
              onKeyDown={checkForEnter}
              onFocus={() => setIsNewTaskFocused(true)}
              placeholder="Create a new task"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
