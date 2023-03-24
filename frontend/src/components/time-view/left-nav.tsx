import { FastArrowLeft, Home, NavArrowLeft } from 'iconoir-react';
import React from 'react';
import { getYesterday } from './utils';

type LeftNavProps = {
  shiftStartDate: (shift: number) => void;
  setStartDate: (date: Date) => void;
  numDays: number;
};

export const LeftNav: React.FC<LeftNavProps> = props => {
  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-ghost btn-square" onClick={() => props.shiftStartDate(-1)}>
        <NavArrowLeft className="h-6 w-6" />
      </button>
      <button
        className={`btn btn-ghost btn-square ${props.numDays === 1 && 'hidden'}`}
        onClick={() => props.shiftStartDate(-props.numDays)}>
        <FastArrowLeft className="h-6 w-6" />
      </button>
      <button className="btn btn-ghost btn-square" onClick={() => props.setStartDate(getYesterday())}>
        <Home className="h-6 w-6" />
      </button>
    </div>
  );
};
