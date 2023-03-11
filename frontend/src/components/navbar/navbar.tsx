import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, onLogout } = useAuth();

  return (
    <nav className="navbar bg-base-200 rounded-xl border-2 border-base-100 shadow-lg">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          todo
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/signup" className={`btn ${isAuthenticated && 'hidden'}`}>
          Get started
        </Link>
        <div className={`dropdown dropdown-end ${!isAuthenticated && 'hidden'}`}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder bg-base-100">
            <div className="w-10 rounded-full">
              <span className="text-xl">
                {user?.name
                  .split(' ')
                  .slice(0, 1)
                  .map(name => name[0])}
              </span>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52">
            <li>
              <button className="justify-between">
                Profile
                <span className="badge">Coming soon</span>
              </button>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
