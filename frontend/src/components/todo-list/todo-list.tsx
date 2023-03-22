import React, { useState } from 'react';
import { Todo } from '../../types';
import { TodoListHeader } from './todo-list-header';
import { TodoListItem } from './todo-list-item';

type TodoListProps = {
  header: string;
  subheader?: string;
  todos: Todo[];
  onCreateTodo: (title: string) => void;
  indicatorColor?: 'primary' | 'secondary';
  hideCompleted?: boolean;
  indicator?: string;
  isDisabled?: boolean;
};

export const TodoList: React.FC<TodoListProps> = props => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isNewTodoFocused, setIsNewTodoFocused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const onCreateTodo = () => {
    setIsNewTodoFocused(false);
    if (newTodoTitle) {
      props.onCreateTodo(newTodoTitle);
      setNewTodoTitle('');
    }
  };

  const checkForEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCreateTodo();
    }
  };

  return (
    <div className="mb-4">
      <TodoListHeader
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
          {props.todos
            .sort(a => (a.completed ? 1 : -1))
            .filter(todo => !props.hideCompleted || !todo.completed)
            .map(todo => (
              <TodoListItem key={todo.id} todo={todo} />
            ))}
          <div className={`flex transition-opacity ${!isHovering && !isNewTodoFocused && 'opacity-0'}`}>
            <input
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              type="text"
              className="input input-ghost w-full flex-shrink text-xs p-2 focus:outline-none"
              onBlur={onCreateTodo}
              onKeyDown={checkForEnter}
              onFocus={() => setIsNewTodoFocused(true)}
              placeholder="Creata a new task"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
