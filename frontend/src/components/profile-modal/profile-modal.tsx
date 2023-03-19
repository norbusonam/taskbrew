import React, { Fragment, useState } from 'react';
import { api } from '../../api';
import { CancelIcon } from '../../assets';
import { useAuth } from '../../hooks';

export const ProfileModal: React.FC = () => {
  const { user, onUpdateUser } = useAuth();
  const [name, setName] = useState(user?.name ? user.name : '');
  const [email, setEmail] = useState(user?.email ? user.email : '');

  const handleUpdateUser = () => {
    api
      .updateUser({ name, email })
      .then(res => {
        onUpdateUser(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <input type="checkbox" id="profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">My Profile</h3>
              <label htmlFor="profile-modal" className="btn btn-sm btn-error btn-square">
                <CancelIcon className="w-4 h-4" />
              </label>
            </div>
            <div className="flex justify-center">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                  <span className="text-3xl">
                    {user?.name
                      .split(' ')
                      .slice(0, 1)
                      .map(name => name[0])}
                  </span>
                </div>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="profile-modal" className="btn btn-primary" onClick={handleUpdateUser}>
              Save Change
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
