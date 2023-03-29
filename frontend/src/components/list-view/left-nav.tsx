import React from 'react';
import { NavArrowLeft } from 'iconoir-react';
import { CreateListButton } from './create-list-button';

type LeftNavProps = {
  onLeftClicked: () => void;
  onCreateList: (title: string) => void;
};

export const LeftNav: React.FC<LeftNavProps> = props => {
  return (
    <div className="flex flex-col gap-2">
      <button className="btn btn-ghost btn-square" onClick={props.onLeftClicked}>
        <NavArrowLeft className="h-6 w-6" />
      </button>
      <CreateListButton onCreateList={props.onCreateList} />
    </div>
  );
};
