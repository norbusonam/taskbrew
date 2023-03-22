import React, { useState } from 'react';
import { EditPencil, Trash } from 'iconoir-react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { api } from '../../api';
import { useTodos } from '../../hooks';
import { Todo } from '../../types';

type TodoListItemProps = {
  todo: Todo;
};

export const TodoListItem: React.FC<TodoListItemProps> = props => {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { onUpdateTodo, onDeleteTodo } = useTodos();

  const handleToggleCompleted = () => {
    api
      .updateTodo(props.todo.id, {
        completed: !props.todo.completed,
      })
      .then(res => {
        onUpdateTodo(res.data.todo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    api
      .deleteTodo(props.todo.id)
      .then(() => {
        onDeleteTodo(props.todo.id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEditTitle = (title: string) => {
    setIsEditing(false);
    if (title && title !== props.todo.title) {
      api
        .updateTodo(props.todo.id, {
          title,
        })
        .then(res => {
          onUpdateTodo(res.data.todo);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const checkForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditTitle(e.currentTarget.value);
    }
  };

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex">
      {isEditing ? (
        <input
          autoFocus
          type="text"
          className="input w-full flex-shrink text-xs focus:outline-none"
          onBlur={e => handleEditTitle(e.target.value)}
          onKeyDown={checkForEnter}
          defaultValue={props.todo.title}
        />
      ) : (
        <button
          className={`btn btn-ghost normal-case p-2 text-left w-full text-xs flex-shrink overflow-scroll ${
            props.todo.completed && 'line-through opacity-50'
          }`}
          onClick={handleToggleCompleted}>
          <ReactMarkdown>{props.todo.title}</ReactMarkdown>
        </button>
      )}
      {isHovering &&
        !isEditing &&
        (props.todo.completed ? (
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
