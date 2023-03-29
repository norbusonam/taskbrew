import React, { useState } from 'react';
import { Cancel, Plus } from 'iconoir-react';

type CreateListButtonProps = {
  onCreateList: (title: string) => void;
};

export const CreateListButton: React.FC<CreateListButtonProps> = props => {
  const [title, setTitle] = useState('');

  const clearTitle = () => {
    setTitle('');
  };

  const onCreateClicked = () => {
    props.onCreateList(title);
    clearTitle();
  };

  return (
    <div>
      <label htmlFor="create-list" className="btn btn-ghost btn-square">
        <Plus className="h-6 w-6" />
      </label>
      <input type="checkbox" id="create-list" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">New List</h3>
              <label htmlFor="create-list" className="btn btn-sm btn-error btn-square" onClick={clearTitle}>
                <Cancel className="w-4 h-4" />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Grocery List 🛒"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="modal-action">
              <label
                htmlFor="create-list"
                className={`btn btn-primary ${!title && 'btn-disabled'}`}
                onClick={onCreateClicked}>
                Create
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
