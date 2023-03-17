import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, CoffeeIcon, PaintBrushIcon } from '../../assets';
import { useAuth, useTheme } from '../../hooks';

export const Navbar: React.FC = () => {
  const { changeTheme, currentTheme, themes } = useTheme();
  const { isAuthenticated, user, onLogout } = useAuth();

  return (
    <nav className="navbar bg-base-200 rounded-box border-2 border-base-100 shadow-lg">
      <div className="navbar-start">
        <Link to={isAuthenticated ? '/home' : '/'} className="btn btn-ghost normal-case text-xl gap-2">
          <CoffeeIcon className="w-6 h-6" />
          Taskbrew
        </Link>
      </div>
      <div className="navbar-end gap-2">
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <PaintBrushIcon className="fill-current w-6 h-6" />
          </label>
          <div className="dropdown-content rounded-box h-64 mt-3 shadow overflow-y-scroll">
            <ul tabIndex={0} className="menu menu-compact p-2 bg-base-200 w-52 gap-2">
              {themes.map(theme => (
                <li key={theme}>
                  <button onClick={() => changeTheme(theme)}>
                    {theme === currentTheme && <CheckIcon className="w-4 h-4" />}
                    {theme}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/signup" className={`btn ${isAuthenticated && 'hidden'}`}>
          Get started
        </Link>
        <div className={`dropdown dropdown-end ${!isAuthenticated && 'hidden'}`}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder bg-base-100 btn-outline">
            <div className="w-10 rounded-full">
              <span className="text-xl">
                {user?.name
                  .split(' ')
                  .slice(0, 1)
                  .map(name => name[0])}
              </span>
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact mt-3 p-2 shadow dropdown-content bg-base-200 rounded-box w-52">
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
