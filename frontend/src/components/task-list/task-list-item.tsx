import React, { useState } from 'react';
import { EditPencil, Trash } from 'iconoir-react';
import ReactMarkdown from 'react-markdown';
import { useTasks } from '../../hooks';
import { Task } from '../../types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

type TaskListItemProps = {
  task: Task;
};

export const TaskListItem: React.FC<TaskListItemProps> = props => {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { updateTask, deleteTask } = useTasks();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.task.id });
  const dragStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleToggleCompleted = () => {
    updateTask(props.task.id, {
      completed: !props.task.completed,
    });
  };

  const handleDelete = () => {
    deleteTask(props.task.id);
  };

  const handleEditTitle = (title: string) => {
    setIsEditing(false);

    if (title && title !== props.task.title) {
      updateTask(props.task.id, {
        title,
      });
    }
  };

  const checkForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditTitle(e.currentTarget.value);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="flex"
      ref={setNodeRef}
      style={dragStyles}
      {...attributes}
      {...listeners}>
      {isEditing ? (
        <input
          autoFocus
          type="text"
          className="input w-full text-xs p-2 focus:outline-none"
          onBlur={e => handleEditTitle(e.target.value)}
          onKeyDown={checkForEnter}
          defaultValue={props.task.title}
        />
      ) : (
        <div className="w-full">
          <button
            className={`btn btn-ghost normal-case p-2 text-left w-full text-xs overflow-hidden ${
              isHovering && 'h-auto'
            } ${props.task.completed && 'line-through opacity-50'}`}
            onClick={handleToggleCompleted}>
            <ReactMarkdown>
              {!isHovering || isDragging
                ? `${props.task.title.slice(0, 18)}${props.task.title.length > 18 ? '...' : ''}`
                : props.task.title}
            </ReactMarkdown>
          </button>
        </div>
      )}
      {isHovering &&
        !isEditing &&
        (props.task.completed ? (
          <button className="btn btn-ghost btn-square p-2 text-error" onClick={handleDelete}>
            <Trash className="w-4 h-4" />
          </button>
        ) : (
          <button className="btn btn-ghost btn-square p-2" onClick={() => setIsEditing(true)}>
            <EditPencil className="w-4 h-4" />
          </button>
        ))}
    </div>
  );
};
