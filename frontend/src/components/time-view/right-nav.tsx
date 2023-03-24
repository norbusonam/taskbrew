import { EyeEmpty, EyeOff, FastArrowRight, NavArrowRight } from 'iconoir-react';
import React from 'react';

type RightNavProps = {
  shiftStartDate: (shift: number) => void;
  setStartDate: (date: Date) => void;
  numDays: number;
  hideCompleted: boolean;
  setHideCompleted: (hideCompleted: boolean) => void;
};

export const RightNav: React.FC<RightNavProps> = props => {
  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-ghost btn-square" onClick={() => props.shiftStartDate(1)}>
        <NavArrowRight className="h-6 w-6" />
      </button>
      <button
        className={`btn btn-ghost btn-square ${props.numDays === 1 && 'hidden'}`}
        onClick={() => props.shiftStartDate(props.numDays)}>
        <FastArrowRight className="h-6 w-6" />
      </button>
      <label className="swap swap-rotate btn btn-ghost btn-square">
        <input type="checkbox" checked={props.hideCompleted} onChange={e => props.setHideCompleted(e.target.checked)} />
        <EyeOff className="swap-on h-6 w-6" />
        <EyeEmpty className="swap-off h-6 w-6" />
      </label>
    </div>
  );
};
