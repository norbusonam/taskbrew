import React, { useEffect, useState } from 'react';
import { FastArrowLeft, FastArrowRight, Home, NavArrowLeft, NavArrowRight, EyeEmpty, EyeOff } from 'iconoir-react';
import { useTodos, useViewport } from '../../hooks';
import { Todo } from '../../types';
import { TodoList } from '../todo-list';
import { api } from '../../api';

const DAY_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

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
      <div className="flex flex-col gap-2">
        <button className="btn btn-ghost btn-square" onClick={() => shiftStartDate(-1)}>
          <NavArrowLeft className="h-6 w-6" />
        </button>
        <button
          className={`btn btn-ghost btn-square ${numDays === 1 && 'hidden'}`}
          onClick={() => shiftStartDate(-numDays)}>
          <FastArrowLeft className="h-6 w-6" />
        </button>
        <button className="btn btn-ghost btn-square" onClick={() => setStartDate(getYesterday())}>
          <Home className="h-6 w-6" />
        </button>
      </div>
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
      <div className="flex flex-col gap-2">
        <button className="btn btn-ghost btn-square" onClick={() => shiftStartDate(1)}>
          <NavArrowRight className="h-6 w-6" />
        </button>
        <button
          className={`btn btn-ghost btn-square ${numDays === 1 && 'hidden'}`}
          onClick={() => shiftStartDate(numDays)}>
          <FastArrowRight className="h-6 w-6" />
        </button>
        <label className="swap swap-rotate btn btn-ghost btn-square">
          <input type="checkbox" checked={hideCompleted} onChange={() => setHideCompleted(prev => !prev)} />
          <EyeOff className="swap-on h-6 w-6" />
          <EyeEmpty className="swap-off h-6 w-6" />
        </label>
      </div>
    </div>
  );
};
