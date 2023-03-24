import React from 'react';
import { api } from '../../api';
import { useTodos } from '../../hooks';
import { Todo } from '../../types';
import { TodoList } from '../todo-list';
import { getDayOfWeek, isInPast, isToday, isTomorrow } from './utils';

type DayListProps = {
  date: Date;
  todos: Todo[];
  hideCompleted?: boolean;
};

export const DayList: React.FC<DayListProps> = props => {
  const { onCreateTodo } = useTodos();

  const handleCreateTodo = (title: string) => {
    api
      .createTodo({
        title,
        due: props.date,
      })
      .then(res => {
        onCreateTodo(res.data.todo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <TodoList
      header={getDayOfWeek(props.date)}
      subheader={props.date.toLocaleDateString()}
      todos={props.todos}
      onCreateTodo={handleCreateTodo}
      isDisabled={isInPast(props.date)}
      hideCompleted={props.hideCompleted}
      indicator={
        isToday(props.date) ? 'Today' : isTomorrow(props.date) ? 'Tomorrow' : isInPast(props.date) ? 'Past' : undefined
      }
      indicatorColor={isToday(props.date) ? 'primary' : isTomorrow(props.date) ? 'secondary' : undefined}
    />
  );
};
