import React from 'react';
import { Todo } from '../../types';
import { TodoList } from '../todo-list';

const DAY_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type WeekViewProps = {
  todos: Todo[];
};

export const WeekView: React.FC<WeekViewProps> = props => {
  const firstDayOfWeek = new Date();
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());

  return (
    <div className="flex flex-row">
      {[...Array(7)].map((_, i) => {
        const date = new Date(firstDayOfWeek);
        date.setDate(date.getDate() + i);
        return (
          <TodoList
            key={date.toDateString()}
            todos={props.todos.filter(todo => new Date(todo.due).toDateString() === date.toDateString())}
            header={DAY_OF_WEEK[i]}
            subheader={date.toDateString()}
          />
        );
      })}
    </div>
  );
};
