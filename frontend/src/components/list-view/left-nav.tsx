import React from 'react';
import { NavArrowLeft, Plus } from 'iconoir-react';

type LeftNavProps = {
  onLeftClicked: () => void;
};

export const LeftNav: React.FC<LeftNavProps> = props => {
  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-ghost btn-square" onClick={props.onLeftClicked}>
        <NavArrowLeft className="h-6 w-6" />
      </button>
      <button className="btn btn-ghost btn-square">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};
