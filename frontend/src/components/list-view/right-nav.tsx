import React from 'react';
import { EyeEmpty, EyeOff, NavArrowRight } from 'iconoir-react';

type RightNavProps = {
  onRightClicked: () => void;
  hideCompleted: boolean;
  setHideCompleted: (hideCompleted: boolean) => void;
};

export const RightNav: React.FC<RightNavProps> = props => {
  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-ghost btn-square" onClick={props.onRightClicked}>
        <NavArrowRight className="h-6 w-6" />
      </button>
      <label className="swap swap-rotate btn btn-ghost btn-square">
        <input type="checkbox" checked={props.hideCompleted} onChange={e => props.setHideCompleted(e.target.checked)} />
        <EyeOff className="swap-on h-6 w-6" />
        <EyeEmpty className="swap-off h-6 w-6" />
      </label>
    </div>
  );
};
