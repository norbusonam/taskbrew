import React, { useEffect, useState } from 'react';
import { useTodos, useViewport } from '../../hooks';
import { Todo } from '../../types';
import { TodoList } from '../todo-list';
import { api } from '../../api';
import { getYesterday } from './utils';
import { LeftNav } from './left-nav';
import { RightNav } from './right-nav';
import { DAY_OF_WEEK } from './constants';

type TimeViewProps = {
  todos: Todo[];
};

export const TimeView: React.FC<TimeViewProps> = props => {
  const [startDate, setStartDate] = useState(getYesterday());
  const [numDays, setNumDays] = useState(7);
  const [hideCompleted, setHideCompleted] = useState(false);
  const { onCreateTodo } = useTodos();
  const { width } = useViewport();

  useEffect(() => {
    if (width < 600) {
      setNumDays(1);
    } else if (width < 1000) {
      setNumDays(3);
    } else if (width < 1300) {
      setNumDays(5);
    } else {
      setNumDays(7);
    }
  }, [width]);

  const shiftStartDate = (shift: number) => {
    setStartDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + shift);
      return newDate;
    });
  };

  const handleCreateTodo = (title: string, due: Date) => {
    api
      .createTodo({
        title,
        due,
      })
      .then(res => {
        onCreateTodo(res.data.todo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-row w-full gap-2 p-2">
      <LeftNav shiftStartDate={shiftStartDate} setStartDate={setStartDate} numDays={numDays} />
      {[...Array(numDays)].map((_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const isToday = date.toDateString() === new Date().toDateString();
        const isTomorrow =
          date.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString();
        const isPastDay =
          date.getFullYear() < new Date().getFullYear() ||
          (date.getFullYear() === new Date().getFullYear() && date.getMonth() < new Date().getMonth()) ||
          (date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth() &&
            date.getDate() < new Date().getDate());
        return (
          <div className="flex-1" key={date.toDateString()}>
            <TodoList
              todos={props.todos.filter(todo => new Date(todo.due).toDateString() === date.toDateString())}
              header={DAY_OF_WEEK[date.getDay()]}
              subheader={date.toLocaleDateString()}
              hideCompleted={hideCompleted}
              indicatorColor={isToday ? 'primary' : isTomorrow ? 'secondary' : undefined}
              indicator={isToday ? 'Today' : isTomorrow ? 'Tomorrow' : isPastDay ? 'Past' : undefined}
              isDisabled={isPastDay}
              onCreateTodo={title => handleCreateTodo(title, date)}
            />
          </div>
        );
      })}
      <RightNav
        shiftStartDate={shiftStartDate}
        setStartDate={setStartDate}
        numDays={numDays}
        hideCompleted={hideCompleted}
        setHideCompleted={setHideCompleted}
      />
    </div>
  );
};
